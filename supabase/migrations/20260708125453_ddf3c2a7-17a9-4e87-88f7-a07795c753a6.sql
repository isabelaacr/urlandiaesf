DROP POLICY IF EXISTS "Anyone can create an appointment" ON public.appointments;
DROP POLICY IF EXISTS "No direct select on appointments" ON public.appointments;

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.appointments FROM anon, authenticated, PUBLIC;
GRANT ALL ON public.appointments TO service_role;

REVOKE ALL ON FUNCTION public.get_appointment_by_protocol(text) FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_appointment_by_protocol(text) TO service_role;