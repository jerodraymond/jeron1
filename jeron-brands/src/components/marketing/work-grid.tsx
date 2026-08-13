"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category).filter((c): c is string => Boolean(c)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line-strong py-24 text-center text-ink-muted">
        No projects available yet.
      </div>
    );
  }

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === cat
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-ink-muted hover:border-ink hover:text-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link key={project.id} href={`/work/${project.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-warm">
              {project.main_image_url && (
                <Image
                  src={project.main_image_url}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{project.title}</h3>
                {project.category && <p className="mt-0.5 text-sm text-ink-muted">{project.category}</p>}
                {project.description && (
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-faint">{project.description}</p>
                )}
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
