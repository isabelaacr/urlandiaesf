import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User as UserIcon, Sparkles } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  "Horários de funcionamento",
  "Como marcar consulta médica",
  "Como marcar dentista",
  "Coleta de laboratório",
  "Sala de vacinas",
  "Acolhimento Área 19 e 20",
  "Grupos da comunidade",
  "Testes rápidos",
  "Pré-natal e puericultura",
  "Visitas domiciliares",
  "Renovação de receitas",
  "Documentos necessários",
  "Localização e como chegar",
  "Área de abrangência",
  "Fichas: quantas e que horas chegar",
  "Mostrar resultado de exames",
  "Sair da UBS / mudar de posto",
  "Marcar para mim e para meu filho",
  "Telefone e Instagram",
  "Emergências",
];

const FAQ: { keys: string[]; answer: string }[] = [
  {
    keys: ["horário", "horarios", "funcionamento", "abre", "fecha", "aberto", "que horas", "expediente"],
    answer:
      "Atendemos de **segunda a sexta-feira**, das **8h ao meio-dia** e das **13h às 17h**.\n• **Quartas à tarde a unidade fica fechada** para reunião de equipe.\n• **Sábados, domingos e feriados:** fechado.\nEm emergências, ligue **192 (SAMU)**.",
  },
  {
    keys: ["agendar médico", "agendar medico", "consulta médica", "consulta medica", "marcar consulta", "marcar médico", "marcar medico"],
    answer:
      "Os agendamentos médicos seguem a **divisão por área**:\n• **Área 19 — quinzenal**\n• **Área 20 — mensal**\nO agendamento é feito **presencialmente na recepção** ou pelo telefone **(55) 3174-1588 – opção 1**. Tenha em mãos seu **Cartão SUS**.",
  },
  {
    keys: ["área 19", "area 19", "minha área", "minha area", "qual área", "qual area"],
    answer:
      "**Área 19:** acolhimento de **segunda a sexta, 8h–9h e 13h–14h**. Agendamento médico **quinzenal**. Não sabe sua área? Pergunte ao seu **Agente Comunitário de Saúde (ACS)** ou na recepção.",
  },
  {
    keys: ["área 20", "area 20"],
    answer:
      "**Área 20:** acolhimento **terças e quintas, 8h–11h e 13h–16h**. Agendamento médico **mensal**. Em outros turnos, a equipe avalia urgência e risco.",
  },
  {
    keys: ["agendar", "marcar", "agendamento", "como agendar"],
    answer:
      "O agendamento é feito de **2 formas**:\n1. **Presencial** — recepção da unidade, seg–sex 8h–12h e 13h–17h\n2. **Telefone** — **(55) 3174-1588 – opção 1**\nEste site é **informativo** e não realiza agendamentos online.\nEspecialidades: médico (Área 19 quinzenal · Área 20 mensal), enfermagem, odontologia (quartas 8h), pré-natal, puericultura e preventivo.",
  },
  {
    keys: ["dentista", "odontológico", "odontologico", "odonto", "dente", "boca"],
    answer:
      "**Odontologia** — agendamento **às quartas-feiras, 8h, presencialmente** na unidade.\n👵 **Idosos** podem agendar **por telefone**: (55) 3174-1588 – opção 1.\nAtendimento para toda a família com nosso(a) cirurgião(ã)-dentista.",
  },
  {
    keys: ["onde", "endereço", "endereco", "localização", "localizacao", "fica", "rua", "como chegar", "chegar", "mapa"],
    answer:
      "📍 **Rua Agostinho Scolari, 546 – Vila Urlândia, Santa Maria/RS**.\nNa página há a seção **Localização** com mapa e botão para traçar rota direto pelo Google Maps.",
  },
  {
    keys: ["vacina", "vacinação", "vacinacao", "sala de vacina", "imunização", "imunizacao"],
    answer:
      "💉 **Sala de vacinas:** **terças e quintas-feiras**, das **8h às 11h** e **13h às 16h**.\nAplicamos as vacinas do **calendário do SUS**.\nLeve **documento de identificação** e, para crianças, a **carteirinha de vacinação**.",
  },
  {
    keys: ["pezinho", "teste do pezinho"],
    answer:
      "🍼 O **teste do pezinho** é ofertado **todos os dias** na unidade. Leve a **certidão de nascimento** e a **carteirinha do bebê**.",
  },
  {
    keys: ["coleta", "laboratório", "laboratorio", "labvida", "exame de sangue", "jejum", "exame"],
    answer:
      "🧪 **Coleta laboratorial (LABVIDA):** **terças e quintas-feiras, às 8h**.\n• Faça **jejum** quando indicado pelo médico\n• Leve **pedido de exame** e **Cartão SUS**",
  },
  {
    keys: ["curativo", "curativos"],
    answer:
      "🩹 **Curativos:** todos os dias da semana, das **8h às 11h e 13h às 16h** — **exceto quarta-feira à tarde**. Não precisa agendar.",
  },
  {
    keys: ["procedimento", "procedimentos", "sala de procedimento"],
    answer:
      "Realizamos **procedimentos** (curativos, retirada de pontos, nebulização, medicação) **seg–sex, 8h–11h e 13h–16h** (exceto quarta à tarde).",
  },
  {
    keys: ["teste rápido", "teste rapido", "hiv", "sífilis", "sifilis", "hepatite", "ist", "covid", "dengue"],
    answer:
      "🧬 **Testes rápidos disponíveis na unidade:**\n• **ISTs:** HIV, sífilis, hepatites B e C\n• **Gravidez**\n• **COVID-19**\n• **Dengue**\nRealizados **seg–sex, 8h–11h e 13h–16h** (exceto quarta à tarde). Resultado na hora, **gratuito e sigiloso**.",
  },
  {
    keys: ["gravidez", "teste de gravidez", "grávida", "gravida"],
    answer:
      "🤰 **Teste rápido de gravidez:**\n• Mínimo de **7 dias de atraso menstrual**\n• **2 horas de retenção urinária** (de preferência a **primeira urina da manhã**)\nDisponível **seg–sex, 8h–11h e 13h–16h** (exceto quarta à tarde).",
  },
  {
    keys: ["acolhimento", "demanda espontânea", "demanda espontanea", "urgência", "urgencia", "passar mal"],
    answer:
      "**Acolhimento:** escuta qualificada para quem chega sem agendamento.\n• **Área 19:** seg–sex, **8h–9h** e **13h–14h**\n• **Área 20:** terças e quintas, **8h–11h** e **13h–16h**\nNos demais turnos, a equipe avalia **urgência e risco**. Em emergência, ligue **192 (SAMU)**.",
  },
  {
    keys: ["grupo", "grupos", "amigos da saúde", "vida leve", "fisioterapia", "ufn", "atividade"],
    answer:
      "👥 Temos **4 grupos** abertos à comunidade — gratuitos:\n• **Amigos da Saúde** — segundas, **8h** (idosos)\n• **Vida Leve** — terças, **14h** (hábitos saudáveis)\n• **Fisioterapia UFN** — quartas, **8h** (parceria com a UFN)\n• **Gestantes** — **mensal** (confirme a data na recepção)",
  },
  {
    keys: ["gestante", "gestantes", "pré-natal", "pre-natal", "pre natal", "prenatal"],
    answer:
      "🤰 **Pré-natal completo** com a equipe médica e de enfermagem. Agende sua primeira consulta na **recepção** ou pelo formulário do site.\nTambém oferecemos o **Grupo de Gestantes** (mensal), com orientações sobre gestação, parto e amamentação.",
  },
  {
    keys: ["puericultura", "criança", "crianca", "bebê", "bebe", "filho"],
    answer:
      "👶 **Puericultura:** acompanhamento do **crescimento e desenvolvimento** da criança, vacinação e orientações. Agende na recepção. Leve a **carteirinha da criança**.",
  },
  {
    keys: ["preventivo", "citopatológico", "citopatologico", "papanicolau", "colo do útero", "colo do utero"],
    answer:
      "🌸 **Coleta de citopatológico (preventivo do colo do útero)** com a equipe de enfermagem. Agende na recepção ou pelo telefone **(55) 3174-1588 – opção 1**.",
  },
  {
    keys: ["reunião", "reuniao", "quarta", "quartas"],
    answer:
      "Toda **quarta-feira à tarde** a unidade fica **fechada** para reunião de equipe. **Pela manhã** o atendimento ocorre normalmente.",
  },
  {
    keys: ["equipe", "profissionais", "médicos", "medicos", "enfermeiros", "agentes", "acs", "quem trabalha"],
    answer:
      "👩‍⚕️ Nossa equipe:\n• **2 médicos(as)**\n• **2 enfermeiros(as)**\n• **2 técnicos(as) de enfermagem**\n• **8 agentes comunitários de saúde (ACS)**\n• **1 cirurgião(ã)-dentista**\n• Equipe de apoio (recepção, higienização, gestão)\nCarga horária média de **40h semanais**.",
  },
  {
    keys: ["estrutura", "instalações", "instalacoes", "consultório", "consultorio", "salas"],
    answer:
      "🏥 A unidade tem: **recepção, sala de acolhimento, consultórios médico e de enfermagem, sala de procedimentos, sala de vacinação e acesso à internet**. Não temos farmácia completa, apenas **dispensário** com alguns medicamentos.",
  },
  {
    keys: ["farmácia", "farmacia", "remédio de graça", "medicamento de graça"],
    answer:
      "💊 A unidade **não tem farmácia completa** — apenas um **dispensário** com alguns medicamentos. Para receber medicações pelo SUS, procure a **Farmácia Municipal** com sua receita.",
  },
  {
    keys: ["receita", "renovação", "renovacao", "medicamento", "remédio", "remedio", "uso contínuo", "uso continuo"],
    answer:
      "📝 **Renovação de receitas** deve ser **agendada previamente** na recepção ou pelo telefone **(55) 3174-1588 – opção 1**. Leve a **última receita** e o **Cartão SUS**.",
  },
  {
    keys: ["visita", "domiciliar", "acamado", "paliativo", "paliativos", "casa"],
    answer:
      "🏠 Realizamos **visitas domiciliares** para **acamados** e em **cuidados paliativos**. As visitas do enfermeiro são **pré-agendadas**. Procure seu **agente comunitário de saúde (ACS)** ou a recepção.",
  },
  {
    keys: ["telefone", "contato", "ligar", "número", "numero"],
    answer: "📞 **(55) 3174-1588 – opção 1**\nAtendimento no horário da unidade (seg–sex, 8h–12h e 13h–17h).",
  },
  {
    keys: ["instagram", "rede social", "redes sociais", "facebook", "social"],
    answer: "📲 Siga a ESF São Carlos/Urlândia:\n• **Instagram:** @esf_saocarlos\n• **Facebook:** facebook.com/profile.php?id=61579852984607\nDivulgamos campanhas, horários especiais, mutirões e dicas de saúde.",
  },
  {
    keys: ["documento", "documentos", "levar", "rg", "cpf", "cartão sus", "cartao sus", "cadastro"],
    answer:
      "📄 Traga sempre:\n• **RG e CPF**\n• **Cartão SUS**\n• Para crianças: **certidão de nascimento** + **carteirinha de vacinação**\n• Para renovação de receita: **última receita**\n• Para exames: **pedido médico**",
  },
  {
    keys: ["cancelar", "remarcar", "desmarcar", "reagendar", "não vou poder", "nao vou poder"],
    answer:
      "Para **cancelar ou remarcar**, avise a recepção pessoalmente ou ligue para **(55) 3174-1588 – opção 1** com **até 24 horas de antecedência**. Isso libera vagas para outros pacientes.",
  },
  {
    keys: ["emergência", "emergencia", "samu", "192", "bombeiros", "193"],
    answer:
      "🚨 **Em emergência, NÃO espere atendimento na ESF.**\n• **SAMU: 192**\n• **Bombeiros: 193**\n• **Disque Saúde: 136**\nProcure também a **UPA mais próxima**.",
  },
  {
    keys: ["calendário", "calendario", "agenda do mês", "agenda do mes", "eventos"],
    answer:
      "📅 Veja o **Calendário** nesta página: lá estão todos os **grupos recorrentes**, **coletas de laboratório**, **dias de vacinação** e **campanhas** do mês.",
  },
  {
    keys: ["abrangência", "abrangencia", "área de cobertura", "area de cobertura", "território", "territorio", "bairro", "atende minha rua", "regiões", "regioes", "mapa das áreas", "mapa das areas"],
    answer:
      "🗺️ A ESF São Carlos/Urlândia atende o território da **Vila Urlândia e adjacências**, dividido em **Área 19** e **Área 20**.\nNa página **Localização** há o **mapa das regiões atendidas** com todas as ruas. Se a sua rua estiver no mapa, você é da nossa área.\nNa dúvida, fale com o **ACS da sua rua** ou vá à recepção com **comprovante de residência**.",
  },
  {
    keys: ["idoso", "idosa", "terceira idade", "hiperdia", "hipertensão", "hipertensao", "diabetes"],
    answer:
      "👵 **Atendimento ao idoso:** consultas médicas e de enfermagem, **Grupo Amigos da Saúde** (segundas, 8h) e agendamento **odontológico por telefone**. Para hipertensão e diabetes, há acompanhamento contínuo com a equipe.",
  },
  {
    keys: ["saúde mental", "saude mental", "psicólogo", "psicologo", "depressão", "depressao", "ansiedade"],
    answer:
      "💚 A ESF acolhe demandas de **saúde mental** com escuta qualificada. Procure o **acolhimento** da sua área. Para casos que necessitem psicólogo/psiquiatra, fazemos o **encaminhamento à rede municipal (CAPS)**.",
  },
  {
    keys: ["reclamação", "reclamacao", "ouvidoria", "elogio", "sugestão", "sugestao"],
    answer:
      "📢 Reclamações, elogios e sugestões podem ser feitos na **recepção** ou pela **Ouvidoria da Saúde de Santa Maria**. Sua opinião nos ajuda a melhorar.",
  },
  {
    keys: ["cartão sus", "cartao sus", "fazer cartão", "fazer cartao", "tirar sus"],
    answer:
      "🪪 Para **fazer ou atualizar o Cartão SUS**, vá à **recepção da unidade** com **RG, CPF e comprovante de residência**.",
  },
  {
    keys: ["mudança", "mudanca", "novo morador", "me mudei", "cadastrar"],
    answer:
      "🏘️ Novo morador da Vila Urlândia? Procure a recepção com **RG, CPF, Cartão SUS e comprovante de residência** para se **cadastrar** no território. O **agente comunitário (ACS)** da sua rua passará para confirmar o cadastro.",
  },
];

