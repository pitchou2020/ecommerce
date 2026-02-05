import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";
import { SiPix } from "react-icons/si";

export default function CheckoutHortifruti() {
  const [carrinho, setCarrinho] = useState([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  // Endereço
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  // Condomínio (obrigatório)
  const [condominio, setCondominio] = useState("");
  const [blocoTorre, setBlocoTorre] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [complemento, setComplemento] = useState("");

  const [frete, setFrete] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [freteCalculado, setFreteCalculado] = useState(false);
  const [mensagemFrete, setMensagemFrete] = useState("");

  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();

  // ✅ SP capital (01..06, 08, 09)
  const isCepSaoPaulo = (cepValue) => {
    const c = (cepValue || "").replace(/\D/g, "");
    if (c.length !== 8) return false;
    return (
      c.startsWith("01") ||
      c.startsWith("02") ||
      c.startsWith("03") ||
      c.startsWith("04") ||
      c.startsWith("05") ||
      c.startsWith("06") ||
      c.startsWith("08") ||
      c.startsWith("09")
    );
  };

  // ✅ Helpers
  const onlyDigits = (v) => (v || "").toString().replace(/\D/g, "");

  const getFormaPagamentoId = (label) => {
    const map = {
      Pix: "pix",
      "Cartão de Crédito": "credito",
      "Cartão de Débito": "debito",
      "Boleto Bancário": "boleto",
    };
    return map[label] || "outro";
  };

  // ✅ Carrega carrinho
  useEffect(() => {
    const carrinhoSalvo =
      JSON.parse(localStorage.getItem("carrinhoHortifruti")) || [];
    setCarrinho(Array.isArray(carrinhoSalvo) ? carrinhoSalvo : []);
  }, []);

  const subtotal = useMemo(() => {
    return carrinho.reduce(
      (acc, item) => acc + Number(item.preco || 0) * Number(item.quantity || 1),
      0
    );
  }, [carrinho]);

  const total = useMemo(() => subtotal + Number(frete || 0), [subtotal, frete]);

  // ✅ alterar quantidade (local) — CORRIGIDO (string vs number)
  const alterarQuantidade = (id, novaQtd) => {
    const qtd = Math.max(1, Number(novaQtd) || 1);

    const atualizado = carrinho.map((item) =>
      Number(item.id_produto) === Number(id) ? { ...item, quantity: qtd } : item
    );

    setCarrinho(atualizado);
    localStorage.setItem("carrinhoHortifruti", JSON.stringify(atualizado));
  };

  // ✅ CEP mask
  const handleCepChange = (e) => {
    let valor = onlyDigits(e.target.value);
    if (valor.length > 8) valor = valor.slice(0, 8);
    if (valor.length > 5) valor = valor.replace(/^(\d{5})(\d{0,3}).*/, "$1-$2");
    setCep(valor);
  };

  // ✅ Confirmar CEP (sem frete)
  const confirmarCep = async () => {
    const cepLimpo = onlyDigits(cep);

    if (cepLimpo.length !== 8) {
      setMensagemFrete("Informe um CEP válido (8 dígitos).");
      setFrete(0);
      setFreteCalculado(false);
      return;
    }

    if (!isCepSaoPaulo(cepLimpo)) {
      setMensagemFrete("⚠ Entregamos somente dentro de São Paulo (Capital).");
      setFrete(0);
      setFreteCalculado(false);
      return;
    }

    try {
      const viaCEP = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await viaCEP.json();

      if (dados?.erro) {
        setMensagemFrete("CEP não encontrado.");
        setFrete(0);
        setFreteCalculado(false);
        return;
      }

      setEndereco(dados.logradouro || "");
      setBairro(dados.bairro || "");
      setCidade(dados.localidade || "");
      setUf((dados.uf || "").toUpperCase());

      setFrete(0);
      setFreteCalculado(true);
      setMensagemFrete("✅ CEP confirmado — entrega no apartamento (sem frete).");
    } catch (err) {
      console.error(err);
      setMensagemFrete("Erro na comunicação com o servidor.");
      setFrete(0);
      setFreteCalculado(false);
    }
  };

  // ✅ Validar — AJUSTADO (endereco/numero obrigatórios)
  const validarDados = () => {
    if (!nome.trim()) return "Informe seu nome completo.";
    if (!email.includes("@")) return "Digite um e-mail válido.";

    const cpfDig = onlyDigits(cpf);
    if (cpfDig.length !== 11) return "CPF inválido (precisa ter 11 dígitos).";

    const telDig = onlyDigits(telefone);
    if (telDig.length < 10) return "Telefone inválido.";

    if (!freteCalculado) return "Confirme o CEP antes de continuar.";

    if (!endereco.trim()) return "Informe o endereço.";
    if (!numero.trim()) return "Informe o número do endereço.";

    if (!condominio.trim()) return "Informe o nome do condomínio.";
    if (!blocoTorre.trim()) return "Informe o bloco ou torre.";
    if (!apartamento.trim()) return "Informe o número do apartamento.";

    if (!formaPagamento) return "Escolha uma forma de pagamento.";

    if (!Array.isArray(carrinho) || carrinho.length === 0)
      return "Seu carrinho está vazio.";

    return null;
  };

  // ✅ Finalizar
  const handleFinalizarPedido = async () => {
    const erro = validarDados();
    if (erro) {
      alert(erro);
      return;
    }
    if (enviando) return;

    setEnviando(true);
    try {
      const payload = {
        nome_cliente: nome.trim(),
        email: email.trim(),
        cpf: onlyDigits(cpf),
        telefone: onlyDigits(telefone),

        cep: onlyDigits(cep),
        endereco: endereco.trim(),
        numero: (numero || "").toString().trim(),
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        uf: (uf || "").toString().trim().toUpperCase(),

        condominio: condominio.trim(),
        bloco_torre: blocoTorre.trim(),
        apartamento: apartamento.trim(),
        complemento: complemento.trim(),

        forma_pagamento: formaPagamento,
        forma_pagamento_id: getFormaPagamentoId(formaPagamento), // ✅ extra (não quebra se PHP ignorar)
        observacoes: observacoes.trim(),

        frete: 0,
        total: Number(total.toFixed(2)),
        pedido: carrinho,
      };

      const res = await fetch(
        "https://congolinaria.com.br/api/mercadopago_checkout_hortifruti.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(
          (data?.erro ? `${data.erro}\n` : "Erro no servidor.\n") +
            (data?.detalhe ? `Detalhe: ${data.detalhe}` : "")
        );
        return;
      }

      if (data?.checkout_url) {
        // ✅ limpa carrinho local imediatamente
        localStorage.removeItem("carrinhoHortifruti");
        setCarrinho([]);

        // ✅ abre WhatsApp (se vier do PHP)
        if (data?.whatsapp_url) {
          window.open(data.whatsapp_url, "_blank", "noopener,noreferrer");
        }

        // ✅ redireciona pro MP (delay maior para evitar bloqueio do popup no mobile)
        setTimeout(() => (window.location.href = data.checkout_url), 600);
        return;
      }

      alert(data?.erro || "Erro ao criar o pagamento.");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="w-full bg-green-700 text-white text-center py-2 mb-4 rounded">
        🚚 Entrega no apartamento (sem frete) — informe Condomínio, Bloco/Torre e
        Apartamento
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        🧾 Checkout – Hortifruti
      </h1>

      {carrinho.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Seu carrinho está vazio.</p>
          <button
            onClick={() => navigate("/hortifruti")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Voltar ao Hortifruti
          </button>
        </div>
      ) : (
        <>
          {/* CARRINHO */}
          <div className="border rounded-lg mb-6 shadow bg-white divide-y">
            <div className="p-3 bg-green-100 border border-green-300 text-green-800 text-center text-sm">
              ✅ Entrega <b>sem frete</b> (São Paulo – Capital)
            </div>

            {carrinho.map((item) => (
              <div
                key={item.id_produto}
                className="flex justify-between items-center p-3"
              >
                <div>
                  <p className="font-medium">{item.nome}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        alterarQuantidade(
                          item.id_produto,
                          (item.quantity || 1) - 1
                        )
                      }
                      className="px-2 bg-gray-200 rounded"
                      type="button"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      value={Number(item.quantity || 1)}
                      min="1"
                      onChange={(e) =>
                        alterarQuantidade(item.id_produto, Number(e.target.value))
                      }
                      className="w-12 border rounded text-center"
                    />

                    <button
                      onClick={() =>
                        alterarQuantidade(
                          item.id_produto,
                          (item.quantity || 1) + 1
                        )
                      }
                      className="px-2 bg-gray-200 rounded"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="font-bold text-green-700">
                  R$ {(Number(item.preco) * Number(item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="p-4 text-right text-gray-700">
              Subtotal:{" "}
              <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
              <br />
              Frete: <span className="font-semibold">Grátis ✅</span>
              <hr className="my-2" />
              <p className="text-xl font-bold text-green-700">
                Total: R$ {total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-4 rounded-lg shadow space-y-3">
            <h2 className="text-lg font-semibold">Dados do Cliente</h2>

            <input
              className="w-full border p-2 rounded"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="CPF (somente números)"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Telefone (DDD + número)"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <h2 className="text-lg font-semibold mt-4">Endereço de Entrega</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                className="border p-2 rounded sm:col-span-3"
                placeholder="Nome do Condomínio (obrigatório)"
                value={condominio}
                onChange={(e) => setCondominio(e.target.value)}
              />

              <input
                className="border p-2 rounded"
                placeholder="Bloco/Torre (obrigatório)"
                value={blocoTorre}
                onChange={(e) => setBlocoTorre(e.target.value)}
              />

              <input
                className="border p-2 rounded"
                placeholder="Apartamento (obrigatório)"
                value={apartamento}
                onChange={(e) => setApartamento(e.target.value)}
              />

              <input
                className="border p-2 rounded sm:col-span-3"
                placeholder="Complemento (opcional) — portaria/interfone/referência"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <input
                className="border p-2 rounded w-1/2"
                placeholder="CEP"
                value={cep}
                onChange={handleCepChange}
              />
              <button
                onClick={confirmarCep}
                className="bg-green-600 text-white px-3 py-2 rounded w-1/2"
                type="button"
              >
                Confirmar CEP
              </button>
            </div>

            {mensagemFrete && (
              <p className="text-sm text-gray-700 mt-2">{mensagemFrete}</p>
            )}

            <input
              className="w-full border p-2 rounded"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />

            <div className="flex gap-3">
              <input
                className="border p-2 rounded w-1/3"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />

              <input
                className="border p-2 rounded w-2/3"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <input
                className="border p-2 rounded w-2/3"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />

              <input
                className="border p-2 rounded w-1/3 text-center"
                placeholder="UF"
                value={uf}
                onChange={(e) => setUf(e.target.value.toUpperCase())}
                maxLength={2}
              />
            </div>

            <h2 className="text-lg font-semibold mt-4">Forma de Pagamento</h2>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "pix", label: "Pix", icon: <SiPix className="text-green-600 text-2xl" /> },
                { id: "credito", label: "Cartão de Crédito", icon: <FaCreditCard className="text-blue-600 text-xl" /> },
                { id: "debito", label: "Cartão de Débito", icon: <RiBankCardLine className="text-indigo-600 text-xl" /> },
                { id: "boleto", label: "Boleto Bancário", icon: <BsFileEarmarkText className="text-gray-600 text-xl" /> },
              ].map((opcao) => (
                <label
                  key={opcao.id}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${
                    formaPagamento === opcao.label
                      ? "border-green-600 bg-green-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    value={opcao.label}
                    checked={formaPagamento === opcao.label}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                  />
                  {opcao.icon}
                  <span>{opcao.label}</span>
                </label>
              ))}
            </div>

            <textarea
              className="w-full border p-2 rounded mt-3"
              placeholder="Observações gerais (ex: horário de entrega, restrições...)"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          {/* BOTÕES */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/hortifruti")}
              className="bg-gray-300 px-4 py-2 rounded"
              type="button"
            >
              ← Voltar
            </button>

            <button
              onClick={handleFinalizarPedido}
              disabled={enviando}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60"
              type="button"
            >
              {enviando ? "Enviando..." : "Confirmar Pedido"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
