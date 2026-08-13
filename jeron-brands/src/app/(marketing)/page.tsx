import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Nfc, QrCode, Share2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RotatingBadge } from "@/components/marketing/rotating-badge";
import { getHeroContent, getPublishedServices, getPublishedProjects, getPublishedTestimonials, getCtaContent } from "@/lib/queries";
import { tapcardUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Creative Branding & Design",
  description: "Jeron Brands is a creative studio for branding, design, and digital identity — including TapCard, our digital business card product.",
  alternates: { canonical: "/" },
  openGraph: { title: "Jeron Brands | Creative Branding & Design", description: "We build brands people remember." },
};

export default async function HomePage() {
  const [hero, services, projects, testimonials, cta] = await Promise.all([
    getHeroContent(),
    getPublishedServices(),
    getPublishedProjects({ featuredOnly: true, limit: 4 }),
    getPublishedTestimonials(),
    getCtaContent(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="container pt-16 sm:pt-24">
        <div className="flex items-start justify-between gap-8">
          <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {hero.heading}
          </h1>
          <div className="hidden shrink-0 sm:block">
            <RotatingBadge />
          </div>
        </div>

        <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted">{hero.subheading}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <a href={tapcardUrl("/register")}>
              {hero.cta_label} <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/work">See our work</Link>
          </Button>
        </div>
      </section>

      {/* Services preview */}
      {services.length > 0 && (
        <section className="container mt-28 sm:mt-36">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">What we do</h2>
            <Link href="/services" className="hidden text-sm font-medium text-coral hover:underline sm:inline-flex items-center gap-1">
              All services <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s) => (
              <div key={s.id} className="bg-surface p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{s.name}</h3>
                {s.description && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured work */}
      {projects.length > 0 && (
        <section className="container mt-28 sm:mt-36">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Featured work</h2>
            <Link href="/work" className="hidden text-sm font-medium text-coral hover:underline sm:inline-flex items-center gap-1">
              Full portfolio <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <Link key={p.id} href={`/work/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-warm">
                  {p.main_image_url && (
                    <Image
                      src={p.main_image_url}
                      alt={p.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                    {p.category && <p className="mt-0.5 text-sm text-ink-muted">{p.category}</p>}
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Digital Business Card / TapCard */}
      <section className="mt-28 bg-forest py-20 text-forest-foreground sm:mt-36 sm:py-28">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full border border-forest-foreground/25 px-3 py-1 text-xs font-medium tracking-wide">
              A JERON BRANDS PRODUCT
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">{cta.heading}</h2>
            <p className="mt-4 max-w-md text-balance leading-relaxed text-forest-foreground/80">
              TapCard is our digital business card platform. Share your contact info, portfolio, and services with a single tap of NFC or a QR scan — no app required, always up to date.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-forest-foreground/90">
              <li className="flex items-center gap-2"><Nfc className="h-4 w-4 shrink-0" /> NFC sharing</li>
              <li className="flex items-center gap-2"><QrCode className="h-4 w-4 shrink-0" /> QR codes</li>
              <li className="flex items-center gap-2"><Share2 className="h-4 w-4 shrink-0" /> Social &amp; contact links</li>
              <li className="flex items-center gap-2"><Pencil className="h-4 w-4 shrink-0" /> Edit anytime</li>
            </ul>

            <Button size="lg" className="mt-9" asChild>
              <a href={tapcardUrl("/register")}>
                {cta.button_label} <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mx-auto w-[260px] rounded-[2rem] border border-forest-foreground/20 bg-forest-foreground/5 p-5">
            <div className="h-28 rounded-xl bg-coral" />
            <div className="-mt-10 mb-4 h-14 w-14 rounded-full border-4 border-forest bg-forest-foreground/20" />
            <div className="mb-1.5 h-3 w-28 rounded-full bg-forest-foreground/70" />
            <div className="mb-5 h-2.5 w-20 rounded-full bg-forest-foreground/40" />
            <div className="h-10 rounded-full bg-forest-foreground/15" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="container mt-28 sm:mt-36">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">What clients say</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="rounded-2xl border border-line bg-surface p-7">
                <p className="text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-surface-warm text-xs font-semibold text-ink-muted">
                    {t.client_image_url ? (
                      <Image src={t.client_image_url} alt={t.client_name} width={40} height={40} className="h-full w-full object-cover" />
                    ) : (
                      t.client_name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{t.client_name}</p>
                    {t.company && <p className="text-xs text-ink-faint">{t.company}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container my-28 sm:my-36">
        <div className="rounded-3xl border border-line bg-surface-warm px-8 py-16 text-center sm:px-16">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Let&apos;s build something worth remembering.
          </h2>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
