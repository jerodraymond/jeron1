"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a little more (at least 10 characters)"),
});
type ContactInput = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    const supabase = createClient();

    // Fold the optional phone into the message body — jb_messages has no
    // dedicated phone column, and adding one isn't needed for a field that's
    // only ever displayed alongside the message anyway.
    const message = data.phone ? `${data.message}\n\nPhone: ${data.phone}` : data.message;

    const { error } = await supabase.from("jb_messages").insert({
      name: data.name,
      email: data.email,
      message,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface-warm p-6">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
        <div>
          <p className="font-medium text-ink">Message sent.</p>
          <p className="mt-1 text-sm text-ink-muted">Thanks for reaching out — we'll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-ink">Name</label>
          <input
            id="name"
            className="h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-coral/30"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
          <input
            id="email"
            type="email"
            className="h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-coral/30"
            placeholder="you@company.com"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-ink">Phone (optional)</label>
        <input
          id="phone"
          className="h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-coral/30"
          placeholder="+1 555 000 0000"
          {...register("phone")}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">Message</label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-coral/30"
          placeholder="Tell us about your project..."
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" /> Something went wrong sending your message. Please try again.
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Message
      </Button>
    </form>
  );
}
