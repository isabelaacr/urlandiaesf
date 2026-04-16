import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BookingForm from "@/components/BookingForm";
import Schedule from "@/components/Schedule";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <BookingForm />
        <Schedule />
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
