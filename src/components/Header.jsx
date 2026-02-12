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

            {isAuthenticated && user?.role === 'agent' && (
              <Link
                href="/agent-dashboard/birthdays"
                className={`font-paragraph text-base ${isActive('/agent-dashboard/birthdays') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
              >
                Birthdays
              </Link>
            )}

            {isAuthenticated && user?.role === 'agent' && (
              <Link
                href="/subscription"
                className={`font-paragraph text-base ${isActive('/subscription') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
              >
                Subscription
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

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu Panel */}
            <nav className="fixed right-4 top-20 left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 space-y-4 z-[70] md:hidden animate-in fade-in zoom-in duration-200 origin-top-right">
              {isAuthenticated && user?.role === 'agent' && (
                <Link
                  href="/agent-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-paragraph text-lg py-1 border-b border-muted/5 ${isActive('/agent-dashboard') ? 'text-primary font-bold' : 'text-foreground'
                    }`}
                >
                  Agent Dashboard
                </Link>
              )}

              {isAuthenticated && user?.role === 'agent' && (
                <Link
                  href="/agent-dashboard/birthdays"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-paragraph text-lg py-1 border-b border-muted/5 ${isActive('/agent-dashboard/birthdays') ? 'text-primary font-bold' : 'text-foreground'
                    }`}
                >
                  Birthdays
                </Link>
              )}

              {isAuthenticated && user?.role === 'agent' && (
                <Link
                  href="/subscription"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-paragraph text-lg py-1 border-b border-muted/5 ${isActive('/subscription') ? 'text-primary font-bold' : 'text-foreground'
                    }`}
                >
                  Subscription
                </Link>
              )}

              {isAuthenticated && user?.role === 'customer' && (
                <Link
                  href="/customer-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-paragraph text-lg py-1 border-b border-muted/5 ${isActive('/customer-dashboard') ? 'text-primary font-bold' : 'text-foreground'
                    }`}
                >
                  Customer Dashboard
                </Link>
              )}

              {isAuthenticated && (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-paragraph text-lg py-1 border-b border-muted/5 ${isActive('/profile') ? 'text-primary font-bold' : 'text-foreground'
                    }`}
                >
                  Profile
                </Link>
              )}

              {isAuthenticated ? (
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-6 bg-primary/5 p-3 rounded-xl border border-primary/10">
                    <User className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Logged in as</p>
                      <p className="font-bold text-foreground">{user.name}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    variant="outline"
                    className="w-full border-red-500 text-red-500 hover:bg-red-50 rounded-full py-6 font-bold text-base shadow-sm group"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block pt-2">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 font-bold text-base shadow-lg">
                    Login Now
                  </Button>
                </Link>
              )}
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

