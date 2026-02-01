'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoading } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-card-background shadow-sm sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-primary">LIC Digital</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* <Link
              href="/"
              className={`font-paragraph text-base ${isActive('/') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                }`}
            >
              Home
            </Link> */}

            {isAuthenticated && user?.role === 'agent' && (
              <Link
                href="/agent-dashboard"
                className={`font-paragraph text-base ${isActive('/agent-dashboard') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
              >
                Agent Dashboard
              </Link>
            )}

            {isAuthenticated && user?.role === 'customer' && (
              <Link
                href="/customer-dashboard"
                className={`font-paragraph text-base ${isActive('/customer-dashboard') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
              >
                Customer Dashboard
              </Link>
            )}



            {isAuthenticated && (
              <Link
                href="/profile"
                className={`font-paragraph text-base ${isActive('/profile') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
              >
                Profile
              </Link>
            )}

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-4 ml-4 pl-4 border-l border-muted">
                    <div className="flex items-center gap-2 mr-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                    </div>
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 rounded-full px-6 py-2 font-bold h-auto transition-all hover:scale-105"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 py-2 font-bold h-auto shadow-md transition-all hover:scale-105">
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}
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
            {/* <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-paragraph text-base ${isActive('/') ? 'text-primary font-semibold' : 'text-foreground'
                }`}
            >
              Home
            </Link> */}

            {isAuthenticated && user?.role === 'agent' && (
              <Link
                href="/agent-dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-paragraph text-base ${isActive('/agent-dashboard') ? 'text-primary font-semibold' : 'text-foreground'
                  }`}
              >
                Agent Dashboard
              </Link>
            )}

            {isAuthenticated && user?.role === 'customer' && (
              <Link
                href="/customer-dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-paragraph text-base ${isActive('/customer-dashboard') ? 'text-primary font-semibold' : 'text-foreground'
                  }`}
              >
                Customer Dashboard
              </Link>
            )}



            {isAuthenticated && (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-paragraph text-base ${isActive('/profile') ? 'text-primary font-semibold' : 'text-foreground'
                  }`}
              >
                Profile
              </Link>
            )}

            {isAuthenticated ? (
              <div className="pt-4 border-t border-muted">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{user.name}</span>
                </div>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg px-4 py-2 font-semibold h-auto"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 font-semibold h-auto">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

