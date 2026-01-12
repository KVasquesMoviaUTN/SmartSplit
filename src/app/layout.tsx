import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Smart Split",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A comprehensive workout tracking application to monitor your progress, muscle activation, and system stress."
};

export const metadata: Metadata = {
  title: {
    default: "Smart Split | Track Your Fitness Journey",
    template: "%s | Smart Split"
  },
  description: "A comprehensive workout tracking application to monitor your progress, muscle activation, and system stress.",
  applicationName: "Smart Split",
  authors: [{ name: "Smart Split Team" }],
  keywords: ["workout", "fitness", "tracker", "muscle heatmap", "system stress", "exercise log", "health"],
  creator: "Smart Split Team",
  publisher: "Smart Split Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Smart Split | Track Your Fitness Journey",
    description: "Optimize your training with advanced muscle mapping and recovery analysis.",
    url: "https://workout-planner-app.com",
    siteName: "Smart Split",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Split",
    description: "Track your fitness journey with precision.",
    creator: "@smartsplit",
  },
  icons: {
    icon: '/web-app-manifest-192x192.png',
    apple: '/web-app-manifest-192x192.png',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { SWAndPWA } from "@/components/SWAndPWA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <SWAndPWA />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
