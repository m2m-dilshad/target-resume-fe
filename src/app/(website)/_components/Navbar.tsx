'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { NavLinksList } from '../_constants/navlinks';
import Logo from '../../../components/Logo';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    },
    [mobileMenuOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    function handleRouteChange() {
      setMobileMenuOpen(false);
    }
    handleRouteChange();
  }, [pathname]);

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-(--page-width) items-center justify-between">
        <Logo href="/" logoSize={30} textSize="sm" className="font-bold" />
        <nav className="hidden items-center gap-2 md:flex">
          {NavLinksList.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-base1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <Button href="/signup" className="hidden px-4 font-normal sm:inline-flex" variant="link">
            Get Started
          </Button>
          <button
            type="button"
            className="rounded-md p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-border border-t md:hidden"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <nav
            className="container mx-auto flex flex-col gap-2 px-4 py-4"
            aria-label="Mobile navigation"
          >
            {NavLinksList.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button
              href="/signup"
              variant="link"
              roundSize="base"
              className="mt-2 inline-flex w-full items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
