import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User as UserIcon, Sparkles } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  "Quais os horários de funcionamento?",
  "Como agendar uma consulta?",
  "Onde fica a UBS?",
  "Tem vacinação contra gripe?",
  "Quais serviços vocês oferecem?",
  "Preciso levar documentos?",
];

const FAQ: { keys: string[]; answer: string }[] = [
  {
    keys: ["horário", "horarios", "funcionamento", "abre", "fecha", "aberto"],
    answer:
      "Funcionamos de **segunda a sexta**, das **07h às 19h**, e aos **sábados das 08h às 12h**. Domingos e feriados estamos fechados. Em emergências, ligue 192 (SAMU).",
  },
  {
    keys: ["agendar", "marcar", "consulta", "agendamento"],
    answer:
      "Você pode agendar pela seção **Agendar consulta** desta página, ou pessoalmente na recepção. Basta informar nome, CPF, telefone, especialidade e horário desejado.",
  },
  {
    keys: ["onde", "endereço", "endereco", "localização", "localizacao", "fica"],
    answer:
      "Estamos na **Rua das Flores, 250 – Vila Saúde**. Há ponto de ônibus na esquina e estacionamento gratuito para idosos e gestantes.",
  },
  {
    keys: ["vacina", "vacinação", "vacinacao", "gripe", "covid", "hpv"],
    answer:
      "Sim! Aplicamos todas as vacinas do **calendário do SUS**, incluindo gripe, HPV, febre amarela e reforços de COVID-19. A sala de vacinas atende de **segunda a sexta, das 08h às 16h**. Leve a carteirinha de vacinação.",
  },
  {
    keys: ["serviço", "servicos", "servico", "especialidade", "atendimento", "oferecem"],
    answer:
      "Oferecemos **clínica geral, pediatria, saúde da mulher, odontologia, saúde mental, vacinação, coleta de exames** e **farmácia básica**. Todos os atendimentos são gratuitos pelo SUS.",
  },
  {
    keys: ["documento", "documentos", "levar", "rg", "cpf", "cartão", "cartao"],
    answer:
      "Traga **RG, CPF e Cartão SUS**. Para crianças, leve a **certidão de nascimento e a carteira de vacinação**. Comprovante de residência é recomendado no primeiro atendimento.",
  },
  {
    keys: ["exame", "exames", "coleta", "sangue", "jejum"],
    answer:
      "A coleta de exames acontece de **segunda a sexta, das 07h às 09h30**, sempre em **jejum de 8 a 12h** (água é permitida). Resultados ficam prontos em até 5 dias úteis.",
  },
  {
    keys: ["remédio", "remedio", "medicamento", "farmácia", "farmacia"],
    answer:
      "A farmácia básica funciona de **segunda a sexta, das 07h às 18h30**. Leve a receita médica (validade de 6 meses) e o Cartão SUS para retirar os medicamentos gratuitamente.",
  },
  {
    keys: ["telefone", "contato", "ligar"],
    answer: "Você pode falar com a recepção pelo telefone **(11) 3000-1234**, no horário de funcionamento da unidade.",
  },
  {
    keys: ["cancelar", "remarcar", "desmarcar", "reagendar"],
    answer:
      "Para cancelar ou remarcar, acesse novamente a seção de agendamento ou ligue para **(11) 3000-1234** com até 24 horas de antecedência. Isso libera vagas para outros pacientes.",
  },
];

function findAnswer(input: string): string {
  const t = input.toLowerCase();
  for (const item of FAQ) {
    if (item.keys.some((k) => t.includes(k))) return item.answer;
  }
  if (/(oi|olá|ola|bom dia|boa tarde|boa noite)/.test(t))
    return "Olá! 👋 Sou o assistente virtual da UBS Vila Saúde. Posso ajudar com horários, agendamento, serviços e localização. O que você gostaria de saber?";
  if (/(obrigad|valeu|vlw)/.test(t)) return "Por nada! Sempre que precisar, é só chamar. Cuide-se! 💚";
  return "Não encontrei essa informação aqui. Para detalhes específicos, ligue para **(11) 3000-1234** ou pergunte sobre: horários, agendamento, serviços, vacinação, exames, documentos ou localização.";
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
    { role: "bot", text: "Olá! 👋 Sou o assistente da UBS. Como posso ajudar? Selecione uma pergunta abaixo ou digite a sua." },
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
            Assistente virtual da UBS
          </h2>
          <p className="text-muted-foreground">
            Pergunte sobre <strong className="text-foreground">horários, serviços, vacinação, exames</strong> e mais.
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
              <p className="font-display font-extrabold leading-tight">Assistente UBS</p>
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
