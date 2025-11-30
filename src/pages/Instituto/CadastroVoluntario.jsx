// src/pages/Instituto/CadastroVoluntario.jsx
import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://congolinaria.com.br/api/instituto/";

export default function CadastroVoluntario() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    cidade: "",
    instituicao: "",
    cnpj: "",
    area_atuacao: "",
    tipo_voluntariado: "",
    disponibilidade: "",
    presencial_online: "",
    observacoes: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErro(null);

    try {
      const res = await axios.post(
        API_BASE + "salvar_voluntario.php",
        form,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        setMsg("Cadastro de voluntário enviado com sucesso!");
        setForm({
          nome: "",
          telefone: "",
          email: "",
          cidade: "",
          instituicao: "",
          cnpj: "",
          area_atuacao: "",
          tipo_voluntariado: "",
          disponibilidade: "",
          presencial_online: "",
          observacoes: "",
        });
      } else {
        setErro(res.data?.error || "Não foi possível enviar o cadastro.");
      }
    } catch (err) {
      setErro("Erro ao enviar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F0E8] min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-[#144D3A] mb-2">
          Cadastro de Voluntários
        </h1>
        <p className="text-gray-700 mb-6">
          Se você deseja apoiar o Instituto Congolinária com seu tempo, conhecimento
          ou recursos, preencha o formulário abaixo. Entraremos em contato para
          alinhar a melhor forma de atuação.
        </p>

        {msg && (
          <div className="mb-4 rounded-lg bg-green-100 text-green-800 px-4 py-2">
            {msg}
          </div>
        )}
        {erro && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-800 px-4 py-2">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Nome completo *
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Telefone
            </label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              WhatsApp / E-mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Cidade
            </label>
            <input
              type="text"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Instituição (se representar alguma)
            </label>
            <input
              type="text"
              name="instituicao"
              value={form.instituicao}
              onChange={handleChange}
              placeholder="Ex: universidade, ONG, empresa..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              CNPJ (se for pessoa jurídica)
            </label>
            <input
              type="text"
              name="cnpj"
              value={form.cnpj}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Área de atuação
            </label>
            <input
              type="text"
              name="area_atuacao"
              value={form.area_atuacao}
              onChange={handleChange}
              placeholder="Ex: psicologia, direito, educação, tradução, assistência social..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Como você gostaria de ajudar?
            </label>
            <textarea
              name="tipo_voluntariado"
              value={form.tipo_voluntariado}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: aulas de português, atendimentos psicológicos, orientação jurídica, oficinas culturais..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Disponibilidade (dias/horários)
            </label>
            <input
              type="text"
              name="disponibilidade"
              value={form.disponibilidade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Forma de atuação
            </label>
            <select
              name="presencial_online"
              value={form.presencial_online}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Selecione</option>
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
              <option value="hibrido">Híbrido</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Observações adicionais
            </label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#144D3A] text-white font-semibold rounded-full shadow hover:bg-[#0f3a2a] disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar cadastro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
