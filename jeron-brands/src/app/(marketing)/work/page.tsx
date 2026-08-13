import type { Metadata } from "next";
import { getPublishedProjects } from "@/lib/queries";
import { WorkGrid } from "@/components/marketing/work-grid";

export const metadata: Metadata = {
  title: "Our Work",
  description: "A selection of branding, design, and digital identity projects from Jeron Brands.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Jeron Brands | Our Work", description: "A selection of our project work." },
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <>
      <section className="container pt-16 sm:pt-24">
        <span className="text-xs font-medium uppercase tracking-widest text-coral">Our work</span>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Selected projects.
        </h1>
      </section>

      <section className="container mt-16 sm:mt-20 mb-28 sm:mb-36">
        <WorkGrid projects={projects} />
      </section>
    </>
  );
}
