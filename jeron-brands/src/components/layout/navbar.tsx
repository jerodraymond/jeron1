"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tapcardUrl } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Business Card", href: "/business-card" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Jeron Brands
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <a href={tapcardUrl("/register")}>
              Create a Business Card <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <button className="text-ink lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line lg:hidden">
          <div className="container flex flex-col gap-4 py-6">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-ink" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <a href={tapcardUrl("/register")}>Create a Business Card</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
