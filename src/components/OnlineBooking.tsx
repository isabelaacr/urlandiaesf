import { Globe, Menu, Folder, Building2, MousePointerClick, UserPlus, FileText, ListChecks, LogIn, CalendarCheck, CalendarX2, FileCheck2, AlertTriangle, CalendarRange, Users, Stethoscope, Target, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";

const STEPS = [
  { icon: Globe, text: "Acesse o site oficial da Prefeitura Municipal de Santa Maria: www.santamaria.rs.gov.br" },
  { icon: Menu, text: "Na página inicial, localize o menu principal na parte superior da tela." },
  { icon: Folder, text: "Clique em “Secretarias”." },
  { icon: Building2, text: "Selecione “Secretaria de Município da Saúde”. A posição pode variar: geralmente é a 4ª opção em computadores ou a 7ª em celulares." },
  { icon: MousePointerClick, text: "Localize e clique em “Agendamento Online Saúde”." },
  { icon: UserPlus, text: "Caso ainda não possua cadastro, escolha a opção para criar um cadastro próprio pelo sistema da Prefeitura." },
  { icon: FileText, text: "Clique em “Criar um cadastro novo”." },
  { icon: ListChecks, text: "Preencha os dados solicitados: nome completo, e-mail, CPF e senha." },
  { icon: LogIn, text: "Após concluir o cadastro, retorne à tela de login e entre com seu CPF ou e-mail e a senha cadastrada." },
  { icon: CalendarCheck, text: "Depois de entrar, acesse “Agendamento” → “Agendar Atendimento” e escolha a agenda médica e o horário disponíveis." },
];

const NOTES = [
  {
    icon: CalendarX2,
    title: "Não há agendas disponíveis para agendamento",
    text: "Já estamos em contato com os responsáveis pela gestão do site para esclarecer o motivo dessa mensagem aparecer para alguns pacientes.",
  },
  {
    icon: FileCheck2,
    title: "Verificação do cadastro",
    text: "O ideal é que o paciente venha até a unidade para conferir se o cadastro está totalmente correto e evitar problemas. Porém, existem casos de pacientes com o cadastro perfeitamente regularizado que ainda assim não visualizam as agendas.",
  },
  {
    icon: AlertTriangle,
    title: "Principal motivo",
    text: "A princípio, a principal razão para a agenda não aparecer é o esgotamento das vagas disponíveis do médico naquele mês.",
  },
];

const HOW = [
  {
    icon: CalendarRange,
    title: "Abertura quinzenal",
    text: "O agendamento será aberto a cada 15 dias. Em meses de 30 dias: dia 1º abre a agenda para os primeiros 15 dias e dia 16 para o restante do período.",
  },
  {
    icon: Users,
    title: "Quem pode utilizar?",
    text: "O sistema funciona tanto para pessoas idosas quanto para não idosas. Foi criado para facilitar o acesso ao atendimento e não é restrito a um público específico.",
  },
  {
    icon: Stethoscope,
    title: "Serviços disponíveis",
    text: "Por enquanto, o agendamento online é exclusivo para consultas médicas. Atendimentos com dentista ou outros serviços continuam sendo realizados presencialmente.",
  },
  {
    icon: Target,
    title: "Objetivo",
    text: "Reduzir o número de pessoas que precisam comparecer à unidade durante a madrugada para conseguir uma ficha.",
  },
  {
    icon: Settings,
    title: "Projeto-piloto",
    text: "Como o sistema ainda está em fase de teste, poucas vagas foram disponibilizadas inicialmente, para evitar problemas e permitir uma implantação gradual. A tendência é aumentar o número de vagas a cada mês, conforme o sistema for aprimorado.",
  },
];

const OnlineBooking = () => {
  return (
    <section id="agendamento-online" className="section-y">
      <div className="container">
        <SectionHeader
          eyebrow="Agendamento online"
          title="Agendamento online de consultas médicas"
          description="Mais praticidade para você cuidar da sua saúde. Veja o passo a passo para marcar sua consulta médica pelo site da Prefeitura de Santa Maria."
          align="center"
        />

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="font-bold shadow-soft">
            <a href="https://www.santamaria.rs.gov.br/saude" target="_blank" rel="noopener noreferrer">
              Abrir o agendamento online da Prefeitura
            </a>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-1">
            <h3 className="font-display text-lg font-extrabold text-primary">Passo a passo</h3>
            <ol className="mt-5 space-y-4">
              {STEPS.map((s, i) => (
                <li key={i} className="flex gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="flex items-start gap-2.5">
                    <s.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-secondary/40 bg-secondary-soft/40 p-6">
            <h3 className="font-display text-lg font-extrabold text-foreground">Informações importantes</h3>
            <div className="mt-5 space-y-4">
              {NOTES.map((n) => (
                <div key={n.title} className="rounded-xl bg-background/70 p-4">
                  <div className="flex items-center gap-2.5">
                    <n.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <p className="font-display text-sm font-bold text-foreground">{n.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-extrabold text-primary">Como funcionará o agendamento</h3>
            <div className="mt-5 space-y-4">
              {HOW.map((h) => (
                <div key={h.title} className="border-b border-border/60 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <h.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">{h.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-primary-soft p-4 text-center text-sm text-foreground shadow-soft">
          Em caso de dúvidas ou dificuldades, procure a <strong>ESF São Carlos – Urlândia</strong> para orientações, ou ligue para <strong>(55) 3174-1588 – opção 1</strong> · <strong>(55) 99148-5641</strong>.
        </p>
      </div>
    </section>
  );
};

export default OnlineBooking;
