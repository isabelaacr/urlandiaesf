import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarCheck2, User, IdCard, Phone, Stethoscope, CalendarDays, Clock4, CheckCircle2, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { jsPDF } from "jspdf";

const specialties = [
  "Consulta Médica — Área 19",
  "Consulta Médica — Área 20",
  "Consulta de Enfermagem",
  "Odontologia (quartas, 8h)",
  "Sala de Vacinação (ter/qui)",
  "Coleta Laboratorial (ter/qui · 8h)",
  "Curativos e Procedimentos",
  "Testes Rápidos (HIV, sífilis, hepatites, gravidez)",
  "Pré-natal / Puericultura",
  "Renovação de Receitas",
  "Visita Domiciliar (acamados)",
];

const times = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

type Appointment = {
  protocol: string;
  name: string;
  specialty: string;
  date: string;
  time: string;
};

const generateProtocol = () => Math.random().toString(36).slice(2, 8).toUpperCase();

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
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.cpf || !form.phone || !form.specialty || !form.date || !form.time) {
      toast.error("Preencha todos os campos para confirmar.");
      return;
    }
    const selected = new Date(form.date + "T00:00");
    const weekday = selected.getDay();
    const hour = parseInt(form.time.split(":")[0], 10);
    if (weekday === 0 || weekday === 6) {
      toast.error("Não há atendimento aos sábados, domingos e feriados.");
      return;
    }
    if (weekday === 3 && hour >= 13) {
      toast.error("Quartas-feiras à tarde a unidade está fechada para reunião de equipe.");
      return;
    }

    setSubmitting(true);
    const protocol = generateProtocol();

    const { error } = await supabase.from("appointments").insert({
      protocol,
      patient_name: form.name,
      cpf: form.cpf,
      phone: form.phone,
      specialty: form.specialty,
      appointment_date: form.date,
      appointment_time: form.time,
    });

    setSubmitting(false);

    if (error) {
      console.error(error);
      toast.error("Não foi possível salvar o agendamento. Tente novamente.");
      return;
    }

    const appt: Appointment = {
      protocol,
      name: form.name,
      specialty: form.specialty,
      date: form.date,
      time: form.time,
    };
    setConfirmation(appt);
    toast.success("Agendamento confirmado!", {
      description: `Protocolo ${appt.protocol} – ${new Date(appt.date + "T00:00").toLocaleDateString("pt-BR")} às ${appt.time}`,
    });
  };

  const downloadPdf = () => {
    if (!confirmation) return;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const w = doc.internal.pageSize.getWidth();

    // faixa SUS verde
    doc.setFillColor(0, 122, 51);
    doc.rect(0, 0, w, 18, "F");
    doc.setFillColor(255, 207, 0);
    doc.rect(0, 18, w, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("ESF SAO CARLOS / URLANDIA", 14, 12);

    // Título
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(20);
    doc.text("Comprovante de Agendamento", 14, 38);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(90, 90, 90);
    doc.text("Apresente este comprovante na recepcao da unidade.", 14, 46);

    // Caixa do protocolo
    doc.setDrawColor(0, 122, 51);
    doc.setLineWidth(0.6);
    doc.roundedRect(14, 56, w - 28, 24, 3, 3);
    doc.setTextColor(0, 122, 51);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("PROTOCOLO", 20, 65);
    doc.setFontSize(22);
    doc.setTextColor(20, 20, 20);
    doc.text(confirmation.protocol, 20, 75);

    // Dados
    const dateStr = new Date(confirmation.date + "T00:00").toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const rows: [string, string][] = [
      ["Paciente", confirmation.name],
      ["Especialidade", confirmation.specialty],
      ["Data", dateStr],
      ["Horario", confirmation.time],
    ];

    let y = 95;
    rows.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(label.toUpperCase(), 14, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(13);
      doc.setTextColor(20, 20, 20);
      const wrapped = doc.splitTextToSize(value, w - 28);
      doc.text(wrapped, 14, y + 6);
      y += 16 + (wrapped.length - 1) * 6;
    });

    // Rodapé
    y += 6;
    doc.setDrawColor(220, 220, 220);
    doc.line(14, y, w - 14, y);
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text("Antes da consulta", 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    [
      "- Traga RG, CPF e Cartao SUS.",
      "- Chegue com 15 minutos de antecedencia.",
      "- Em caso de imprevisto, ligue (55) 3174-1588 - opcao 1.",
      "- Quartas a tarde a unidade fica fechada para reuniao de equipe.",
    ].forEach((line) => {
      doc.text(line, 14, y);
      y += 5;
    });

    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Rua Agostinho Scolari, 546 - Vila Urlandia, Santa Maria/RS", 14, y);
    doc.text(`Emitido em ${new Date().toLocaleString("pt-BR")}`, 14, y + 5);

    doc.save(`agendamento-${confirmation.protocol}.pdf`);
    toast.success("Comprovante baixado!");
  };

  const reset = () => {
    setConfirmation(null);
    setForm({ name: "", cpf: "", phone: "", specialty: "", date: "", time: "" });
  };

  return (
    <section id="agendar" className="section-y bg-muted/40">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Agendamento</span>
          <h2 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Marque sua consulta em menos de um minuto
          </h2>
          <p className="text-muted-foreground">
            Preencha seus dados e escolha o melhor horário. Você receberá um número de protocolo e poderá baixar um comprovante em PDF.
          </p>

          <ul className="space-y-3">
            {[
              "Atendimento 100% gratuito pelo SUS",
              "Traga RG, CPF e Cartão SUS no dia da consulta",
              "Quartas à tarde fechado · sem atendimento sáb/dom",
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
                <Row label="Protocolo" value={confirmation.protocol} />
                <Row label="Especialidade" value={confirmation.specialty} />
                <Row label="Data" value={new Date(confirmation.date + "T00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })} />
                <Row label="Horário" value={confirmation.time} />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button onClick={downloadPdf} size="lg" className="font-bold shadow-soft">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar comprovante
                </Button>
                <Button onClick={reset} variant="outline" size="lg">
                  Novo agendamento
                </Button>
              </div>
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

              <Button type="submit" size="lg" disabled={submitting} className="w-full font-bold shadow-soft">
                {submitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</>
                ) : (
                  "Confirmar agendamento"
                )}
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
