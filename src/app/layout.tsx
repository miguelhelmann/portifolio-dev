import type { Metadata, Viewport } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#06070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Miguel Helmann — Developer",
  description: "Personal developer portfolio of Miguel Helmann. Focused on building websites, landing pages, and simple systems.",
  keywords: ["Miguel Helmann", "Developer", "Web Developer", "Frontend", "JavaScript", "TypeScript", "React", "Python"],
  authors: [{ name: "Miguel Helmann" }],
  openGraph: {
    title: "Miguel Helmann — Developer",
    description: "Portfolio of Miguel Helmann. Focused on building websites, landing pages, and simple systems.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      data-theme="dark"
      className={`${geistSans.variable} ${spaceGrotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash inline script to restore persisted theme & language before first render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('portfolio_theme') || 'dark';
                  if (t !== 'dark' && t !== 'color') t = 'dark';
                  document.documentElement.setAttribute('data-theme', t);
                  var l = localStorage.getItem('portfolio_lang') || 'pt';
                  if (l !== 'pt' && l !== 'en') l = 'pt';
                  document.documentElement.setAttribute('lang', l);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-300">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
