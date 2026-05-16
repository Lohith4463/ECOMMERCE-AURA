import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  className
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-white/58">{copy}</p> : null}
    </div>
  );
}
