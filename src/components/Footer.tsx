import { Heart, MapPin, Phone, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Heart className="h-5 w-5" fill="currentColor" />
            </div>
            <div>
              <p className="font-display text-lg font-extrabold">ESF São Carlos/Urlândia</p>
              <p className="text-xs text-primary-foreground/70">Estratégia Saúde da Família · SUS</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
            Atendimento gratuito, humanizado e de qualidade para a comunidade da Vila Urlândia.
          </p>
        </div>

        <div>
          <p className="font-display font-bold uppercase tracking-wider text-secondary">Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> Rua Agostinho Scolari, 546 – Vila Urlândia</li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-secondary" /> (55) 3174-1588 – opção 1</li>
            <li className="flex items-center gap-2.5">
              <Instagram className="h-4 w-4 text-secondary" />
              <a href="https://instagram.com/esf_saocarlos" target="_blank" rel="noopener noreferrer" className="hover:underline">@esf_saocarlos</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display font-bold uppercase tracking-wider text-secondary">Emergências</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><strong>SAMU:</strong> 192</li>
            <li><strong>Bombeiros:</strong> 193</li>
            <li><strong>Disque Saúde:</strong> 136</li>
          </ul>
        </div>
      </div>

      <div className="sus-stripe h-1.5 w-full" aria-hidden />
      <div className="container py-4 text-center text-xs text-primary-foreground/70">
        © {new Date().getFullYear()} ESF São Carlos/Urlândia · Sistema Único de Saúde
      </div>
    </footer>
  );
};

export default Footer;
