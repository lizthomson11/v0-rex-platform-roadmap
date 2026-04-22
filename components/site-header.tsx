"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-md font-[family-name:var(--font-source-sans)]">
      <div className="container mx-auto max-w-[1920px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and title */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/hqo-profile-pic-x2.png"
              alt="HqO Logo"
              width={36}
              height={36}
              className="rounded-full ring-1 ring-white/10"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">REX Platform</span>
              <span className="text-[10px] text-gray-400 hidden sm:block">Product Roadmap</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <a
              href="https://helphub.hqo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-white transition-colors hidden sm:flex items-center gap-1"
            >
              Help Center
              <ExternalLink className="size-3" />
            </a>
            <a
              href="https://www.hqo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-black bg-white hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
            >
              Visit hqo.com
              <ExternalLink className="size-3" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
