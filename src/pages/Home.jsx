import React from "react";
import HeroSection from "../composant/HeroSection";
import PratosPopulares from "../composant/PratosPopulares";
import MapaUnidades from "../composant/MapaUnidades";
import BlogPosts from "../composant/BlogPosts";
import DepoimentoChef from "../composant/DepoimentoChef";
import ViajeDoCongoSection from "../composant/ViajeDoCongoSection";
import Footer from "../composant/Footer/Footer";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <PratosPopulares />
      </section>

      <section className="bg-amber-50 py-12">
        <ViajeDoCongoSection />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <MapaUnidades />
      </section>

      <section className="bg-neutral-100 py-12">
        <BlogPosts />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <DepoimentoChef />
      </section>

      <Footer />
    </div>
  );
}
