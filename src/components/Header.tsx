import { Heart, Phone, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      {/* faixa institucional verde/amarela */}
      <div className="sus-stripe h-1.5 w-full" aria-hidden />
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Heart className="h-5 w-5" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-extrabold text-primary">UBS Vila Saúde</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Sistema Único de Saúde</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#servicos" className="text-sm font-semibold text-foreground/80 transition-base hover:text-primary">Serviços</a>
          <a href="#agendar" className="text-sm font-semibold text-foreground/80 transition-base hover:text-primary">Agendar</a>
          <a href="#horarios" className="text-sm font-semibold text-foreground/80 transition-base hover:text-primary">Horários</a>
          <a href="#duvidas" className="text-sm font-semibold text-foreground/80 transition-base hover:text-primary">Dúvidas</a>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold">(11) 3000-1234</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold">Rua das Flores, 250</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
