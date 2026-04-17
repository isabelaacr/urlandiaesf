import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User as UserIcon, Sparkles } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  "Quais os horários de funcionamento?",
  "Como agendar consulta médica?",
  "Como agendar dentista?",
  "Quando é a coleta de laboratório?",
  "Quando funciona a sala de vacinas?",
  "Quais grupos posso participar?",
  "Como funciona o acolhimento?",
  "Vocês fazem testes rápidos?",
  "Quem é a equipe?",
  "Qual o telefone e o Instagram?",
];

const FAQ: { keys: string[]; answer: string }[] = [
  {
    keys: ["horário", "horarios", "horário de funcionamento", "funcionamento", "abre", "fecha", "aberto"],
    answer:
      "Atendemos de **segunda a sexta-feira**, das **8h ao meio-dia** e das **13h às 17h**. **Quartas-feiras à tarde a unidade está fechada** para reunião de equipe. Não há atendimento aos fins de semana e feriados. Em emergências, ligue 192 (SAMU).",
  },
  {
    keys: ["agendar médico", "agendar medico", "consulta médica", "consulta medica", "área 19", "area 19", "área 20", "area 20", "marcar consulta"],
    answer:
      "Os agendamentos médicos seguem a divisão por área: **Área 19 — quinzenal** e **Área 20 — mensal**. Você pode agendar pela seção **Agendar consulta** desta página, na recepção ou pelo telefone **(55) 3174-1588 – opção 1**. Tenha em mãos seu Cartão SUS.",
  },
  {
    keys: ["agendar", "marcar", "agendamento"],
    answer:
      "Você pode agendar pela seção **Agendar consulta**, presencialmente na recepção ou pelo telefone **(55) 3174-1588 – opção 1**. Médico Área 19: quinzenal · Área 20: mensal · Odontologia: quartas, 8h.",
  },
  {
    keys: ["dentista", "odontológico", "odontologico", "odonto"],
    answer:
      "O **agendamento odontológico** é feito **às quartas-feiras, às 8h, presencialmente** na unidade. **Idosos** podem agendar **por telefone**: (55) 3174-1588 – opção 1.",
  },
  {
    keys: ["onde", "endereço", "endereco", "localização", "localizacao", "fica", "rua"],
    answer:
      "Estamos na **Rua Agostinho Scolari, 546 – Vila Urlândia**. Atendemos de segunda a sexta no horário regular.",
  },
  {
    keys: ["vacina", "vacinação", "vacinacao", "sala de vacina", "pezinho", "teste do pezinho"],
    answer:
      "A **sala de vacinas** funciona às **terças e quintas-feiras**, das **8h às 11h e 13h às 16h**. Realizamos vacinas do calendário do SUS e o **teste do pezinho**. Traga **documento de identificação** e, para crianças, a **carteirinha de vacinação**.",
  },
  {
    keys: ["coleta", "laboratório", "laboratorio", "labvida", "exame de sangue", "jejum"],
    answer:
      "A **coleta laboratorial (LABVIDA)** acontece **às terças e quintas-feiras, às 8h**. Lembre-se do **jejum** quando indicado pelo médico e leve seu pedido de exame e Cartão SUS.",
  },
  {
    keys: ["curativo", "curativos", "procedimento", "procedimentos"],
    answer:
      "Realizamos **curativos e procedimentos** todos os dias da semana, das **8h às 11h e 13h às 16h** — exceto **quarta-feira à tarde**. Não é necessário agendar.",
  },
  {
    keys: ["teste rápido", "teste rapido", "hiv", "sífilis", "sifilis", "hepatite", "gravidez"],
    answer:
      "Oferecemos **testes rápidos** para **HIV, sífilis, hepatites B e C**, todos os dias das **8h às 11h e 13h às 16h** (exceto quarta à tarde). O **teste rápido de gravidez** requer **mínimo de 7 dias de atraso menstrual** e **4 horas de retenção urinária**.",
  },
  {
    keys: ["acolhimento", "demanda espontânea", "demanda espontanea", "urgência", "urgencia"],
    answer:
      "**Acolhimento Área 19:** segunda a sexta, das **8h às 9h** e das **13h às 14h**. **Acolhimento Área 20:** **terças e quintas**, das **8h às 11h e 13h às 16h**. Em outros turnos, a equipe avalia urgência e risco.",
  },
  {
    keys: ["grupo", "grupos", "amigos da saúde", "vida leve", "fisioterapia", "ufn", "gestante"],
    answer:
      "Temos **4 grupos** abertos à comunidade:\n• **Amigos da Saúde** — segundas, 8h\n• **Vida Leve** — terças, 14h\n• **Fisioterapia UFN** — quartas, 8h\n• **Gestantes** — mensal (confirme a data na recepção)",
  },
  {
    keys: ["reunião", "reuniao", "quarta", "quartas"],
    answer:
      "Toda **quarta-feira à tarde** a unidade fica **fechada** para reunião de equipe. Pela manhã, o atendimento ocorre normalmente.",
  },
  {
    keys: ["equipe", "profissionais", "médicos", "medicos", "enfermeiros", "agentes", "acs"],
    answer:
      "Nossa equipe tem **2 médicos(as), 2 enfermeiros(as), 2 técnicos(as) de enfermagem, 8 agentes comunitários de saúde e 1 dentista**, com média de **40 horas semanais**.",
  },
  {
    keys: ["estrutura", "instalações", "instalacoes", "consultório", "consultorio", "salas"],
    answer:
      "A unidade conta com **recepção, sala de acolhimento, consultórios médico e de enfermagem, sala de procedimentos, sala de vacinação e acesso à internet**. Não temos farmácia completa, apenas dispensário para alguns medicamentos.",
  },
  {
    keys: ["receita", "renovação", "renovacao", "medicamento", "remédio", "remedio"],
    answer:
      "A **renovação de receitas** deve ser **agendada previamente** na recepção ou pelo telefone **(55) 3174-1588 – opção 1**.",
  },
  {
    keys: ["visita", "domiciliar", "acamado", "paliativo", "paliativos"],
    answer:
      "Realizamos **visitas domiciliares** para pacientes **acamados** e em **cuidados paliativos**. As visitas do enfermeiro são **pré-agendadas**. Procure seu agente comunitário de saúde ou a recepção.",
  },
  {
    keys: ["pré-natal", "pre-natal", "pre natal", "prenatal", "puericultura", "criança", "crianca"],
    answer:
      "Oferecemos **pré-natal** para gestantes e **puericultura** para acompanhamento do crescimento das crianças. Agende sua consulta na recepção ou pelo formulário desta página.",
  },
  {
    keys: ["preventivo", "citopatológico", "citopatologico", "papanicolau", "colo do útero", "colo do utero"],
    answer:
      "A **coleta de exame citopatológico (preventivo do colo do útero)** é realizada com a equipe de enfermagem. Agende na recepção ou pelo telefone (55) 3174-1588 – opção 1.",
  },
  {
    keys: ["telefone", "contato", "ligar", "número", "numero"],
    answer: "Nosso telefone é **(55) 3174-1588 – opção 1**. Atendemos no horário de funcionamento da unidade.",
  },
  {
    keys: ["instagram", "rede social", "redes sociais", "facebook", "social"],
    answer: "Siga a gente no Instagram: **@esf_saocarlos** 📲 Lá divulgamos campanhas, horários especiais e dicas de saúde.",
  },
  {
    keys: ["documento", "documentos", "levar", "rg", "cpf", "cartão sus", "cartao sus", "cadastro"],
    answer:
      "Traga sempre **RG, CPF e Cartão SUS** para consultas, retirada de medicamentos e atualização de cadastro. Para crianças, leve a **certidão de nascimento e a carteira de vacinação**.",
  },
  {
    keys: ["cancelar", "remarcar", "desmarcar", "reagendar"],
    answer:
      "Para cancelar ou remarcar, faça um novo agendamento no site ou ligue para **(55) 3174-1588 – opção 1** com até 24 horas de antecedência. Isso libera vagas para outros pacientes.",
  },
];

