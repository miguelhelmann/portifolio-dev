export type Language = "pt" | "en";
export type ThemeId = "dark" | "color";

export interface TranslationDictionary {
  nav: {
    hero: string;
    code: string;
    identity: string;
    projects: string;
    technologies: string;
    studies: string;
    contact: string;
    commandPaletteAria: string;
    timeZoneSuffix: string;
    themeToggleAria: string;
    langToggleAria: string;
  };
  hero: {
    portalTag: string;
    sectionTag: string;
    developerName: string;
    indexLabel: string;
    disciplines: string;
    tagline: string;
    promptButton: string;
    promptHint: string;
    navigateCode: string;
  };
  code: {
    sectionNum: string;
    sectionTag: string;
    githubLabel: string;
    selectRepoLabel: string;
    activeRepoLabel: string;
    publicDescLabel: string;
    practicalPurposeLabel: string;
    techDetectedLabel: string;
    viewOnGithub: string;
    viewAllGithub: string;
    publicRepoBadge: string;
    repos: Record<string, {
      description?: string;
      explanation: string;
    }>;
  };
  identity: {
    sectionNum: string;
    sectionTag: string;
    whoIAm: string;
    techExploredLabel: string;
    hoverHint: string;
    technologies: Record<string, {
      shortRole: string;
      desc: string;
    }>;
    studiesSectionNum: string;
    studiesSectionTag: string;
    studiesCategory: string;
    studiesLabel: string;
    course: string;
    institution: string;
    studiesDescription: string;
    nextStepLabel: string;
    nextStepGoal: string;
    nextStepDesc: string;
  };
  contact: {
    sectionNum: string;
    sectionTag: string;
    sectionCategory: string;
    headlinePart1: string;
    headlinePart2: string;
    subtitle: string;
    emailLabel: string;
    emailAction: string;
    whatsappLabel: string;
    whatsappAction: string;
    githubLabel: string;
    githubAction: string;
    githubRole: string;
    githubHandle: string;
    secondaryRefLabel: string;
    emailPending: string;
    whatsappPending: string;
    pendingBadge: string;
    emailModalTitle: string;
    emailModalSubtitle: string;
    emailModalOutlook: string;
    emailModalOutlookDesc: string;
    emailModalGmail: string;
    emailModalGmailDesc: string;
    emailModalDefault: string;
    emailModalDefaultDesc: string;
    emailModalCopy: string;
    emailModalCopyDone: string;
    emailModalClose: string;
  };
  commandPalette: {
    placeholder: string;
    emptyText: string;
    navTitle: string;
    actionsTitle: string;
    closeHint: string;
    navHero: string;
    navCode: string;
    navIdentity: string;
    navStudies: string;
    navContact: string;
    copyGithub: string;
    copyGithubDone: string;
    toggleTheme: string;
    toggleLang: string;
  };
  footer: {
    location: string;
    wcagCompliance: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  pt: {
    nav: {
      hero: "Início",
      code: "Projetos",
      identity: "Tecnologias",
      projects: "Projetos",
      technologies: "Tecnologias",
      studies: "Estudos",
      contact: "Contato",
      commandPaletteAria: "Abrir Prompt de Comando (Ctrl+K ou /)",
      timeZoneSuffix: "BRT",
      themeToggleAria: "Alternar Modo Visual (Escuro / Colorido)",
      langToggleAria: "Alternar Idioma",
    },
    hero: {
      portalTag: "PORTFÓLIO",
      sectionTag: "DESENVOLVEDOR",
      developerName: "MIGUEL HELMANN",
      indexLabel: "ÍNDICE: 2026.01",
      disciplines: "Desenvolvimento web • Interfaces responsivas • Sistemas",
      tagline: "Sou um desenvolvedor focado em construir websites, landing pages e sistemas simples.",
      promptButton: "$ miguel.inspect()",
      promptHint: "— pressione / para abrir prompt",
      navigateCode: "PROJETOS",
    },
    code: {
      sectionNum: "01",
      sectionTag: "PROJETOS",
      githubLabel: "REPOSITÓRIOS GITHUB",
      selectRepoLabel: "SELECIONAR REPOSITÓRIO",
      activeRepoLabel: "REPOSITÓRIO ATIVO",
      publicDescLabel: "DESCRIÇÃO PÚBLICA",
      practicalPurposeLabel: "O QUE É / OBJETIVO PRÁTICO",
      techDetectedLabel: "LINGUAGENS E TECNOLOGIAS DETECTADAS",
      viewOnGithub: "VER NO GITHUB",
      viewAllGithub: "VER TODOS OS REPOSITÓRIOS NO GITHUB",
      publicRepoBadge: "REPOSITÓRIO PÚBLICO",
      repos: {
        FELINE: {
          description: "landing page para uma marca fictícia de carros superesportivos.",
          explanation: "Landing page responsiva com foco em estética visual de alto impacto, tipografia e estilização moderna com TypeScript.",
        },
        "fish-suplementos-site": {
          description: "Desenvolvimento de site comercial para apresentação de lojas físicas e produtos.",
          explanation: "Desenvolvimento de site comercial para apresentação de lojas físicas, catálogo de produtos e integração com WhatsApp.",
        },
        "glassmorphism-login": {
          explanation: "Estudo prático de interface explorando efeitos translúcidos, profundidade com CSS e formulário interativo.",
        },
        miguelhelmann: {
          explanation: "Configuração do README de perfil documentando linguagens e ferramentas de estudo em desenvolvimento web.",
        },
      },
    },
    identity: {
      sectionNum: "02",
      sectionTag: "TECNOLOGIAS",
      whoIAm: "FERRAMENTAS & LINGUAGENS",
      techExploredLabel: "TECNOLOGIAS EM ESTUDO E CONSTRUÇÃO",
      hoverHint: "Passe o cursor sobre os símbolos para inspecionar contexto",
      technologies: {
        JavaScript: {
          shortRole: "Lógica web & interação",
          desc: "Lógica web, manipulação de eventos e dinamismo de interface.",
        },
        TypeScript: {
          shortRole: "Tipagem estática & segurança",
          desc: "Tipagem estática, interfaces e prevenção de erros em tempo de desenvolvimento.",
        },
        Python: {
          shortRole: "Programação & lógica",
          desc: "Fundamentos de programação, algoritmos e exploração de scripts.",
        },
        React: {
          shortRole: "Interfaces em componentes",
          desc: "Interfaces dinâmicas baseadas em componentes reutilizáveis e estado.",
        },
        HTML5: {
          shortRole: "Estrutura semântica",
          desc: "Estruturação semântica, acessibilidade e marcação limpa.",
        },
        CSS3: {
          shortRole: "Layout & estilização",
          desc: "Estilização responsiva, Flexbox, CSS Grid e design visual.",
        },
      },
      studiesSectionNum: "03",
      studiesSectionTag: "ESTUDOS",
      studiesCategory: "FORMAÇÃO & OBJETIVOS",
      studiesLabel: "ONDE ESTUDO / FORMAÇÃO",
      course: "Técnico em Desenvolvimento de Sistemas",
      institution: "CEEP Pedro Boaretto Neto",
      studiesDescription: "Estou estudando desenvolvimento de sistemas e aprendendo principalmente através de projetos práticos.",
      nextStepLabel: "PRÓXIMO PASSO",
      nextStepGoal: "Engenharia de Software",
      nextStepDesc: "Objetivo acadêmico e profissional futuro para aprofundar arquitetura, escalabilidade e fundamentos de engenharia.",
    },
    contact: {
      sectionNum: "04",
      sectionTag: "CONTATO",
      sectionCategory: "PROJETOS & CONTATO",
      headlinePart1: "VAMOS CONVERSAR",
      headlinePart2: "SOBRE UM PROJETO.",
      subtitle: "Se você representa uma empresa, tem uma ideia ou quer conversar sobre desenvolvimento, entre em contato.",
      emailLabel: "Email",
      emailAction: "Enviar mensagem direta",
      whatsappLabel: "WhatsApp",
      whatsappAction: "Conversa direta",
      githubLabel: "GitHub",
      githubAction: "Repositórios",
      githubRole: "Repositórios & código público",
      githubHandle: "github.com/miguelhelmann",
      secondaryRefLabel: "REFERÊNCIA DE CÓDIGO",
      emailPending: "Aguardando confirmação do endereço pelo CEO",
      whatsappPending: "Aguardando número oficial pelo CEO",
      pendingBadge: "PENDENTE",
      emailModalTitle: "Enviar Email",
      emailModalSubtitle: "Escolha como você prefere compor a mensagem:",
      emailModalOutlook: "Outlook Web",
      emailModalOutlookDesc: "Abrir no navegador com destinatário preenchido",
      emailModalGmail: "Gmail Web",
      emailModalGmailDesc: "Abrir no navegador com destinatário preenchido",
      emailModalDefault: "Aplicativo Padrão (mailto)",
      emailModalDefaultDesc: "Abrir cliente de email do seu sistema operacional",
      emailModalCopy: "Copiar Endereço",
      emailModalCopyDone: "Copiado para a área de transferência!",
      emailModalClose: "Fechar",
    },
    commandPalette: {
      placeholder: "Digite um comando ou busque seções...",
      emptyText: "Nenhum comando correspondente encontrado.",
      navTitle: "Navegação",
      actionsTitle: "Ações",
      closeHint: "Pressione ESC para fechar",
      navHero: "Início",
      navCode: "01. Projetos",
      navIdentity: "02. Tecnologias",
      navStudies: "03. Estudos",
      navContact: "04. Contato",
      copyGithub: "Copiar URL do GitHub",
      copyGithubDone: "Copiado!",
      toggleTheme: "Alternar Modo (Escuro / Colorido)",
      toggleLang: "Mudar Idioma (EN)",
    },
    footer: {
      location: "CASCAVEL / PR",
      wcagCompliance: "WCAG 2.1 AA Em Conformidade",
    },
  },
  en: {
    nav: {
      hero: "Home",
      code: "Projects",
      identity: "Technologies",
      projects: "Projects",
      technologies: "Technologies",
      studies: "Studies",
      contact: "Contact",
      commandPaletteAria: "Open Command Palette (Ctrl+K or /)",
      timeZoneSuffix: "BRT",
      themeToggleAria: "Toggle Visual Mode (Dark / Color)",
      langToggleAria: "Switch Language",
    },
    hero: {
      portalTag: "PORTFOLIO",
      sectionTag: "DEVELOPER",
      developerName: "MIGUEL HELMANN",
      indexLabel: "INDEX: 2026.01",
      disciplines: "Web development • Responsive interfaces • Systems",
      tagline: "I am a developer focused on building websites, landing pages, and simple systems.",
      promptButton: "$ miguel.inspect()",
      promptHint: "— press / to open prompt",
      navigateCode: "PROJECTS",
    },
    code: {
      sectionNum: "01",
      sectionTag: "PROJECTS",
      githubLabel: "GITHUB REPOSITORIES",
      selectRepoLabel: "SELECT REPOSITORY",
      activeRepoLabel: "ACTIVE REPOSITORY",
      publicDescLabel: "PUBLIC REPOSITORY DESCRIPTION",
      practicalPurposeLabel: "WHAT IT DOES / PRACTICAL PURPOSE",
      techDetectedLabel: "DETECTED LANGUAGES & TECHNOLOGIES",
      viewOnGithub: "VIEW ON GITHUB",
      viewAllGithub: "VIEW ALL REPOSITORIES ON GITHUB",
      publicRepoBadge: "PUBLIC REPO",
      repos: {
        FELINE: {
          description: "landing page for a fictional supercar brand.",
          explanation: "A responsive landing page exploring high-impact visual aesthetics, typography, and modern front-end styling with TypeScript.",
        },
        "fish-suplementos-site": {
          description: "Development of a commercial website for presenting physical stores and products.",
          explanation: "Development of a commercial website for presenting physical store locations, product catalog, and WhatsApp integration.",
        },
        "glassmorphism-login": {
          explanation: "A practical interface study exploring frosted-glass translucency, CSS depth elevation, and interactive form handling.",
        },
        miguelhelmann: {
          explanation: "GitHub profile README setup documenting languages and tooling explored in web development.",
        },
      },
    },
    identity: {
      sectionNum: "02",
      sectionTag: "TECHNOLOGIES",
      whoIAm: "TOOLS & LANGUAGES",
      techExploredLabel: "TECHNOLOGIES EXPLORED & IN USE",
      hoverHint: "Hover or tap symbols to inspect application context",
      technologies: {
        JavaScript: {
          shortRole: "Web logic & interaction",
          desc: "Web logic, DOM events, and client-side interactions.",
        },
        TypeScript: {
          shortRole: "Static typing & safety",
          desc: "Static typing, interfaces, and catching bugs ahead of runtime.",
        },
        Python: {
          shortRole: "Programming & logic",
          desc: "Core computer science fundamentals, algorithms, and scripting.",
        },
        React: {
          shortRole: "Component-driven UI",
          desc: "Interactive user interfaces composed from stateful components.",
        },
        HTML5: {
          shortRole: "Semantic structure",
          desc: "Accessible document semantics, clean hierarchy, and SEO foundations.",
        },
        CSS3: {
          shortRole: "Layout & styling",
          desc: "Responsive layout systems, Flexbox, CSS Grid, and interface styling.",
        },
      },
      studiesSectionNum: "03",
      studiesSectionTag: "STUDIES",
      studiesCategory: "EDUCATION & GOALS",
      studiesLabel: "WHERE I STUDY / EDUCATION",
      course: "Systems Development Technical Degree",
      institution: "CEEP Pedro Boaretto Neto",
      studiesDescription: "I am currently studying systems development, learning primarily by building hands-on projects.",
      nextStepLabel: "NEXT STEP",
      nextStepGoal: "Software Engineering",
      nextStepDesc: "Future academic and professional goal to deepen understanding of systems architecture, scalability, and software engineering.",
    },
    contact: {
      sectionNum: "04",
      sectionTag: "CONTACT",
      sectionCategory: "PROJECTS & INQUIRIES",
      headlinePart1: "LET'S TALK ABOUT",
      headlinePart2: "A PROJECT.",
      subtitle: "If you represent a company, have an idea, or want to discuss development, feel free to get in touch.",
      emailLabel: "Email",
      emailAction: "Send direct message",
      whatsappLabel: "WhatsApp",
      whatsappAction: "Direct message",
      githubLabel: "GitHub",
      githubAction: "Repositories",
      githubRole: "Repositories & public code",
      githubHandle: "github.com/miguelhelmann",
      secondaryRefLabel: "CODE REFERENCE",
      emailPending: "Pending verified email address from CEO",
      whatsappPending: "Pending verified WhatsApp number from CEO",
      pendingBadge: "PENDING",
      emailModalTitle: "Send Email",
      emailModalSubtitle: "Choose how you would like to compose:",
      emailModalOutlook: "Outlook Web",
      emailModalOutlookDesc: "Open webmail in browser with recipient prefilled",
      emailModalGmail: "Gmail Web",
      emailModalGmailDesc: "Open Gmail in browser with recipient prefilled",
      emailModalDefault: "Default Email App (mailto)",
      emailModalDefaultDesc: "Open default mail client on your system",
      emailModalCopy: "Copy Address",
      emailModalCopyDone: "Copied to clipboard!",
      emailModalClose: "Close",
    },
    commandPalette: {
      placeholder: "Type a command or search sections...",
      emptyText: "No matching commands found.",
      navTitle: "Navigation",
      actionsTitle: "Actions",
      closeHint: "Press ESC to close",
      navHero: "Home",
      navCode: "01. Projects",
      navIdentity: "02. Technologies",
      navStudies: "03. Studies",
      navContact: "04. Contact",
      copyGithub: "Copy GitHub URL",
      copyGithubDone: "Copied!",
      toggleTheme: "Toggle Mode (Dark / Color)",
      toggleLang: "Switch Language (PT)",
    },
    footer: {
      location: "CASCAVEL / PR",
      wcagCompliance: "WCAG 2.1 AA Compliant",
    },
  },
};

export interface ThemeConfig {
  id: ThemeId;
  name: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "dark",
    name: "Dark",
  },
  {
    id: "color",
    name: "Color",
  },
];
