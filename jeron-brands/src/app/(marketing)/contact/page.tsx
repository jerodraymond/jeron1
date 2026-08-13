import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Linkedin, Music2 } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";
import { getContactContent, getSocialLinksContent } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jeron Brands.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Jeron Brands | Contact", description: "Get in touch with Jeron Brands." },
};

export default async function ContactPage() {
  const [contact, socials] = await Promise.all([getContactContent(), getSocialLinksContent()]);
  const hasContactInfo = contact.phone || contact.whatsapp || contact.email || contact.address;
  const socialIcons = [
    { key: "instagram", Icon: Instagram, url: socials.instagram },
    { key: "facebook", Icon: Facebook, url: socials.facebook },
    { key: "linkedin", Icon: Linkedin, url: socials.linkedin },
    { key: "tiktok", Icon: Music2, url: socials.tiktok },
  ].filter((s) => s.url);

  return (
    <section className="container py-16 sm:py-24">
      <span className="text-xs font-medium uppercase tracking-widest text-coral">Contact</span>
      <h1 className="mt-4 max-w-xl text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Let&apos;s talk about your brand.
      </h1>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr]">
        {(hasContactInfo || socialIcons.length > 0) && (
          <div className="space-y-5">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-start gap-3 text-sm text-ink hover:text-coral">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-start gap-3 text-sm text-ink hover:text-coral">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" /> {contact.phone}
              </a>
            )}
            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-sm text-ink hover:text-coral"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" /> WhatsApp
              </a>
            )}
            {contact.address && (
              <div className="flex items-start gap-3 text-sm text-ink-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {contact.address}
              </div>
            )}

            {socialIcons.length > 0 && (
              <div className="flex gap-3 pt-2">
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
        )}

        <div className="max-w-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
