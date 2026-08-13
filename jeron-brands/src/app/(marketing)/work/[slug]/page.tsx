import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, getProjectImages } from "@/lib/queries";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const description = project.description || `${project.title} — a Jeron Brands project.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      images: project.main_image_url ? [project.main_image_url] : undefined,
      type: "article",
    },
    twitter: { card: "summary_large_image", title: project.title, description },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const images = await getProjectImages(project.id);

  return (
    <>
      <section className="container pt-16 sm:pt-24">
        <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Our Work
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            {project.category && (
              <span className="text-xs font-medium uppercase tracking-widest text-coral">{project.category}</span>
            )}
            <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {project.title}
            </h1>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:text-right">
            {project.client_name && (
              <>
                <dt className="text-ink-faint">Client</dt>
                <dd className="text-ink">{project.client_name}</dd>
              </>
            )}
            {project.project_date && (
              <>
                <dt className="text-ink-faint">Date</dt>
                <dd className="text-ink">
                  {new Date(project.project_date).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                </dd>
              </>
            )}
          </dl>
        </div>
      </section>

      {project.main_image_url && (
        <section className="container mt-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-warm">
            <Image src={project.main_image_url} alt={project.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        </section>
      )}

      <section className="container mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        {project.description && (
          <div className="max-w-2xl text-balance text-lg leading-relaxed text-ink-muted">{project.description}</div>
        )}

        {(project.services_provided.length > 0 || project.project_url) && (
          <div className="space-y-6 lg:border-l lg:border-line lg:pl-10">
            {project.services_provided.length > 0 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-ink-faint">Services provided</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.services_provided.map((s) => (
                    <li key={s} className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-coral hover:underline"
              >
                Visit project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </section>

      {images.length > 0 && (
        <section className="container mt-16 mb-28 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:mb-36">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-warm">
              <Image src={img.image_url} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </section>
      )}
    </>
  );
}
