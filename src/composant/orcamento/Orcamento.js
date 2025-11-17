import React, { useState } from "react";
import axios from "axios";

export default function Orcamento() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [horaEvento, setHoraEvento] = useState("");
  const [localEvento, setLocalEvento] = useState("");
  const [numPessoas, setNumPessoas] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [statusEnvio, setStatusEnvio] = useState({
    codigo: "",
    type: "",
    mensagem: "",
  });

  const valorTelefone = (e) => {
    let textoAjustado = e.replace(
      /(\d{2})(\d{5})(\d{4})/,
      (regex, arg1, arg2, arg3) => `${arg1} ${arg2}-${arg3}`
    );
    setTelefone(textoAjustado);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const endpoint = "https://congolinaria.com.br/add_orcamento.php";

    axios
      .post(endpoint, {
        nome,
        email,
        whatsapp: telefone,
        mensagem,
        data_evento: dataEvento,
        hora_evento: horaEvento,
        endereco_evento: localEvento,
        numero_pessoa: numPessoas,
      })
      .then((res) => {
        if (res.data.erro) {
          setStatusEnvio({
            codigo: 400,
            type: "error",
            mensagem: res.data.mensagem,
          });
        } else {
          setStatusEnvio({
            codigo: 200,
            type: "success",
            mensagem: res.data.mensagem,
          });
        }
      })
      .catch(() => {
        setStatusEnvio({
          codigo: 400,
          type: "error",
          mensagem: "Tente mais tarde!",
        });
      });
  };

  return (
    <section
      id="order"
      className="w-full bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-8 lg:px-16"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-800 mb-10">
        <span className="block text-orange-600">
          Orçamento para sua festa
        </span>
        Agora
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <div className="flex-shrink-0">
          <img
            src="/pratos/chef-pitchou.jpg"
            alt="Chef Pitchou"
            className="rounded-2xl shadow-lg w-72 lg:w-80 object-cover"
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl border border-orange-100"
        >
          {statusEnvio.type === "success" && (
            <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded-lg text-center">
              {statusEnvio.mensagem}
            </div>
          )}
          {statusEnvio.type === "error" && (
            <div className="mb-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded-lg text-center">
              {statusEnvio.mensagem}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nome completo"
              name="nome"
              onChange={(e) => setNome(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="WhatsApp"
              maxLength="11"
              pattern="[0-9\s]+"
              value={telefone}
              onChange={(e) => valorTelefone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              type="number"
              placeholder="Quantidade de pessoas"
              onChange={(e) => setNumPessoas(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="text"
              placeholder="Endereço / local da festa"
              onChange={(e) => setLocalEvento(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              type="date"
              onChange={(e) => setDataEvento(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="time"
              onChange={(e) => setHoraEvento(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <textarea
            placeholder="Mensagem"
            cols="30"
            rows="5"
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-500 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Orçar agora
          </button>
        </form>
      </div>
    </section>
  );
}
