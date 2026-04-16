import { Button } from "@/components/ui/button";
import { Calendar, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/ubs-hero.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-secondary blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="animate-fade-in-up space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
            Atendimento gratuito pelo SUS
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Cuidar da sua saúde
            <span className="mt-1 block text-secondary">ficou mais simples.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Agende consultas, vacinas e atendimento odontológico na ESF São Carlos/Urlândia em poucos cliques.
            Tire também suas dúvidas sobre serviços e horários direto pelo nosso assistente virtual.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="font-bold shadow-elevated">
              <a href="#agendar">
                <Calendar className="mr-2 h-5 w-5" />
                Agendar consulta
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/5 font-semibold text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground">
              <a href="#duvidas">
                <MessageCircleQuestion className="mr-2 h-5 w-5" />
                Tirar dúvidas
              </a>
            </Button>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-primary-foreground/15 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-primary-foreground/60">Atendimentos/mês</dt>
              <dd className="mt-1 font-display text-2xl font-extrabold text-secondary">+8mil</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-primary-foreground/60">Especialidades</dt>
              <dd className="mt-1 font-display text-2xl font-extrabold text-secondary">12</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-primary-foreground/60">Profissionais</dt>
              <dd className="mt-1 font-display text-2xl font-extrabold text-secondary">34</dd>
            </div>
          </dl>
        </div>

        <div className="relative animate-fade-in-up [animation-delay:120ms]">
          <div className="relative overflow-hidden rounded-2xl border-4 border-secondary/80 shadow-elevated">
            <img
              src={heroImg}
              alt="Ilustração da ESF São Carlos/Urlândia com pacientes e profissionais"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-background p-4 shadow-elevated sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Próximo atendimento</p>
            <p className="font-display text-lg font-bold text-primary">Hoje, 14h30</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
