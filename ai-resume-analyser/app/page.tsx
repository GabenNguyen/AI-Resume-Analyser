import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col">
        <Hero />

        <section className="py-10">
          <Features />
        </section>

        <section className="py-10">
          <HowItWorks />
        </section>

        <Footer />
      </main>
    </>
  );
}
