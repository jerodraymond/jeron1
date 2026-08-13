import type { Metadata } from "next";
import { ArrowUpRight, Nfc, QrCode, Link2, Contact, Pencil, Briefcase, Image as ImageIcon, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tapcardUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Digital Business Cards",
  description: "TapCard, our digital business card product — share your business instantly with NFC, QR code, or a link.",
  alternates: { canonical: "/business-card" },
  openGraph: { title: "Jeron Brands | Digital Business Cards", description: "Your business card, reimagined." },
};

const BENEFITS = [
  { icon: Contact, label: "Business information" },
  { icon: Link2, label: "Social media" },
  { icon: ImageIcon, label: "Portfolio" },
  { icon: Briefcase, label: "Services" },
  { icon: ShoppingBag, label: "Products" },
  { icon: Nfc, label: "Contact buttons" },
  { icon: QrCode, label: "Save contact" },
  { icon: Pencil, label: "Easy updates" },
];

export default function BusinessCardPage() {
  return (
    <>
      <section className="container grid grid-cols-1 items-center gap-12 pt-16 sm:pt-24 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full border border-line-strong px-3 py-1 text-xs font-medium tracking-wide text-ink-muted">
            A JERON BRANDS PRODUCT
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Your business card, reimagined.
          </h1>
          <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-ink-muted">
            TapCard is our digital business card platform. Build one profile, then share it with a tap of NFC, a QR
            scan, or a simple link — always up to date, never reprinted.
          </p>
          <Button size="lg" className="mt-9" asChild>
            <a href={tapcardUrl("/register")}>
              Create Your Business Card <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Illustrative mockup — not the real TapCard UI, just previews the idea */}
        <div className="mx-auto w-[280px] rounded-[2.25rem] border border-line-strong bg-surface p-5 shadow-soft">
          <div className="h-28 rounded-xl bg-gradient-to-br from-coral to-forest" />
          <div className="-mt-10 mb-4 h-16 w-16 rounded-full border-4 border-surface bg-surface-warm" />
          <div className="mb-1.5 h-3 w-32 rounded-full bg-ink/80" />
          <div className="mb-5 h-2.5 w-20 rounded-full bg-ink-faint/60" />
          <div className="mb-5 flex gap-2">
            {[Contact, Nfc, Link2, QrCode].map((Icon, i) => (
              <div key={i} className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink-muted">
                <Icon className="h-4 w-4" />
              </div>
            ))}
          </div>
          <div className="h-11 rounded-full bg-coral/15" />
        </div>
      </section>

      <section className="container mt-24 sm:mt-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-warm">
              <Nfc className="h-5 w-5 text-coral" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">Tap with NFC</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">Hold a phone near your card — the profile opens instantly, no app needed.</p>
          </div>
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-warm">
              <QrCode className="h-5 w-5 text-coral" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">Scan a QR code</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">Every card gets a downloadable, print-ready QR code.</p>
          </div>
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-warm">
              <Link2 className="h-5 w-5 text-coral" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">Or just send a link</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">Text it, email it, drop it in a bio — it works everywhere.</p>
          </div>
        </div>
      </section>

      <section className="container mt-24 sm:mt-32">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">What's on your card</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.label} className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-5">
              <b.icon className="h-5 w-5 text-coral" />
              <span className="text-sm font-medium text-ink">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container my-28 sm:my-36">
        <div className="rounded-3xl border border-line bg-surface-warm px-8 py-16 text-center sm:px-16">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Your traditional business card is good. Your digital one is better.
          </h2>
          <Button size="lg" className="mt-8" asChild>
            <a href={tapcardUrl("/register")}>
              Create Your Business Card <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
