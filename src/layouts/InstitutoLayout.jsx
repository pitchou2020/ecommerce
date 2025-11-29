import React from "react";
import { Outlet } from "react-router-dom";
import HeaderInstituto from "../components/Instituto/HeaderInstituto";
import FooterInstituto from "../components/Instituto/FooterInstituto";

export default function InstitutoLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F0E8]">
      <HeaderInstituto />

      {/* Conteúdo das páginas filhas */}
      <main className="flex-1">
        <Outlet />
      </main>

      <FooterInstituto />
    </div>
  );
}
