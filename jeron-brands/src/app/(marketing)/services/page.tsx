import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublishedServices } from "@/lib/queries";
import { tapcardUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: "Branding, logo design, graphic design, and digital identity services from Jeron Brands.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Jeron Brands | Services", description: "What we do, end to end." },
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <section className="container pt-16 sm:pt-24">
        <span className="text-xs font-medium uppercase tracking-widest text-coral">Services</span>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Everything your brand needs to show up well.
        </h1>
      </section>

      <section className="container mt-16 sm:mt-20">
        {services.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong py-24 text-center text-ink-muted">
            No services available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="relative aspect-[4/3] bg-surface-warm">
                  {service.image_url ? (
                    <Image
                      src={service.image_url}
                      alt={service.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Sparkles className="h-6 w-6 text-ink-faint" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-display text-lg font-semibold text-ink">{service.name}</h2>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{service.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container my-28 sm:my-36">
        <div className="rounded-3xl border border-line bg-forest px-8 py-16 text-center text-forest-foreground sm:px-16">
          <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Need a digital business card?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-forest-foreground/80">
            TapCard, our digital business card product, is included in how we help clients show up online.
          </p>
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
