import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, Users, Syringe, FlaskConical, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";

type EventType = "grupo" | "coleta" | "vacina" | "campanha";

type RecurringEvent = {
  title: string;
  time: string;
  weekday: number; // 0=Dom..6=Sáb
  type: EventType;
};

type MonthlyEvent = {
  title: string;
  time: string;
  dayOfMonth: number;
  type: EventType;
};

const recurring: RecurringEvent[] = [
  { title: "Grupo Amigos da Saúde", time: "08:00", weekday: 1, type: "grupo" },
  { title: "Grupo Vida Leve", time: "14:00", weekday: 2, type: "grupo" },
  { title: "Coleta Laboratorial (LABVIDA)", time: "08:00", weekday: 2, type: "coleta" },
  { title: "Sala de Vacinação", time: "08:00–11h · 13h–16h", weekday: 2, type: "vacina" },
  { title: "Grupo Fisioterapia UFN", time: "08:00", weekday: 3, type: "grupo" },
  { title: "Coleta Laboratorial (LABVIDA)", time: "08:00", weekday: 4, type: "coleta" },
  { title: "Sala de Vacinação", time: "08:00–11h · 13h–16h", weekday: 4, type: "vacina" },
];

const monthly: MonthlyEvent[] = [
  { title: "Grupo de Gestantes", time: "14:00", dayOfMonth: 15, type: "grupo" },
  { title: "Campanha de Vacinação contra Influenza", time: "Dia todo", dayOfMonth: 22, type: "campanha" },
];

const typeMeta: Record<EventType, { label: string; icon: typeof Users; className: string; dot: string }> = {
  grupo: { label: "Grupo Educativo", icon: Users, className: "bg-primary/10 text-primary border-primary/20", dot: "bg-primary" },
  coleta: { label: "Coleta de Exames", icon: FlaskConical, className: "bg-secondary/15 text-secondary-foreground border-secondary/30", dot: "bg-secondary" },
  vacina: { label: "Vacinação", icon: Syringe, className: "bg-success/10 text-success border-success/20", dot: "bg-success" },
  campanha: { label: "Campanha", icon: Heart, className: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive" },
};

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const weekdayShort = ["D", "S", "T", "Q", "Q", "S", "S"];

const isWednesdayAfternoon = (weekday: number, time: string) => {
  if (weekday !== 3) return false;
  const hour = parseInt(time.split(":")[0], 10);
  return !isNaN(hour) && hour >= 13;
};

const getEventsForDate = (date: Date) => {
  const weekday = date.getDay();
  const dayOfMonth = date.getDate();
  const events: { title: string; time: string; type: EventType }[] = [];

  recurring.forEach((e) => {
    if (e.weekday === weekday && !isWednesdayAfternoon(weekday, e.time)) {
      events.push(e);
    }
  });
  monthly.forEach((e) => {
    if (e.dayOfMonth === dayOfMonth) events.push(e);
  });
  return events;
};

const EventsCalendar = () => {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date>(today);

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [cursor]);

  const selectedEvents = getEventsForDate(selected);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  return (
    <section id="calendario" className="section-y bg-muted/40">
      <div className="container">
        <SectionHeader
          eyebrow="Calendário"
          title="Eventos e atividades do mês"
          description="Acompanhe os grupos educativos, coletas de laboratório e campanhas de vacinação."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-7">
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                aria-label="Mês anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-display text-lg font-extrabold text-foreground md:text-xl">
                {monthNames[cursor.getMonth()]} {cursor.getFullYear()}
              </h3>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                aria-label="Próximo mês"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1 text-center">
              {weekdayShort.map((d, i) => (
                <div key={i} className="py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {d}
                </div>
              ))}
              {days.map((day, i) => {
                if (!day) return <div key={i} />;
                const events = getEventsForDate(day);
                const isToday = isSameDay(day, today);
                const isSelected = isSameDay(day, selected);
                const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(day)}
                    className={cn(
                      "relative aspect-square rounded-lg border text-sm font-semibold transition-base",
                      "hover:border-primary hover:bg-primary/5",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground shadow-soft hover:bg-primary"
                        : "border-transparent",
                      !isSelected && isToday && "border-primary/40 bg-primary/5 text-primary",
                      !isSelected && isWeekend && "text-muted-foreground/60",
                      !isSelected && !isToday && !isWeekend && "text-foreground",
                    )}
                  >
                    {day.getDate()}
                    {events.length > 0 && (
                      <span className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                        {Array.from(new Set(events.map((e) => e.type)))
                          .slice(0, 3)
                          .map((t) => (
                            <span
                              key={t}
                              className={cn(
                                "h-1 w-1 rounded-full",
                                isSelected ? "bg-primary-foreground" : typeMeta[t].dot,
                              )}
                            />
                          ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4 text-xs">
              {(Object.keys(typeMeta) as EventType[]).map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <span className={cn("h-2 w-2 rounded-full", typeMeta[t].dot)} />
                  <span className="text-muted-foreground">{typeMeta[t].label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-7">
            <div className="flex items-center gap-2.5 border-b border-border pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {selected.toLocaleDateString("pt-BR", { weekday: "long" })}
                </p>
                <h3 className="font-display text-lg font-extrabold text-foreground">
                  {selected.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}
                </h3>
              </div>
            </div>

            {selectedEvents.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-muted-foreground">Nenhum evento programado para este dia.</p>
                <p className="mt-1 text-xs text-muted-foreground">Selecione outra data no calendário.</p>
              </div>
            ) : (
              <ul className="mt-5 space-y-3">
                {selectedEvents.map((e, i) => {
                  const meta = typeMeta[e.type];
                  const Icon = meta.icon;
                  return (
                    <li
                      key={i}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-4",
                        meta.className,
                      )}
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-display font-bold">{e.title}</p>
                        <p className="text-sm opacity-80">{e.time}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
