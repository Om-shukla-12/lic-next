'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-card-background shadow-sm sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl text-primary">LIC Digital</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`font-paragraph text-base ${isActive('/') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                }`}
            >
              Home
            </Link>
            <Link
              href="/agent-dashboard"
              className={`font-paragraph text-base ${isActive('/agent-dashboard') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                }`}
            >
              Agent
            </Link>
            <Link
              href="/customer-dashboard"
              className={`font-paragraph text-base ${isActive('/customer-dashboard') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                }`}
            >
              Customer
            </Link>
            <Link
              href="/do-dashboard"
              className={`font-paragraph text-base ${isActive('/do-dashboard') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                }`}
            >
              DO
            </Link>
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 font-semibold h-auto">
                Login
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-paragraph text-base ${isActive('/') ? 'text-primary font-semibold' : 'text-foreground'
                }`}
            >
              Home
            </Link>
            <Link
              href="/agent-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-paragraph text-base ${isActive('/agent-dashboard') ? 'text-primary font-semibold' : 'text-foreground'
                }`}
            >
              Agent Dashboard
            </Link>
            <Link
              href="/customer-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-paragraph text-base ${isActive('/customer-dashboard') ? 'text-primary font-semibold' : 'text-foreground'
                }`}
            >
              Customer Dashboard
            </Link>
            <Link
              href="/do-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-paragraph text-base ${isActive('/do-dashboard') ? 'text-primary font-semibold' : 'text-foreground'
                }`}
            >
              DO Dashboard
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 font-semibold h-auto">
                Login
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

