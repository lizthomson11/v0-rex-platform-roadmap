import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HqO Roadmap",
  description: "HqO REX Platform Roadmap showcasing 2025-2026 product development timeline across all suites.",
  authors: [{ name: "HqO Product Team" }],
  icons: {
    icon: "/images/hqo-profile-pic-x2.png",
    apple: "/images/hqo-profile-pic-x2.png",
  },
  openGraph: {
    title: "HqO REX Platform Roadmap",
    description: "HqO REX Platform Roadmap showcasing 2025-2026 product development timeline across all suites.",
    siteName: "HqO",
    url: "https://roadmap.hqo.com",
    publishedTime: "2025-12-17T00:00:00.000Z",
    images: [
      {
        url: "https://roadmap.hqo.com/images/hqo-profile-pic-x2.png",
        width: 1200,
        height: 630,
        alt: "HqO Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HqO REX Platform Roadmap",
    description: "HqO REX Platform Roadmap showcasing 2025-2026 product development timeline across all suites.",
    images: ["https://roadmap.hqo.com/images/hqo-profile-pic-x2.png"],
  },
    generator: 'v0.app'
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
