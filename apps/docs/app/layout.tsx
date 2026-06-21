import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const outfitSans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://frontend-ui.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Frontend UI — 企业级前端动画组件库",
    template: "%s | Frontend UI",
  },
  description: "企业级前端动画组件库，集成 GSAP、Motion、react-spring 等 6+ 动画引擎，130+ 组件，开箱即用。",
  keywords: ["动画组件库", "React", "GSAP", "Motion", "UI组件", "前端", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Frontend UI" }],
  creator: "Frontend UI",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: "Frontend UI",
    title: "Frontend UI — 企业级前端动画组件库",
    description: "集成 GSAP、Motion、react-spring 等 6+ 动画引擎，130+ 组件，开箱即用。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend UI — 企业级前端动画组件库",
    description: "集成 GSAP、Motion、react-spring 等 6+ 动画引擎，130+ 组件，开箱即用。",
    creator: "@frontend_ui",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Frontend UI",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              description: "企业级前端动画组件库，集成 GSAP、Motion、react-spring 等 6+ 动画引擎。",
              url: "https://frontend-ui.dev",
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${outfitSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
