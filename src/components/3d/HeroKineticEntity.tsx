"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePortfolio } from "@/context/PortfolioContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const HeroKineticEntity: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = usePortfolio();
  const prefersReducedMotion = useReducedMotion();
  const isColor = theme === "color";

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 7.8;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 2. Structural Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Color definitions based on current theme
    const wireColor = isColor ? 0x0f172a : 0xf1f5f9;
    const nodeColor = isColor ? 0x0284c7 : 0xe2e8f0;
    const coreColor = isColor ? 0x06b6d4 : 0xffffff;

    // A. Outer Wireframe Architectural Cage (Refined density: Icosahedron & Ring Guides)
    const outerGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const wireGeo = new THREE.WireframeGeometry(outerGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: wireColor,
      transparent: true,
      opacity: isColor ? 0.22 : 0.18,
      linewidth: 1,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    rootGroup.add(wireMesh);

    // B. Inner Concentric Geometric Prism (Octahedron Core)
    const coreGeo = new THREE.OctahedronGeometry(1.15, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: coreColor,
      wireframe: true,
      transparent: true,
      opacity: isColor ? 0.38 : 0.28,
      roughness: 0.25,
      metalness: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // C. Structural Nodes at Vertices
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = outerGeo.attributes.position.array;
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: nodeColor,
      size: 0.07,
      transparent: true,
      opacity: isColor ? 0.75 : 0.65,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    rootGroup.add(nodePoints);

    // D. Curated Orbiting Syntax Glyphs ({ }, < >, //, =>, λ)
    const createGlyphTexture = (text: string, colorStr: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 128, 128);
        ctx.font = "bold 60px 'Space Grotesk', monospace, sans-serif";
        ctx.fillStyle = colorStr;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const glyphs = ["{ }", "< >", "//", "=>", "λ", "[ ]"];
    const glyphColorHex = isColor ? "#0284c7" : "#ffffff";
    const glyphMeshes: THREE.Sprite[] = [];
    const glyphOrbitRadius = 3.0;

    glyphs.forEach((glyph, i) => {
      const tex = createGlyphTexture(glyph, glyphColorHex);
      const spriteMat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: isColor ? 0.65 : 0.55,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.6, 0.6, 1);

      const angle = (i / glyphs.length) * Math.PI * 2;
      sprite.position.set(
        Math.cos(angle) * glyphOrbitRadius,
        Math.sin(angle) * (glyphOrbitRadius * 0.35),
        Math.sin(angle) * glyphOrbitRadius * 0.75
      );
      glyphMeshes.push(sprite);
      rootGroup.add(sprite);
    });

    // E. Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isColor ? 0.85 : 0.55);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(isColor ? 0x38bdf8 : 0xffffff, 1.8, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. Subtle Parallax & Scroll Integration
    // Per instructions: "Evitar reação constante ao mouse. Se houver interação com o mouse, deve ser extremamente sutil, quase imperceptível."
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let scrollY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      // Extremely subtle, dignified tilt factor
      targetTiltY = normX * 0.14;
      targetTiltX = -normY * 0.1;
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // 4. Throttled Resize Handling
    let resizeRaf: number | null = null;
    const onResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        if (!container || !renderer) return;
        width = container.clientWidth || window.innerWidth;
        height = container.clientHeight || 500;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      });
    };

    window.addEventListener("resize", onResize, { passive: true });

    // 5. Visibility / Intersection Observer Optimization (Pause loop when out of viewport or tab hidden)
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        const rect = container.getBoundingClientRect();
        isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange, { passive: true });

    // 6. Kinetic RAF Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden || !renderer) return;

      const elapsed = clock.getElapsedTime();

      // Damped, almost imperceptible lerp
      currentTiltX += (targetTiltX - currentTiltX) * 0.025;
      currentTiltY += (targetTiltY - currentTiltY) * 0.025;

      // Scroll-driven evolution: rotation & smooth descent
      const scrollFactor = Math.min(scrollY / 800, 1.5);
      const scrollRot = scrollFactor * Math.PI * 0.65;
      const scrollScale = Math.max(1 - scrollFactor * 0.3, 0.5);

      // Slow, majestic ambient rotation
      rootGroup.rotation.x = currentTiltX + scrollRot * 0.3;
      rootGroup.rotation.y = currentTiltY + elapsed * 0.065 + scrollRot;
      rootGroup.rotation.z = Math.sin(elapsed * 0.15) * 0.04;

      rootGroup.scale.set(scrollScale, scrollScale, scrollScale);
      rootGroup.position.y = -scrollFactor * 1.1;

      // Inner core independent counter-rotation
      coreMesh.rotation.x = -elapsed * 0.12;
      coreMesh.rotation.y = elapsed * 0.18;

      // Subtle breathing pulse on lighting
      pointLight.intensity = 1.6 + Math.sin(elapsed * 0.8) * 0.3;

      // Orbiting glyph animation
      glyphMeshes.forEach((sprite, i) => {
        const offsetAngle = (i / glyphs.length) * Math.PI * 2 + elapsed * 0.14;
        sprite.position.x = Math.cos(offsetAngle) * glyphOrbitRadius;
        sprite.position.z = Math.sin(offsetAngle) * glyphOrbitRadius;
        sprite.position.y = Math.sin(offsetAngle * 2) * 0.35;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      observer.disconnect();
      cancelAnimationFrame(animId);

      outerGeo.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      glyphMeshes.forEach((s) => {
        s.material.map?.dispose();
        s.material.dispose();
      });

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [theme, isColor, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0 opacity-75 transition-opacity duration-700"
    />
  );
};
