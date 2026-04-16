import { Stethoscope, Syringe, Baby, HeartPulse, TestTube2, Smile, Users, Activity } from "lucide-react";

const services = [
  { icon: Stethoscope, title: "Clínica Geral", desc: "Consultas médicas para adultos com a equipe da ESF." },
  { icon: Baby, title: "Pediatria", desc: "Acompanhamento do crescimento e saúde infantil." },
  { icon: HeartPulse, title: "Saúde da Mulher", desc: "Pré-natal, preventivo e planejamento familiar." },
  { icon: Syringe, title: "Sala de Vacinação", desc: "Aplicação das vacinas do calendário do SUS." },
  { icon: TestTube2, title: "Coleta Laboratorial", desc: "Coletas às terças e sextas pela manhã." },
  { icon: Smile, title: "Odontologia", desc: "Atendimento odontológico para toda a família." },
  { icon: Users, title: "Equipe Saúde da Família", desc: "Médico, enfermeiro, técnicos e agentes comunitários." },
  { icon: Activity, title: "Curativos e Procedimentos", desc: "Cuidados de enfermagem e procedimentos básicos." },
];

const Services = () => {
  return (
    <section id="servicos" className="bg-muted/40 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Nossos serviços</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Atendimento completo, perto de você
          </h2>
          <p className="mt-4 text-muted-foreground">
            Conheça os serviços disponíveis na ESF São Carlos/Urlândia. Todo o atendimento é gratuito pelo SUS.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <article
              key={s.title}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group animate-fade-in-up rounded-xl border border-border bg-gradient-card p-6 shadow-soft transition-base hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary transition-base group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
