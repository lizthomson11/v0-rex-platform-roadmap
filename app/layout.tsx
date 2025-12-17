import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HqO Roadmap",
  description: "HqO REX Platform Roadmap - 2025-2026 Product Development Timeline",
  generator: "v0.app",
  icons: {
    icon: "/images/hqo-profile-pic-x2.png",
    apple: "/images/hqo-profile-pic-x2.png",
  },
  openGraph: {
    title: "HqO REX Platform Roadmap",
    description: "2025-2026 Product Development Timeline",
    siteName: "HqO",
    images: [
      {
        url: "/images/hqo-profile-pic-x2.png",
        width: 512,
        height: 512,
        alt: "HqO Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "HqO REX Platform Roadmap",
    description: "2025-2026 Product Development Timeline",
    images: ["/images/hqo-profile-pic-x2.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
