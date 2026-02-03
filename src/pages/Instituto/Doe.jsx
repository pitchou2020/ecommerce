import React from "react";

export default function Doe() {
  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-8 text-center">
          Doe para o Instituto Conglobal        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center mb-10">
          Sua contribuição fortalece aulas de português, apoio a imigrantes,
          revalidação de diplomas, ações culturais e projetos de integração.
        </p>

        {/* QR CODE */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center mb-12">
          <h2 className="text-xl font-bold text-[#144D3A] mb-4">
            Doação via PIX
          </h2>

          <img
            src="/img/instituto/qrcode-pix.png"
            alt="QR Code PIX"
            className="mx-auto w-56 h-56 rounded-lg shadow"
          />

          <p className="mt-4 text-gray-700">Chave PIX: instituto@institutoconglobal.com.br</p>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-[#144D3A] mb-6">
            Dados para emissão de recibo
          </h2>

          <form className="grid gap-5">
            <input className="p-3 border rounded-md" placeholder="Nome completo" />
            <input className="p-3 border rounded-md" placeholder="Email" />
            <input className="p-3 border rounded-md" placeholder="Telefone" />
            <input className="p-3 border rounded-md" placeholder="Valor da doação (opcional)" />

            <button className="bg-[#144D3A] text-white py-3 rounded-md font-semibold hover:bg-[#0f3a2a]">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
