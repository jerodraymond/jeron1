import Link from "next/link";
import { Instagram, Facebook, Linkedin, Music2, Mail, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getContactContent, getSocialLinksContent, getPublishedServices } from "@/lib/queries";
import { tapcardUrl } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Business Card", href: "/business-card" },
  { label: "Contact", href: "/contact" },
];

export async function Footer() {
  const [contact, socials, services] = await Promise.all([
    getContactContent(),
    getSocialLinksContent(),
    getPublishedServices(),
  ]);

  const socialIcons = [
    { key: "instagram", Icon: Instagram, url: socials.instagram },
    { key: "facebook", Icon: Facebook, url: socials.facebook },
    { key: "linkedin", Icon: Linkedin, url: socials.linkedin },
    { key: "tiktok", Icon: Music2, url: socials.tiktok },
  ].filter((s) => s.url);

  return (
    <footer className="border-t border-line bg-surface-warm py-16">
      <div className="container grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-ink">Jeron Brands</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            A creative studio for branding, design, and digital identity — including TapCard, our digital business card product.
          </p>
          {socialIcons.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socialIcons.map(({ key, Icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-ink">Navigate</p>
          <ul className="mt-4 space-y-2.5">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-muted hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {services.length > 0 && (
          <div>
            <p className="text-sm font-medium text-ink">Services</p>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href="/services" className="text-sm text-ink-muted hover:text-ink">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-ink">Get in touch</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            {contact.email && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${contact.email}`} className="hover:text-ink">{contact.email}</a>
              </li>
            )}
            {contact.phone && (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${contact.phone}`} className="hover:text-ink">{contact.phone}</a>
              </li>
            )}
            {contact.address && <li>{contact.address}</li>}
          </ul>
          <Button size="sm" className="mt-5" asChild>
            <a href={tapcardUrl("/register")}>
              Create a Business Card <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>

      <div className="container mt-12 border-t border-line pt-6 text-xs text-ink-faint">
        © {new Date().getFullYear()} Jeron Brands. All rights reserved.
      </div>
    </footer>
  );
}
