'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ConsultationButton from './consultation-button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="#" className="text-2xl font-bold text-secondary hover:text-secondary/80 transition">
              UNIHAIR
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-foreground hover:text-primary transition">서비스</a>
            <a href="#reviews" className="text-sm text-foreground hover:text-primary transition">후기</a>
            <a href="#team" className="text-sm text-foreground hover:text-primary transition">스타일리스트</a>
            <a href="#location" className="text-sm text-foreground hover:text-primary transition">위치</a>
            <ConsultationButton className="text-sm px-4 py-1.5 text-xs" location="header" action="scroll" />
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <a href="#services" className="text-sm text-foreground hover:text-primary transition py-2">서비스</a>
            <a href="#reviews" className="text-sm text-foreground hover:text-primary transition py-2">후기</a>
            <a href="#team" className="text-sm text-foreground hover:text-primary transition py-2">스타일리스트</a>
            <a href="#location" className="text-sm text-foreground hover:text-primary transition py-2">위치</a>
            <div className="pt-2">
              <ConsultationButton className="w-full" location="header_mobile" action="scroll" />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
