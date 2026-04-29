import { Stethoscope, HeartPulse, Syringe, Smile, Users, UserCog } from "lucide-react";

const team = [
  { icon: Stethoscope, role: "Médicos(as)", count: 2, desc: "Atendimento clínico nas áreas 19 e 20." },
  { icon: HeartPulse, role: "Enfermeiros(as)", count: 2, desc: "Consultas, acolhimento e coordenação do cuidado." },
  { icon: Syringe, role: "Técnicos(as) de Enfermagem", count: 2, desc: "Procedimentos, curativos e sala de vacina." },
  { icon: Users, role: "Agentes Comunitários de Saúde", count: 8, desc: "Vínculo com o território e visitas domiciliares." },
  { icon: Smile, role: "Cirurgião(ã)-Dentista", count: 1, desc: "Atendimento odontológico para toda a família." },
  { icon: UserCog, role: "Equipe de apoio", count: null, desc: "Recepção, higienização e gestão da unidade." },
];

import SectionHeader from "./SectionHeader";

const Team = () => {
  return (
    <section id="equipe" className="section-y bg-muted/40">
      <div className="container">
        <SectionHeader
          eyebrow="Nossa equipe"
          title="Profissionais cuidando de você"
          description="Equipe multiprofissional com carga horária média de 40 horas semanais, dedicada à saúde da comunidade do território."
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <article
              key={m.role}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-fade-in-up rounded-xl border border-border bg-card p-6 shadow-soft transition-base hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <m.icon className="h-7 w-7" />
                </div>
                <div>
                  {m.count !== null && (
                    <p className="font-display text-3xl font-extrabold leading-none text-primary">{String(m.count).padStart(2, "0")}</p>
                  )}
                  <p className="mt-1 font-display text-base font-bold text-foreground">{m.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 rounded-2xl border border-border bg-gradient-card p-6 shadow-soft sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Estrutura física</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Recepção, sala de acolhimento, consultórios médico e de enfermagem, sala de procedimentos, sala de vacinação e acesso à internet.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Áreas de cobertura</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Atendemos as <strong className="text-foreground">áreas 19 e 20</strong> do território, com acolhimento diferenciado para cada região.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