function findAnswer(input: string): string {
  const t = input.toLowerCase();
  // Score-based matching: prefer entries with the most/longest key matches
  let best: { score: number; answer: string } | null = null;
  for (const item of FAQ) {
    let score = 0;
    for (const k of item.keys) {
      if (t.includes(k)) score += k.length;
    }
    if (score > 0 && (!best || score > best.score)) best = { score, answer: item.answer };
  }
  if (best) return best.answer;

  if (/(oi|olá|ola|bom dia|boa tarde|boa noite|e aí|e ai)/.test(t))
    return "Olá! 👋 Sou o assistente da **ESF São Carlos/Urlândia**. Posso ajudar com **horários, agendamento, vacinação, coleta, grupos, acolhimento, documentos** e mais. O que você gostaria de saber?";
  if (/(obrigad|valeu|vlw|grato|grata)/.test(t))
    return "Por nada! 💚 Sempre que precisar, é só chamar.";
  if (/(tchau|até|ate logo|adeus)/.test(t))
    return "Até logo! Cuide-se. 💚";

  return "Não encontrei essa informação. Tente perguntar sobre: **horários, agendamento (Área 19 ou 20), odontologia, vacinação, coleta de laboratório, testes rápidos, pré-natal, grupos, acolhimento, equipe, estrutura, documentos, receitas, localização**. Ou ligue **(55) 3174-1588 – opção 1**.";
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
    <section id="duvidas" className="section-y bg-muted/40">
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
                  className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
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
