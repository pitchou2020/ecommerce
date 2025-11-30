// src/pages/Instituto/CadastroImigrante.jsx
import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://congolinaria.com.br/api/instituto/";

export default function CadastroImigrante() {
  const [form, setForm] = useState({
    nome: "",
    idade: "",
    nacionalidade: "",
    pais_origem: "",
    idiomas: "",
    telefone: "",
    whatsapp: "",
    email: "",
    cidade: "",
    status_migratorio: "",
    processo_status: "",
    precisa_ajuda_juridica: false,
    necessidades: "",
    observacoes: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setErro(null);

    try {
      const res = await axios.post(
        API_BASE + "salvar_imigrante.php",
        form,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data?.success) {
        setMsg("Cadastro enviado com sucesso! Em breve entraremos em contato.");
        setForm({
          nome: "",
          idade: "",
          nacionalidade: "",
          pais_origem: "",
          idiomas: "",
          telefone: "",
          whatsapp: "",
          email: "",
          cidade: "",
          status_migratorio: "",
          processo_status: "",
          precisa_ajuda_juridica: false,
          necessidades: "",
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
          Cadastro de Imigrantes e Refugiados
        </h1>
        <p className="text-gray-700 mb-6">
          Preencha seus dados para que o Instituto Congolinária possa oferecer apoio
          em documentação, aulas de português, integração social e outras necessidades.
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
          {/* Nome (obrigatório) */}
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#144D3A]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Idade
            </label>
            <input
              type="number"
              name="idade"
              value={form.idade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Nacionalidade
            </label>
            <input
              type="text"
              name="nacionalidade"
              value={form.nacionalidade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              País de origem
            </label>
            <input
              type="text"
              name="pais_origem"
              value={form.pais_origem}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Idiomas que fala
            </label>
            <input
              type="text"
              name="idiomas"
              value={form.idiomas}
              onChange={handleChange}
              placeholder="Ex: francês, lingala, inglês…"
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
              WhatsApp
            </label>
            <input
              type="text"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              E-mail
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
              Cidade / Bairro
            </label>
            <input
              type="text"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Situação migratória
            </label>
            <select
              name="status_migratorio"
              value={form.status_migratorio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Selecione</option>
              <option value="turista">Turista</option>
              <option value="refugio_solicitado">Refúgio solicitado</option>
              <option value="vist_estudante">Visto de estudante</option>
              <option value="visto_humanitario">Visto humanitário</option>
              <option value="indocumentado">Sem documentação</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Situação do processo (se já tiver)
            </label>
            <input
              type="text"
              name="processo_status"
              value={form.processo_status}
              onChange={handleChange}
              placeholder="Ex: aguardando análise, audiência marcada, indeferido, etc."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="precisa_ajuda_juridica"
              name="precisa_ajuda_juridica"
              checked={form.precisa_ajuda_juridica}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label
              htmlFor="precisa_ajuda_juridica"
              className="text-sm text-gray-800"
            >
              Precisa de ajuda jurídica / orientação com documentos?
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Principais necessidades
            </label>
            <textarea
              name="necessidades"
              value={form.necessidades}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: aulas de português, ajuda com visto, escola para os filhos, trabalho..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
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
