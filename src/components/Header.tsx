import { useState } from "react";
import { Heart, Phone, Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "#agendar", label: "Agendar" },
  { href: "#servicos", label: "Serviços" },
  { href: "#horarios", label: "Horários" },
  { href: "#calendario", label: "Calendário" },
  { href: "#como-chegar", label: "Localização" },
  { href: "#duvidas", label: "Dúvidas" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="sus-stripe h-1.5 w-full" aria-hidden />
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Heart className="h-5 w-5" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-extrabold text-primary">ESF São Carlos</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Vila Urlândia · SUS</p>
          </div>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-foreground/80 transition-base hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:+555531741588" className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary">
            <Phone className="h-3.5 w-3.5 text-primary" />
            (55) 3174-1588
          </a>
          <Button asChild size="sm" className="font-bold">
            <a href="#agendar"><Calendar className="mr-1.5 h-4 w-4" /> Agendar</a>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col py-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-semibold text-foreground/85 hover:bg-muted hover:text-primary"
              >
                {n.label}
              </a>
            ))}
            <a
              href="tel:+555531741588"
              className="mt-2 flex items-center gap-2 rounded-md bg-primary-soft px-3 py-2.5 text-sm font-bold text-primary"
            >
              <Phone className="h-4 w-4" /> Ligar para a unidade
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
