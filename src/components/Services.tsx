import { Stethoscope, Syringe, Baby, HeartPulse, TestTube2, Smile, Bandage, ClipboardList, Home, FileText, Sparkles, ShieldPlus } from "lucide-react";

const services = [
  { icon: Stethoscope, title: "Consultas Médicas", desc: "Clínica geral agendada e demanda espontânea com 2 médicos(as)." },
  { icon: HeartPulse, title: "Consultas de Enfermagem", desc: "Acolhimento, escuta qualificada e orientações com a equipe." },
  { icon: Baby, title: "Puericultura e Pré-natal", desc: "Acompanhamento de gestantes e da saúde da criança." },
  { icon: ShieldPlus, title: "Coleta de Citopatológico", desc: "Preventivo do colo uterino com a equipe de enfermagem." },
  { icon: Syringe, title: "Sala de Vacinação", desc: "Vacinas do SUS e teste do pezinho — terças e quintas." },
  { icon: TestTube2, title: "Coleta Laboratorial (LABVIDA)", desc: "Coletas às terças e quintas-feiras, às 8h." },
  { icon: Smile, title: "Odontologia", desc: "Agendamento presencial às quartas, 8h. Idosos por telefone." },
  { icon: Bandage, title: "Curativos e Procedimentos", desc: "Todos os dias, 8h–11h e 13h–16h (exceto quarta à tarde)." },
  { icon: Sparkles, title: "Testes Rápidos", desc: "HIV, sífilis, hepatites B e C e gravidez, conforme protocolo." },
  { icon: Home, title: "Visitas Domiciliares", desc: "Cuidados paliativos e pacientes acamados, pré-agendadas." },
  { icon: ClipboardList, title: "Grupos de Educação em Saúde", desc: "Amigos da Saúde, Vida Leve, Fisioterapia UFN e Gestantes." },
  { icon: FileText, title: "Renovação de Receitas", desc: "Solicite com antecedência na recepção — atendimento agendado." },
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <article
              key={s.title}
              style={{ animationDelay: `${i * 50}ms` }}
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

        <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-border bg-card p-4 text-center text-sm text-muted-foreground shadow-soft">
          <strong className="text-foreground">Importante:</strong> sempre traga um documento de identificação (RG, CPF e Cartão SUS) para consultas, retirada de medicamentos e atualização de cadastro.
        </p>
      </div>
    </section>
  );
};

export default Services;
