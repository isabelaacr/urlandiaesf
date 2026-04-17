-- Tabela de agendamentos públicos (sem auth)
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  protocol TEXT NOT NULL UNIQUE,
  patient_name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  phone TEXT NOT NULL,
  specialty TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Permite que qualquer pessoa crie um agendamento (formulário público)
CREATE POLICY "Anyone can create an appointment"
ON public.appointments FOR INSERT
WITH CHECK (true);

-- Permite consulta apenas pelo protocolo (não expõe lista completa de PII)
-- A leitura é restrita: ninguém pode SELECT diretamente da tabela.
CREATE POLICY "No direct select on appointments"
ON public.appointments FOR SELECT
USING (false);

-- Função pública para buscar pelo protocolo (segurança definer)
CREATE OR REPLACE FUNCTION public.get_appointment_by_protocol(_protocol TEXT)
RETURNS TABLE (
  protocol TEXT,
  patient_name TEXT,
  specialty TEXT,
  appointment_date DATE,
  appointment_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT protocol, patient_name, specialty, appointment_date, appointment_time, created_at
  FROM public.appointments
  WHERE protocol = upper(_protocol)
  LIMIT 1;
$$;

CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);