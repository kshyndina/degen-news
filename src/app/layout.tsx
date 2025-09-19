import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SEO } from "@/components/seo/SEO";
import { StructuredData } from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "degenNews - Crypto Security News",
  description: "Minimalistic crypto security news website covering hacks, scams, and security incidents in the cryptocurrency space",
  keywords: ["crypto", "security", "hacks", "scams", "blockchain", "bitcoin", "ethereum"],
  authors: [{ name: "degenNews" }],
  openGraph: {
    title: "degenNews - Crypto Security News",
    description: "Minimalistic crypto security news website covering hacks, scams, and security incidents",
    url: "https://degennews.com",
    siteName: "degenNews",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "degenNews - Crypto Security News",
    description: "Minimalistic crypto security news website covering hacks, scams, and security incidents",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEO />
        <StructuredData
          type="website"
          data={{}}
        />
        <link rel="icon" href="/Degen-news.svg" type="image/svg+xml" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
        
        {/* Preload key assets */}
        <link rel="preload" href="/Degen-news.svg" as="image" type="image/svg+xml" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <noscript>
          <link 
            rel="stylesheet" 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          />
        </noscript>
        
        {/* Performance hints */}
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
