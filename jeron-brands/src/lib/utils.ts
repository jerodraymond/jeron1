import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tapcardUrl(path: string = ""): string {
  const base = process.env.NEXT_PUBLIC_TAPCARD_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${path}`;
}
