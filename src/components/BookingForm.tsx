import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarCheck2, User, IdCard, Phone, Stethoscope, CalendarDays, Clock4, CheckCircle2 } from "lucide-react";

const specialties = [
  "Clínica Geral",
  "Pediatria",
  "Saúde da Mulher",
  "Odontologia",
  "Sala de Vacinação",
  "Coleta de Laboratório",
  "Curativos e Procedimentos",
];

const times = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

type Appointment = {
  id: string;
  name: string;
  specialty: string;
  date: string;
  time: string;
};

const BookingForm = () => {
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    phone: "",
    specialty: "",
    date: "",
    time: "",
  });
  const [confirmation, setConfirmation] = useState<Appointment | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.cpf || !form.phone || !form.specialty || !form.date || !form.time) {
      toast.error("Preencha todos os campos para confirmar.");
      return;
    }
    const appt: Appointment = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: form.name,
      specialty: form.specialty,
      date: form.date,
      time: form.time,
    };
    setConfirmation(appt);
    toast.success("Agendamento confirmado!", {
      description: `Protocolo ${appt.id} – ${new Date(appt.date + "T00:00").toLocaleDateString("pt-BR")} às ${appt.time}`,
    });
  };

  const reset = () => {
    setConfirmation(null);
    setForm({ name: "", cpf: "", phone: "", specialty: "", date: "", time: "" });
  };

  return (
    <section id="agendar" className="bg-muted/40 py-20">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Agendamento</span>
          <h2 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Marque sua consulta em menos de um minuto
          </h2>
          <p className="text-muted-foreground">
            Preencha seus dados e escolha o melhor horário. Você receberá um número de protocolo para apresentar na recepção.
          </p>

          <ul className="space-y-3">
            {[
              "Atendimento 100% gratuito pelo SUS",
              "Lembretes por SMS 24h antes da consulta",
              "Reagende ou cancele sem complicação",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated md:p-8">
          {confirmation ? (
            <div className="animate-fade-in-up text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold text-foreground">Agendamento confirmado!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Olá, <strong className="text-foreground">{confirmation.name.split(" ")[0]}</strong>. Apresente o protocolo abaixo na recepção.
              </p>

              <div className="mt-6 space-y-3 rounded-xl border-2 border-dashed border-primary/30 bg-primary-soft/40 p-5 text-left">
                <Row label="Protocolo" value={confirmation.id} />
                <Row label="Especialidade" value={confirmation.specialty} />
                <Row label="Data" value={new Date(confirmation.date + "T00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })} />
                <Row label="Horário" value={confirmation.time} />
              </div>

              <Button onClick={reset} variant="outline" className="mt-6 w-full">
                Fazer novo agendamento
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2.5 border-b border-border pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CalendarCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-foreground">Novo agendamento</h3>
                  <p className="text-xs text-muted-foreground">Todos os campos são obrigatórios</p>
                </div>
              </div>

              <Field label="Nome completo" icon={User}>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Maria da Silva" />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="CPF" icon={IdCard}>
                  <Input value={form.cpf} onChange={(e) => update("cpf", e.target.value)} placeholder="000.000.000-00" />
                </Field>
                <Field label="Telefone" icon={Phone}>
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(11) 90000-0000" />
                </Field>
              </div>

              <Field label="Especialidade" icon={Stethoscope}>
                <Select value={form.specialty} onValueChange={(v) => update("specialty", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione o serviço" /></SelectTrigger>
                  <SelectContent>
                    {specialties.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Data" icon={CalendarDays}>
                  <Input type="date" min={today} value={form.date} onChange={(e) => update("date", e.target.value)} />
                </Field>
                <Field label="Horário" icon={Clock4}>
                  <Select value={form.time} onValueChange={(v) => update("time", v)}>
                    <SelectTrigger><SelectValue placeholder="Escolha" /></SelectTrigger>
                    <SelectContent>
                      {times.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Button type="submit" size="lg" className="w-full font-bold shadow-soft">
                Confirmar agendamento
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </Label>
    {children}
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 text-sm">
    <span className="font-semibold text-muted-foreground">{label}</span>
    <span className="text-right font-display font-bold text-foreground">{value}</span>
  </div>
);

export default BookingForm;
