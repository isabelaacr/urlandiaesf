import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { Calendar, Stethoscope, Clock, CalendarRange, Users, MapPin, ArrowRight } from "lucide-react";

const QUICK = [
  { to: "/agendar", icon: Calendar, title: "Agendar consulta", desc: "Marque em menos de 1 minuto e receba o comprovante." },
  { to: "/servicos", icon: Stethoscope, title: "Serviços", desc: "Veja tudo que a unidade oferece pelo SUS." },
  { to: "/horarios", icon: Clock, title: "Horários", desc: "Consulte funcionamento por área e por dia." },
  { to: "/calendario", icon: CalendarRange, title: "Calendário e grupos", desc: "Eventos, campanhas e grupos da comunidade." },
  { to: "/equipe", icon: Users, title: "Equipe", desc: "Conheça médicos, enfermeiros, ACS e dentista." },
  { to: "/localizacao", icon: MapPin, title: "Como chegar", desc: "Endereço, mapa e rota até a unidade." },
];

const Index = () => {
  return (
    <>
      <Hero />
      <section className="section-y">
        <div className="container">
          <SectionHeader
            eyebrow="Acesso rápido"
            title="Para onde você quer ir?"
            description="Escolha um dos atalhos abaixo para acessar diretamente o que você precisa."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK.map(({ to, icon: Icon, title, desc }) => (
              <Link
                key={to}
                to={to}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-base hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold text-foreground">{title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Acessar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
