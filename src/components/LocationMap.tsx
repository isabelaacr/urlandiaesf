import { MapPin, Navigation, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADDRESS = "Rua Agostinho Scolari, 546 - Vila Urlândia, Santa Maria - RS";
const MAPS_QUERY = encodeURIComponent(ADDRESS);

const LocationMap = () => {
  return (
    <section id="como-chegar" className="bg-muted/40 py-20">
      <div className="container">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Localização</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Como chegar até a unidade
          </h2>
          <p className="mt-4 text-muted-foreground">
            Estamos no coração da Vila Urlândia, com fácil acesso por transporte público e estacionamento na rua.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
          <div className="space-y-5 rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wider text-primary">Endereço</p>
                <p className="mt-1 font-semibold text-foreground">Rua Agostinho Scolari, 546</p>
                <p className="text-sm text-muted-foreground">Vila Urlândia · Santa Maria – RS</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wider text-primary">Telefone</p>
                <p className="mt-1 font-semibold text-foreground">(55) 3174-1588</p>
                <p className="text-sm text-muted-foreground">Opção 1 · Recepção</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wider text-primary">Funcionamento</p>
                <p className="mt-1 font-semibold text-foreground">Seg–Sex · 8h–12h e 13h–17h</p>
                <p className="text-sm text-muted-foreground">Quartas à tarde fechado · reunião de equipe</p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full font-bold shadow-soft"
            >
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="mr-2 h-4 w-4" />
                Traçar rota no Google Maps
              </a>
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-elevated">
            <iframe
              title="Mapa da ESF São Carlos/Urlândia"
              src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
