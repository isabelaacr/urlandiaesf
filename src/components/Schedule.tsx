import { Clock, Sun, Moon, AlertCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";

const schedule = [
  { day: "Segunda-feira", morning: "08:00 – 12:00", afternoon: "13:00 – 17:00" },
  { day: "Terça-feira", morning: "08:00 – 12:00", afternoon: "13:00 – 17:00" },
  { day: "Quarta-feira", morning: "08:00 – 12:00", afternoon: "Fechado · Reunião de equipe" },
  { day: "Quinta-feira", morning: "08:00 – 12:00", afternoon: "13:00 – 17:00" },
  { day: "Sexta-feira", morning: "08:00 – 12:00", afternoon: "13:00 – 17:00" },
  { day: "Sábado, Domingo e Feriados", morning: "Fechado", afternoon: "Fechado" },
];

const highlights = [
  { title: "Agendamento médico — Área 20", time: "Mensal" },
  { title: "Agendamento médico — Área 19", time: "Quinzenal" },
  { title: "Odontologia (agendamento)", time: "Quartas, 8h · presencial" },
  { title: "Coleta laboratorial (LABVIDA)", time: "Terças e quintas, 8h" },
  { title: "Sala de vacinação e teste do pezinho", time: "Terças e quintas · 8h–11h e 13h–16h" },
  { title: "Curativos e testes rápidos", time: "Seg–Sex · 8h–11h e 13h–16h*" },
  { title: "Acolhimento Área 20", time: "Terças e quintas · 8h–11h e 13h–16h" },
  { title: "Acolhimento Área 19", time: "Seg–Sex · 8h–9h e 13h–14h" },
];

const Schedule = () => {
  return (
    <section id="horarios" className="section-y">
      <div className="container">
        <SectionHeader
          eyebrow="Horários"
          title="Quando você pode nos visitar"
          description="Atendemos por agendamento e demanda espontânea. Quartas-feiras à tarde a unidade fica fechada para reunião de equipe."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
              <div className="sus-stripe h-1" aria-hidden />
              <table className="w-full text-sm">
                <thead className="bg-primary/5">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-display font-bold text-primary">Dia</th>
                    <th className="px-4 py-3 font-display font-bold text-primary">
                      <span className="inline-flex items-center gap-1.5"><Sun className="h-4 w-4" /> Manhã</span>
                    </th>
                    <th className="px-4 py-3 font-display font-bold text-primary">
                      <span className="inline-flex items-center gap-1.5"><Moon className="h-4 w-4" /> Tarde</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.day} className="border-t border-border">
                      <td className="px-4 py-3 font-semibold text-foreground">{row.day}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.morning}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.afternoon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              *Curativos e testes rápidos não atendem na quarta-feira à tarde.
            </p>
          </div>

          <div className="rounded-2xl border border-secondary/40 bg-secondary-soft/40 p-6 md:p-7">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-foreground md:text-xl">Horários por serviço</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {highlights.map((h) => (
                <li key={h.title} className="flex items-start justify-between gap-4 border-b border-secondary/30 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-sm font-semibold text-foreground">{h.title}</span>
                  <span className="text-right text-xs text-muted-foreground">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg bg-background/70 p-3 text-xs leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Atenção:</strong> em casos de emergência, procure a UPA mais próxima ou ligue <strong>192 (SAMU)</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
