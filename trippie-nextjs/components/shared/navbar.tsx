'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Trippie</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="/planner" className="text-sm font-medium hover:text-primary transition-colors">
              Trip Planner
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog Generator
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/planner">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
