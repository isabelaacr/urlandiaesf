import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SPECIALTIES = new Set([
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
]);

const TIMES = new Set([
  "08:00", "09:00", "10:00", "11:00",
  "13:00", "14:00", "15:00", "16:00",
]);

const digitsOnly = (v: string) => v.replace(/\D/g, "");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    const patient_name = String(body.patient_name ?? "").trim();
    const cpfRaw = String(body.cpf ?? "");
    const phoneRaw = String(body.phone ?? "");
    const specialty = String(body.specialty ?? "");
    const appointment_date = String(body.appointment_date ?? "");
    const appointment_time = String(body.appointment_time ?? "");

    const cpf = digitsOnly(cpfRaw);
    const phone = digitsOnly(phoneRaw);

    // Validation
    if (patient_name.length < 3 || patient_name.length > 120) {
      return json({ error: "Nome inválido." }, 400);
    }
    if (cpf.length !== 11) {
      return json({ error: "CPF inválido." }, 400);
    }
    if (phone.length < 10 || phone.length > 11) {
      return json({ error: "Telefone inválido." }, 400);
    }
    if (!SPECIALTIES.has(specialty)) {
      return json({ error: "Especialidade inválida." }, 400);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(appointment_date)) {
      return json({ error: "Data inválida." }, 400);
    }
    if (!TIMES.has(appointment_time)) {
      return json({ error: "Horário inválido." }, 400);
    }

    const selected = new Date(appointment_date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime()) || selected < today) {
      return json({ error: "Data não pode estar no passado." }, 400);
    }
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    if (selected > maxDate) {
      return json({ error: "Data muito distante." }, 400);
    }

    const weekday = selected.getDay();
    const hour = parseInt(appointment_time.split(":")[0], 10);
    if (weekday === 0 || weekday === 6) {
      return json({ error: "Não há atendimento aos finais de semana." }, 400);
    }
    if (weekday === 3 && hour >= 13) {
      return json(
        { error: "Quartas à tarde a unidade está fechada." },
        400,
      );
    }

    const protocol = crypto
      .randomUUID()
      .replace(/-/g, "")
      .slice(0, 6)
      .toUpperCase();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error } = await supabase.from("appointments").insert({
      protocol,
      patient_name,
      cpf,
      phone,
      specialty,
      appointment_date,
      appointment_time,
    });

    if (error) {
      console.error("insert failed:", error.message);
      return json({ error: "Não foi possível salvar o agendamento." }, 500);
    }

    return json({ protocol }, 200);
  } catch (err) {
    console.error("create-appointment error:", err);
    return json({ error: "Requisição inválida." }, 400);
  }
});

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
