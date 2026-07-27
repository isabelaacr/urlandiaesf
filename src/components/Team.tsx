import { Stethoscope, HeartPulse, Syringe, Smile, Users, UserCog, ClipboardList, Sparkles, Brush } from "lucide-react";
import SectionHeader from "./SectionHeader";

type Member = { name: string; role?: string };
type Group = {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  members: Member[];
  note?: string;
};

const groups: Group[] = [
  {
    icon: UserCog,
    title: "Recepção e Administrativo",
    members: [
      { name: "Samuel Gomes", role: "Recepção — manhã e tarde (Sulclean)" },
      { name: "Raphaella", role: "Recepção — manhã (Jovem Aprendiz CIEE)" },
      { name: "Helena", role: "Recepção — tarde (Jovem Aprendiz CIEE)" },
      { name: "Camilla Lovato", role: "Agente Administrativa" },
    ],
  },
  {
    icon: Stethoscope,
    title: "ESF — Área 19",
    subtitle: "Acolhimento seg–sex, 8h–9h e 13h–14h",
    members: [
      { name: "Dr. Lucas de Almeida", role: "Médico" },
      { name: "Enf. Maria das Graças", role: "Responsável Técnica" },
      { name: "Enf. Vanessa", role: "Residente em Obstetrícia" },
      { name: "Ezedir", role: "Técnica de Enfermagem" },
      { name: "ACS Carina" },
      { name: "ACS Patrícia" },
      { name: "ACS Iolanda" },
      { name: "ACS Mariele" },
      { name: "ACS Cláudia" },
    ],
  },
  {
    icon: HeartPulse,
    title: "ESF — Área 20",
    subtitle: "Acolhimento ter/qui, 8h–11h e 13h–16h",
    members: [
      { name: "Dra. Cátia Augusta", role: "Médica" },
      { name: "Enf. Denise Vedootto", role: "Responsável Técnica" },
      { name: "Enf. Anny", role: "Residente em Obstetrícia" },
      { name: "Mariana", role: "Técnica de Enfermagem" },
      { name: "ACS Giovanni" },
      { name: "ACS Mara Paz" },
      { name: "ACS Maristela" },
      { name: "ACS Elisane", role: "Afastada por laudo" },
    ],
  },
  {
    icon: Smile,
    title: "Saúde Bucal",
    members: [{ name: "Dentista Sabrina", role: "Cirurgiã-dentista" }],
    note: "Atende toda a população adscrita à unidade, sem divisão por áreas. Agendamentos feitos diretamente com a profissional (quartas, 8h).",
  },
  {
    icon: Brush,
    title: "Serviços Gerais",
    members: [{ name: "Jocélia", role: "Serviços Gerais (Sulclean)" }],
  },
];

const Team = () => {
  return (
    <section id="equipe" className="section-y bg-muted/40">
      <div className="container">
        <SectionHeader
          eyebrow="Nossa equipe"
          title="Profissionais cuidando de você"
          description="Equipe multiprofissional das Áreas 19 e 20, dedicada à saúde da comunidade da Vila Urlândia."
          align="center"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <article
              key={g.title}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-fade-in-up rounded-2xl border border-border bg-card p-6 shadow-soft transition-base hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <g.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-base font-extrabold text-foreground">{g.title}</p>
                  {g.subtitle && <p className="text-xs text-muted-foreground">{g.subtitle}</p>}
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm">
                {g.members.map((m) => (
                  <li key={m.name} className="border-b border-border/60 pb-2 last:border-0 last:pb-0">
                    <p className="font-semibold text-foreground">{m.name}</p>
                    {m.role && <p className="text-xs text-muted-foreground">{m.role}</p>}
                  </li>
                ))}
              </ul>

              {g.note && (
                <p className="mt-4 rounded-lg bg-primary-soft/50 p-3 text-xs leading-relaxed text-foreground/80">
                  {g.note}
                </p>
              )}
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
