import React, { useState } from "react";
import axios from "axios";

export default function InvestirNoBrasil() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    pais_origem: "",
    idioma_preferencial: "",
    tipo_interesse: "",
    area_interesse: "",
    faixa_investimento: "",
    previsao_visita: "",
    detalhes: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await axios.post(
        "https://congolinaria.com.br/api/instituto/salvar_investidor_interesse.php",
        form
      );

      if (res.data?.success) {
        setStatus({ type: "success", msg: "Informações enviadas com sucesso!" });
        setForm({
          nome: "",
          email: "",
          telefone: "",
          pais_origem: "",
          idioma_preferencial: "",
          tipo_interesse: "",
          area_interesse: "",
          faixa_investimento: "",
          previsao_visita: "",
          detalhes: "",
        });
      } else {
        setStatus({ type: "error", msg: res.data?.message || "Erro ao enviar." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Erro de conexão com o servidor." });
    }
  };

  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Cabeçalho institucional */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-4">
            Investidores e Empresas Estrangeiras
          </h1>
          <p className="text-gray-700 mb-4 leading-relaxed">
            O Instituto Conglobal atua como ponte entre o Brasil e países da
            África e diáspora, conectando cultura, gastronomia, educação e
            oportunidades econômicas. Nosso objetivo é facilitar a integração de
            empresários, organizações e investidores estrangeiros interessados
            em desenvolver projetos no Brasil, especialmente em áreas ligadas à
            cultura afro-diaspórica, gastronomia AfroVeg, educação, turismo
            cultural e economia criativa.
          </p>
          <p className="text-gray-700 leading-relaxed">
            A partir de uma abordagem não assistencialista e baseada em
            diplomacia cultural, integração econômica e cooperação internacional,
            o Instituto oferece orientação inicial sobre o ambiente brasileiro,
            possibilidades de parceria institucional, conexões com redes locais
            e caminhos formais para desenvolvimento de negócios e projetos.
          </p>
        </section>

        {/* Formulário de interesse */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#144D3A] mb-4">
            Formulário de Interesse
          </h2>
          <p className="text-gray-700 mb-6">
            Preencha o formulário abaixo para que nossa equipe possa conhecer
            melhor seu perfil, país de origem, área de interesse e tipo de
            parceria ou investimento desejado.
          </p>

          {status && (
            <div
              className={`mb-6 p-3 rounded ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Nome */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">
                Nome / Representante *
              </label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nome da pessoa ou representante da empresa"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">E-mail</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="contact@example.com"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Telefone / WhatsApp
              </label>
              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Com código do país"
              />
            </div>

            {/* País de origem */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                País de origem
              </label>
              <input
                name="pais_origem"
                value={form.pais_origem}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Ex: República Democrática do Congo, Angola, França..."
              />
            </div>

            {/* Idioma preferencial */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Idioma preferencial
              </label>
              <select
                name="idioma_preferencial"
                value={form.idioma_preferencial}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Selecione</option>
                <option value="Francês">Francês</option>
                <option value="Inglês">Inglês</option>
                <option value="Espanhol">Espanhol</option>
                <option value="Português">Português</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Tipo de interesse */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Tipo de interesse principal
              </label>
              <select
                name="tipo_interesse"
                value={form.tipo_interesse}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Selecione</option>
                <option value="Investir">Investir</option>
                <option value="Abrir empresa">Abrir empresa</option>
                <option value="Parceria cultural">Parceria cultural</option>
                <option value="Turismo cultural / visita técnica">
                  Turismo cultural / visita técnica
                </option>
                <option value="Projetos educacionais">Projetos educacionais</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Área de interesse */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Área de interesse
              </label>
              <select
                name="area_interesse"
                value={form.area_interesse}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Selecione</option>
                <option value="Gastronomia AfroVeg">Gastronomia AfroVeg</option>
                <option value="Cultura e artes">Cultura e artes</option>
                <option value="Educação e pesquisa">Educação e pesquisa</option>
                <option value="Turismo cultural">Turismo cultural</option>
                <option value="Economia criativa">Economia criativa</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Faixa de investimento */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Faixa de investimento (opcional)
              </label>
              <input
                name="faixa_investimento"
                value={form.faixa_investimento}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Ex: até 50 mil, 50–100 mil, acima de 100 mil..."
              />
            </div>

            {/* Previsão de visita */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Previsão de visita ao Brasil (se houver)
              </label>
              <input
                name="previsao_visita"
                value={form.previsao_visita}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Ex: 2025, 2º semestre, sem data definida..."
              />
            </div>

            {/* Detalhes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">
                Descreva brevemente seu interesse
              </label>
              <textarea
                name="detalhes"
                value={form.detalhes}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                rows={4}
                placeholder="Conte um pouco sobre a empresa, ideias de projeto, expectativas de parceria ou investimento."
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#144D3A] text-white rounded-full font-semibold hover:bg-[#0f3a2a] transition"
              >
                Enviar informações
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
