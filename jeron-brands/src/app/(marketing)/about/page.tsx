import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAboutContent } from "@/lib/queries";
import { tapcardUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Jeron Brands is a creative studio for branding, design, and digital identity.",
  alternates: { canonical: "/about" },
  openGraph: { title: "Jeron Brands | About", description: "Who we are and how we work." },
};

const APPROACH = [
  {
    icon: Compass,
    title: "Our approach",
    body: "We start by understanding the business behind the brand — who it serves, what it stands for, and where it's headed — before a single design decision gets made.",
  },
  {
    icon: Sparkles,
    title: "Branding & design philosophy",
    body: "Good identity work is consistent, versatile, and built to last: it should hold up on a business card, a storefront, and a phone screen alike.",
  },
  {
    icon: Users,
    title: "Why clients choose us",
    body: "A single studio for branding, design, and digital presence — including TapCard, so your identity and your digital business card come from the same hand.",
  },
];

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <>
      <section className="container pt-16 sm:pt-24">
        <span className="text-xs font-medium uppercase tracking-widest text-coral">Who we are</span>
        <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {about.heading}
        </h1>
        {about.body && (
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-muted">{about.body}</p>
        )}
      </section>

      <section className="container mt-20 sm:mt-28">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">What Jeron Brands does</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
          We work across branding, logo design, graphic design, social media design, website design, and both
          traditional and digital business cards — helping businesses show up consistently everywhere they're seen.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {APPROACH.map((item) => (
            <div key={item.title} className="bg-surface p-7">
              <item.icon className="h-5 w-5 text-coral" />
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container my-28 sm:my-36">
        <div className="rounded-3xl border border-line bg-surface-warm px-8 py-16 text-center sm:px-16">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Let&apos;s talk about your brand.
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact us <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={tapcardUrl("/register")}>Create Your Business Card</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
