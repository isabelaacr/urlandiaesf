import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import BookingForm from "@/components/BookingForm";
import Schedule from "@/components/Schedule";
import EventsCalendar from "@/components/EventsCalendar";
import Groups from "@/components/Groups";
import LocationMap from "@/components/LocationMap";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <BookingForm />
        <Services />
        <Schedule />
        <EventsCalendar />
        <Groups />
        <Team />
        <LocationMap />
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
