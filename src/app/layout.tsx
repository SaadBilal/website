import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "@/components/ui/command-palette";
import { AIChatWidget } from "@/components/ui/ai-chat-widget";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.linkedin.com/in/saadbilal/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saad Bilal — Senior Full-Stack Engineer & Cloud Architect",
    template: "%s | Saad Bilal",
  },
  description:
    "Senior Full-Stack Engineer, Solutions Architect & AWS Cloud Expert based in Pakistan. Specializing in scalable SaaS, cloud infrastructure, AI integration, and enterprise systems. Available for remote opportunities worldwide.",
  keywords: [
    "Senior Python Developer",
    "AWS Cloud Engineer",
    "Full Stack Engineer",
    "Solutions Architect",
    "FastAPI Expert",
    "Django Developer",
    "Cloud Architect Pakistan",
    "Cloud Architect Germany",
    "Remote Software Engineer",
    "Backend Engineer",
    "Node.js Developer",
    "React Developer",
    "Next.js Developer",
    "Kubernetes",
    "Docker",
    "Terraform",
    "Microservices",
    "System Design",
    "Technical Lead",
    "Saad Bilal",
  ],
  authors: [{ name: "Saad Bilal", url: siteUrl }],
  creator: "Saad Bilal",
  publisher: "Saad Bilal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Saad Bilal",
    title: "Saad Bilal — Senior Full-Stack Engineer & Cloud Architect",
    description:
      "Senior Full-Stack Engineer, Solutions Architect & AWS Cloud Expert. Building scalable SaaS, cloud infrastructure, and AI-powered systems.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Saad Bilal - Senior Full-Stack Engineer & Cloud Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saad Bilal — Senior Full-Stack Engineer & Cloud Architect",
    description:
      "Senior Full-Stack Engineer, Solutions Architect & AWS Cloud Expert. Building scalable SaaS, cloud infrastructure, and AI-powered systems.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@saadbilal_dev",
  },
  alternates: { canonical: siteUrl },
  icons: {
    icon: [
      { url: "/portfolio/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Saad Bilal",
              url: siteUrl,
              sameAs: [
                "https://github.com/saadbilal",
                "https://linkedin.com/in/saadbilal",
              ],
              jobTitle: "Senior Full-Stack Engineer & Solutions Architect",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK | DE",
              },
              knowsAbout: [
                "Python", "FastAPI", "Django", "AWS", "Cloud Architecture",
                "Kubernetes", "Docker", "React", "Next.js", "System Design",
              ],
              description:
                "Senior Full-Stack Engineer, Solutions Architect & AWS Cloud Expert specializing in scalable SaaS, cloud infrastructure, and AI-powered systems.",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <CommandPalette />
          <AIChatWidget />
          <Toaster position="bottom-right" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
