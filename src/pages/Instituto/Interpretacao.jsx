import React, { useState } from "react";
import axios from "axios";

export default function Interpretacao() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    idioma_principal: "",
    idioma_secundario: "",
    tipo_contexto: "",
    modalidade: "",
    cidade_estado: "",
    data_preferencial: "",
    horario_preferencial: "",
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
        "https://congolinaria.com.br/api/instituto/salvar_solicitacao_interpretacao.php",
        form
      );

      if (res.data?.success) {
        setStatus({ type: "success", msg: "Solicitação enviada com sucesso!" });
        setForm({
          nome: "",
          email: "",
          telefone: "",
          idioma_principal: "",
          idioma_secundario: "",
          tipo_contexto: "",
          modalidade: "",
          cidade_estado: "",
          data_preferencial: "",
          horario_preferencial: "",
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
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#144D3A] mb-4">
          Solicitação de Intérprete
        </h1>
        <p className="text-gray-700 mb-8">
          O Instituto Congolinária disponibiliza intérpretes de{" "}
          <strong>francês, inglês e espanhol</strong> para contextos acadêmicos,
          empresariais, culturais, migratórios e institucionais. Preencha o
          formulário abaixo para que nossa equipe possa avaliar e retornar com
          a melhor forma de atendimento.
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
              Nome completo *
            </label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Digite seu nome completo"
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
              placeholder="seuemail@exemplo.com"
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
              placeholder="(DDD) 00000-0000"
            />
          </div>

          {/* Idioma principal */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Idioma principal desejado *
            </label>
            <select
              name="idioma_principal"
              value={form.idioma_principal}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 bg-white"
            >
              <option value="">Selecione</option>
              <option value="Francês">Francês</option>
              <option value="Inglês">Inglês</option>
              <option value="Espanhol">Espanhol</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Idioma secundário */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Idioma secundário (se houver)
            </label>
            <input
              name="idioma_secundario"
              value={form.idioma_secundario}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Ex: Português, Francês, Inglês…"
            />
          </div>

          {/* Contexto */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Contexto principal do atendimento
            </label>
            <select
              name="tipo_contexto"
              value={form.tipo_contexto}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white"
            >
              <option value="">Selecione</option>
              <option value="Jurídico">Jurídico</option>
              <option value="Acadêmico">Acadêmico</option>
              <option value="Empresarial">Empresarial</option>
              <option value="Saúde">Saúde</option>
              <option value="Serviços públicos">Serviços públicos</option>
              <option value="Cultural">Cultural</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Modalidade */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Modalidade do atendimento
            </label>
            <select
              name="modalidade"
              value={form.modalidade}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white"
            >
              <option value="">Selecione</option>
              <option value="Online">Online</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>

          {/* Cidade/Estado */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Cidade / Estado (para atendimentos presenciais)
            </label>
            <input
              name="cidade_estado"
              value={form.cidade_estado}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Ex: São Paulo/SP"
            />
          </div>

          {/* Data preferencial */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Data preferencial
            </label>
            <input
              type="date"
              name="data_preferencial"
              value={form.data_preferencial}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Horário preferencial */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Horário preferencial
            </label>
            <input
              name="horario_preferencial"
              value={form.horario_preferencial}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Ex: manhã, tarde, horário comercial"
            />
          </div>

          {/* Detalhes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Descreva o contexto do atendimento
            </label>
            <textarea
              name="detalhes"
              value={form.detalhes}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              rows={4}
              placeholder="Explique brevemente o objetivo da interpretação, instituições envolvidas, prazos, etc."
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#144D3A] text-white rounded-full font-semibold hover:bg-[#0f3a2a] transition"
            >
              Enviar solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
