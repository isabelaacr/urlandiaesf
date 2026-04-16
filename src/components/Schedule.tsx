import { Clock, Sun, Moon } from "lucide-react";

const schedule = [
  { day: "Segunda a Sexta", morning: "07:00 – 12:00", afternoon: "13:00 – 19:00" },
  { day: "Sábado", morning: "08:00 – 12:00", afternoon: "Fechado" },
  { day: "Domingo e Feriados", morning: "Fechado", afternoon: "Fechado" },
];

const highlights = [
  { title: "Vacinação", time: "Seg–Sex · 08h às 16h" },
  { title: "Coleta de Exames", time: "Seg–Sex · 07h às 09h30 (jejum)" },
  { title: "Farmácia", time: "Seg–Sex · 07h às 18h30" },
  { title: "Acolhimento de urgência", time: "Todo o horário de funcionamento" },
];

const Schedule = () => {
  return (
    <section id="horarios" className="py-20">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Horários</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Quando você pode nos visitar
          </h2>
          <p className="mt-4 text-muted-foreground">
            Atendemos por ordem de chegada e por agendamento. Procedimentos específicos têm horários reservados.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
            <div className="sus-stripe h-1" aria-hidden />
            <table className="w-full text-sm">
              <thead className="bg-primary/5">
                <tr className="text-left">
                  <th className="px-5 py-3 font-display font-bold text-primary">Dia</th>
                  <th className="px-5 py-3 font-display font-bold text-primary">
                    <span className="inline-flex items-center gap-1.5"><Sun className="h-4 w-4" /> Manhã</span>
                  </th>
                  <th className="px-5 py-3 font-display font-bold text-primary">
                    <span className="inline-flex items-center gap-1.5"><Moon className="h-4 w-4" /> Tarde</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.day} className="border-t border-border">
                    <td className="px-5 py-3.5 font-semibold text-foreground">{row.day}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.morning}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.afternoon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-secondary/40 bg-secondary-soft/40 p-7">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-extrabold text-foreground">Horários por serviço</h3>
          </div>
          <ul className="mt-6 space-y-4">
            {highlights.map((h) => (
              <li key={h.title} className="flex items-start justify-between gap-4 border-b border-secondary/30 pb-3 last:border-0 last:pb-0">
                <span className="font-semibold text-foreground">{h.title}</span>
                <span className="text-right text-sm text-muted-foreground">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-lg bg-background/70 p-3 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Atenção:</strong> em casos de emergência, procure a UPA mais próxima ou ligue 192 (SAMU).
          </p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
