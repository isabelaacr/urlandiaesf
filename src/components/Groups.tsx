import { Users2, Activity, Dumbbell, Baby } from "lucide-react";

const groups = [
  {
    icon: Users2,
    name: "Grupo Amigos da Saúde",
    schedule: "Segundas-feiras · 8h",
    desc: "Encontros voltados especialmente para idosos, com promoção da saúde e socialização.",
    accent: "bg-primary text-primary-foreground",
  },
  {
    icon: Activity,
    name: "Grupo Vida Leve",
    schedule: "Terças-feiras · 14h",
    desc: "Atividades em grupo para hábitos saudáveis, alimentação e bem-estar.",
    accent: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Dumbbell,
    name: "Grupo Fisioterapia UFN",
    schedule: "Quartas-feiras · 8h",
    desc: "Em parceria com a UFN, atividades de fisioterapia e cuidado preventivo.",
    accent: "bg-success text-primary-foreground",
  },
  {
    icon: Baby,
    name: "Grupo de Gestantes",
    schedule: "Mensal",
    desc: "Encontros de orientação para gestantes do território — confirme a próxima data na recepção.",
    accent: "bg-primary-glow text-primary-foreground",
  },
];

const Groups = () => {
  return (
    <section id="grupos" className="bg-muted/40 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Educação em saúde</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Grupos da comunidade
          </h2>
          <p className="mt-4 text-muted-foreground">
            Participe das atividades coletivas da ESF São Carlos. São gratuitas, abertas à comunidade e fortalecem o cuidado em rede.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {groups.map((g, i) => (
            <article
              key={g.name}
              style={{ animationDelay: `${i * 80}ms` }}
              className="animate-fade-in-up overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-base hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex items-start gap-5 p-6">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-soft ${g.accent}`}>
                  <g.icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-extrabold text-foreground">{g.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{g.schedule}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Groups;
