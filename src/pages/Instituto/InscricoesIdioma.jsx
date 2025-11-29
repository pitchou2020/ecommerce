import React, { useState } from "react";

export default function InscricoesIdioma() {
  const [tipo, setTipo] = useState("aluno");

  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-6">
          Inscrições – Aulas de Português & Voluntariado
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          Preencha o formulário abaixo para participar das aulas de português
          ou para atuar como voluntário no Instituto Congolinaria.
        </p>

        {/* Seletor */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTipo("aluno")}
            className={`px-4 py-2 rounded-full font-semibold ${
              tipo === "aluno"
                ? "bg-[#144D3A] text-white"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            Sou Aluno
          </button>
          <button
            onClick={() => setTipo("voluntario")}
            className={`px-4 py-2 rounded-full font-semibold ${
              tipo === "voluntario"
                ? "bg-[#C9A23F] text-[#144D3A]"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            Quero Ser Voluntário
          </button>
        </div>

        {/* FORMULÁRIO */}
        <form className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-5">

          <div>
            <label className="font-medium text-gray-800">Nome completo</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-800">Telefone / WhatsApp</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-800">E-mail</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border rounded-md"
            />
          </div>

          {tipo === "aluno" && (
            <>
              <div>
                <label className="font-medium text-gray-800">Nacionalidade</label>
                <input type="text" className="w-full mt-1 p-3 border rounded-md" />
              </div>

              <div>
                <label className="font-medium text-gray-800">Precisa de ajuda com documentos?</label>
                <select className="w-full mt-1 p-3 border rounded-md">
                  <option>Sim</option>
                  <option>Não</option>
                </select>
              </div>
            </>
          )}

          {tipo === "voluntario" && (
            <>
              <div>
                <label className="font-medium text-gray-800">Área de atuação</label>
                <select className="w-full mt-1 p-3 border rounded-md">
                  <option>Professor(a) de Português</option>
                  <option>Psicólogo(a)</option>
                  <option>Advogado(a)</option>
                  <option>Assistente Social</option>
                  <option>Tradutor(a)</option>
                  <option>Outro</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-gray-800">Disponibilidade</label>
                <input type="text" className="w-full mt-1 p-3 border rounded-md" />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[#144D3A] text-white py-3 rounded-md font-semibold hover:bg-[#0e3a2b] transition"
          >
            Enviar Inscrição
          </button>
        </form>
      </div>
    </div>
  );
}
