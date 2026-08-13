import { createClient } from "@/lib/supabase/client";
import type {
  Project, ProjectImage, Service, Testimonial, GalleryImage,
  HeroContent, AboutContent, ContactContent, SocialLinksContent, CtaContent,
} from "@/types/content";

export async function getWebsiteContent<T>(key: string, fallback: T): Promise<T> {
  const supabase = createClient();
  const { data } = await supabase.from("jb_website_content").select("content").eq("key", key).maybeSingle();
  return (data?.content as T) ?? fallback;
}

export const getHeroContent = () =>
  getWebsiteContent<HeroContent>("hero", {
    heading: "We build brands people remember.",
    subheading: "Jeron Brands is a creative studio for branding, design, and digital identity.",
    cta_label: "Create Your Business Card",
  });

export const getAboutContent = () =>
  getWebsiteContent<AboutContent>("about", { heading: "About Jeron Brands", body: "" });

export const getContactContent = () =>
  getWebsiteContent<ContactContent>("contact", { phone: "", whatsapp: "", email: "", address: "" });

export const getSocialLinksContent = () =>
  getWebsiteContent<SocialLinksContent>("social_links", { instagram: "", facebook: "", linkedin: "", tiktok: "" });

export const getCtaContent = () =>
  getWebsiteContent<CtaContent>("cta", {
    heading: "Your traditional business card is good. Your digital one is better.",
    button_label: "Create Your Business Card",
  });

export async function getPublishedServices(): Promise<Service[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("jb_services")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });
  return data ?? [];
}

export async function getPublishedProjects(opts: { featuredOnly?: boolean; limit?: number } = {}): Promise<Project[]> {
  const supabase = createClient();
  let query = supabase.from("jb_projects").select("*").eq("is_published", true).order("display_order", { ascending: true });
  if (opts.featuredOnly) query = query.eq("is_featured", true);
  if (opts.limit) query = query.limit(opts.limit);
  const { data } = await query;
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createClient();
  const { data } = await supabase.from("jb_projects").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
  return data ?? null;
}

export async function getProjectImages(projectId: string): Promise<ProjectImage[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("jb_project_images")
    .select("*")
    .eq("project_id", projectId)
    .order("display_order", { ascending: true });
  return data ?? [];
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("jb_testimonials")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });
  return data ?? [];
}

export async function getGalleryImages(limit = 12): Promise<GalleryImage[]> {
  const supabase = createClient();
  const { data } = await supabase.from("jb_gallery").select("*").order("display_order", { ascending: true }).limit(limit);
  return data ?? [];
}
