import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHortifruti from "../components/Hortifruti/HeaderHortifruti";
import FooterHortifruti from "../components/Hortifruti/FooterHortifruti";

export default function HortifrutiLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F0E8]">
      <HeaderHortifruti />

      {/* Conteúdo das páginas filhas */}
      <main className="flex-1">
        <Outlet />
      </main>

      <FooterHortifruti />
    </div>
  );
}
