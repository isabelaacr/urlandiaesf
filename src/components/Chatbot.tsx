import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User as UserIcon, Sparkles } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  "Quais os horários de funcionamento?",
  "Como agendar uma consulta?",
  "Onde fica a ESF?",
  "Tem sala de vacinação?",
  "Quando é a coleta de laboratório?",
  "Tem atendimento odontológico?",
  "Qual o telefone?",
  "Vocês têm Instagram?",
];

const FAQ: { keys: string[]; answer: string }[] = [
  {
    keys: ["horário", "horarios", "horário de funcionamento", "funcionamento", "abre", "fecha", "aberto", "atendimento"],
    answer:
      "Atendemos de **segunda a sexta-feira**, das **8h ao meio-dia** e das **13h às 17h**. Não há atendimento aos sábados, domingos e feriados. Em emergências, ligue 192 (SAMU).",
  },
  {
    keys: ["agendar", "marcar", "consulta", "agendamento"],
    answer:
      "Você pode agendar pela seção **Agendar consulta** desta página, presencialmente na recepção ou pelo telefone **(55) 3174-1588 – opção 1**. Tenha em mãos seu Cartão SUS.",
  },
  {
    keys: ["onde", "endereço", "endereco", "localização", "localizacao", "fica", "rua"],
    answer:
      "Estamos na **Rua Agostinho Scolari, 546 – Vila Urlândia**. Você é bem-vindo(a) no horário de atendimento da unidade.",
  },
  {
    keys: ["vacina", "vacinação", "vacinacao", "sala de vacina"],
    answer:
      "Sim! Temos **sala de vacinação** na unidade, com aplicação das vacinas do **calendário do SUS**. Atendemos de segunda a sexta, no horário normal de funcionamento. Leve a carteirinha de vacinação.",
  },
  {
    keys: ["odontológico", "odontologico", "dentista", "odonto"],
    answer:
      "Sim, temos **atendimento odontológico** para toda a família, de segunda a sexta. Recomendamos agendar previamente pela recepção ou por telefone.",
  },
  {
    keys: ["coleta", "laboratório", "laboratorio", "exame", "exames", "sangue", "jejum"],
    answer:
      "A **coleta do laboratório** acontece **às terças e sextas-feiras pela manhã**. Lembre-se do **jejum** quando indicado pelo médico e leve seu pedido de exame e Cartão SUS.",
  },
  {
    keys: ["reunião", "reuniao", "quarta", "quartas"],
    answer:
      "Toda **quarta-feira à tarde** a equipe se reúne para planejamento e capacitação. Nesse período **não há atendimento à tarde**, apenas pela manhã. Programe-se!",
  },
  {
    keys: ["serviço", "servicos", "servico", "especialidade", "oferecem", "oferece"],
    answer:
      "Oferecemos **clínica geral, pediatria, saúde da mulher, odontologia, sala de vacinação, coleta laboratorial, curativos e procedimentos** com a equipe de Saúde da Família. Tudo gratuito pelo SUS.",
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
    keys: ["documento", "documentos", "levar", "rg", "cpf", "cartão", "cartao", "sus"],
    answer:
      "Traga **RG, CPF e Cartão SUS**. Para crianças, leve a **certidão de nascimento e a carteira de vacinação**. Comprovante de residência é recomendado no primeiro atendimento.",
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
  return "Não encontrei essa informação aqui. Para detalhes específicos, ligue para **(55) 3174-1588 – opção 1** ou pergunte sobre: horários, agendamento, serviços, vacinação, coleta de laboratório, odontologia, documentos ou localização.";
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