function findAnswer(input: string): string {
  const t = input.toLowerCase();
  for (const item of FAQ) {
    if (item.keys.some((k) => t.includes(k))) return item.answer;
  }
  if (/(oi|olá|ola|bom dia|boa tarde|boa noite)/.test(t))
    return "Olá! 👋 Sou o assistente virtual da ESF São Carlos/Urlândia. Posso ajudar com horários, agendamento, serviços, vacinação, coleta de laboratório e localização. O que você gostaria de saber?";
  if (/(obrigad|valeu|vlw)/.test(t)) return "Por nada! Sempre que precisar, é só chamar. Cuide-se! 💚";
  return "Não encontrei essa informação aqui. Para detalhes específicos, ligue para **(55) 3174-1588 – opção 1** ou pergunte sobre: horários, agendamento por área, odontologia, vacinação, coleta de laboratório, testes rápidos, grupos, acolhimento, equipe, estrutura ou documentos.";
}

// Renderização simples de **negrito**
function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? <strong key={i} className="text-foreground">{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>
  );
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Olá! 👋 Sou o assistente da ESF São Carlos/Urlândia. Como posso ajudar? Selecione uma pergunta abaixo ou digite a sua." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: findAnswer(text) }]);
    }, 350);
  };

  return (
    <section id="duvidas" className="py-20">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div className="space-y-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tire suas dúvidas</span>
          <h2 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Assistente virtual da ESF
          </h2>
          <p className="text-muted-foreground">
            Pergunte sobre <strong className="text-foreground">horários, serviços, vacinação, coleta de laboratório</strong> e mais.
            Respostas instantâneas, 24 horas por dia.
          </p>
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Perguntas frequentes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-base hover:border-primary hover:bg-primary-soft hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
          <div className="flex items-center gap-3 border-b border-border bg-gradient-hero px-5 py-4 text-primary-foreground">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Bot className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse-soft rounded-full border-2 border-primary bg-success" />
            </div>
            <div>
              <p className="font-display font-extrabold leading-tight">Assistente ESF</p>
              <p className="flex items-center gap-1 text-xs text-primary-foreground/80">
                <Sparkles className="h-3 w-3" /> Online · respostas instantâneas
              </p>
            </div>
          </div>

          <div className="max-h-[460px] min-h-[360px] space-y-4 overflow-y-auto bg-muted/30 px-5 py-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex animate-slide-in-right gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-background text-foreground"
                  }`}
                >
                  {renderText(m.text)}
                </div>
                {m.role === "user" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <UserIcon className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-background p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1"
            />
            <Button type="submit" size="icon" aria-label="Enviar">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
