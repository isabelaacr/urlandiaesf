import { Stethoscope, Syringe, Baby, HeartPulse, TestTube2, Smile, Bandage, ClipboardList, Home, FileText, Sparkles, ShieldPlus, Footprints } from "lucide-react";

const services = [
  { icon: Stethoscope, title: "Consultas Médicas", desc: "Clínica geral agendada e demanda espontânea com 2 médicos(as)." },
  { icon: HeartPulse, title: "Consultas de Enfermagem", desc: "Acolhimento, escuta qualificada e orientações com a equipe." },
  { icon: Baby, title: "Puericultura e Pré-natal", desc: "Acompanhamento de gestantes e da saúde da criança." },
  { icon: ShieldPlus, title: "Coleta de Citopatológico", desc: "Preventivo do colo uterino com a equipe de enfermagem." },
  { icon: Syringe, title: "Sala de Vacinação", desc: "Vacinas do calendário do SUS — terças e quintas." },
  { icon: Footprints, title: "Teste do Pezinho", desc: "Disponível todos os dias na unidade. Traga a certidão de nascimento e a carteirinha do bebê." },
  { icon: TestTube2, title: "Coleta Laboratorial (LABVIDA)", desc: "Coletas às terças e quintas-feiras, às 8h." },
  { icon: Smile, title: "Odontologia", desc: "Agendamento presencial às quartas, 8h. Idosos por telefone." },
  { icon: Bandage, title: "Curativos e Procedimentos", desc: "Todos os dias, 8h–11h e 13h–16h (exceto quarta à tarde)." },
  { icon: Sparkles, title: "Testes Rápidos", desc: "HIV, sífilis, hepatites B e C, gravidez, COVID-19 e dengue. Teste de gravidez: mínimo 7 dias de atraso menstrual e 2h de retenção urinária (de preferência a 1ª urina da manhã)." },
  { icon: Home, title: "Visitas Domiciliares", desc: "Cuidados paliativos e pacientes acamados, pré-agendadas." },
  { icon: ClipboardList, title: "Grupos de Educação em Saúde", desc: "Amigos da Saúde, Vida Leve, Fisioterapia UFN e Gestantes." },
  { icon: FileText, title: "Renovação de Receitas", desc: "Solicite com antecedência na recepção — atendimento agendado." },
];

import SectionHeader from "./SectionHeader";

const Services = () => {
  return (
    <section id="servicos" className="section-y bg-muted/40">
      <div className="container">
        <SectionHeader
          eyebrow="Nossos serviços"
          title="Atendimento completo, perto de você"
          description="Conheça os serviços disponíveis na ESF São Carlos/Urlândia. Todo o atendimento é gratuito pelo SUS."
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <article
              key={s.title}
              style={{ animationDelay: `${i * 40}ms` }}
              className="group animate-fade-in-up rounded-xl border border-border bg-gradient-card p-5 shadow-soft transition-base hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary transition-base group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-card p-4 text-center text-sm text-muted-foreground shadow-soft">
          <strong className="text-foreground">Importante:</strong> sempre traga um documento de identificação (RG, CPF e Cartão SUS) para consultas, retirada de medicamentos e atualização de cadastro.
        </p>
      </div>
    </section>
  );
};

export default Services;
