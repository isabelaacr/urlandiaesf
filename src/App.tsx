import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Index from "./pages/Index.tsx";
import Agendar from "./pages/Agendar.tsx";
import Servicos from "./pages/Servicos.tsx";
import Horarios from "./pages/Horarios.tsx";
import Calendario from "./pages/Calendario.tsx";
import Equipe from "./pages/Equipe.tsx";
import Localizacao from "./pages/Localizacao.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/agendar" element={<Agendar />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/localizacao" element={<Localizacao />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
