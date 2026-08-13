export function RotatingBadge({ text = "AVAILABLE FOR PROJECTS • JERON BRANDS • " }: { text?: string }) {
  const repeated = text.repeat(2);

  return (
    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="8.2" fill="currentColor" className="text-ink-muted" letterSpacing="1.5">
          <textPath href="#badge-circle">{repeated}</textPath>
        </text>
      </svg>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-coral-foreground">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
