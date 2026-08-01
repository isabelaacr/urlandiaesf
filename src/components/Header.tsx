import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Início", end: true },
  { to: "/servicos", label: "Serviços" },
  { to: "/horarios", label: "Horários" },
  { to: "/calendario", label: "Calendário" },
  { to: "/equipe", label: "Equipe" },
  { to: "/localizacao", label: "Localização" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-semibold transition-base hover:text-primary",
      isActive ? "text-primary" : "text-foreground/80",
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="sus-stripe h-1.5 w-full" aria-hidden />
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Heart className="h-5 w-5" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-extrabold text-primary">ESF São Carlos</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Vila Urlândia · SUS</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+555531741588" className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary">
            <Phone className="h-3.5 w-3.5 text-primary" />
            (55) 3174-1588
          </a>
          <Button asChild size="sm" className="font-bold">
            <a href="tel:+555531741588"><Phone className="mr-1.5 h-4 w-4" /> Ligar</a>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col py-3">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-2 py-2.5 text-sm font-semibold hover:bg-muted hover:text-primary",
                    isActive ? "bg-primary-soft text-primary" : "text-foreground/85",
                  )
                }
              >
                {n.label}
              </NavLink>
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
