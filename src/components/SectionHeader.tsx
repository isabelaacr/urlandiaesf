import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

const SectionHeader = ({ eyebrow, title, description, align = "left", className }: Props) => {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      <h2 className="mt-2 font-display text-2xl font-extrabold text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
