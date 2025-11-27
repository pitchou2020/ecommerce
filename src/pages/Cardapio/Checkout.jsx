import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";
import { SiPix } from "react-icons/si";

export default function Checkout() {
  const [carrinho, setCarrinho] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [frete, setFrete] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [freteCalculado, setFreteCalculado] = useState(false);
  const [mensagemFrete, setMensagemFrete] = useState("");

  const navigate = useNavigate();

  const FRETE_GRATIS_MIN = 200;

  /* VALIDA SE CEP É SP */
  const isCepSaoPaulo = (cep) => {
    cep = cep.replace(/\D/g, "");
    if (cep.length !== 8) return false;
    return (
      cep.startsWith("01") ||
      cep.startsWith("02") ||
      cep.startsWith("03") ||
      cep.startsWith("04") ||
      cep.startsWith("05") ||
      cep.startsWith("06") ||
      cep.startsWith("08") ||
      cep.startsWith("09")
    );
  };

  /* CARREGAR CARRINHO */
  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinhoCOP30")) || [];
    setCarrinho(carrinhoSalvo);
  }, []);

  const calcularSubtotal = () =>
    carrinho.reduce(
      (acc, item) => acc + Number(item.preco) * Number(item.quantity),
      0
    );

  const subtotal = calcularSubtotal();
  const faltaParaFreteGratis = FRETE_GRATIS_MIN - subtotal;

  const calcularTotal = () => {
    if (subtotal >= FRETE_GRATIS_MIN) return subtotal; // frete grátis
    const valorFrete = Number(frete || 0);
    return subtotal + valorFrete;
  };

  /* ALTERAR QUANTIDADE */
  const alterarQuantidade = (id, novaQtd) => {
    if (novaQtd < 1) novaQtd = 1;

    const atualizado = carrinho.map((item) =>
      item.id_produto === id ? { ...item, quantity: novaQtd } : item
    );

    setCarrinho(atualizado);
    localStorage.setItem("carrinhoCOP30", JSON.stringify(atualizado));
  };

  /* CEP MASK */
  const handleCepChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 5) valor = valor.replace(/^(\d{5})(\d{0,3}).*/, "$1-$2");
    setCep(valor);
  };

  /* CALCULAR FRETE */
  const calcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (!isCepSaoPaulo(cepLimpo)) {
      setMensagemFrete("⚠ Entregamos somente dentro de São Paulo (Capital).");
      setFrete(null);
      setFreteCalculado(false);
      return;
    }

    // Se FRETE GRÁTIS → não consulta o backend
    if (subtotal >= FRETE_GRATIS_MIN) {
      setFrete(0);
      setFreteCalculado(true);
      setMensagemFrete("🎉 Você ganhou FRETE GRÁTIS!");
      return;
    }

    try {
      const viaCEP = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await viaCEP.json();

      if (dados.erro) {
        setMensagemFrete("CEP não encontrado.");
        return;
      }

      setEndereco(dados.logradouro);
      setBairro(dados.bairro);
      setCidade(dados.localidade);
      setUf(dados.uf);

      const res = await fetch(
        `https://congolinaria.com.br/api/frete.php?cep=${cepLimpo}`
      );
      const data = await res.json();

      if (data.error) {
        setMensagemFrete("Erro ao calcular o frete.");
        return;
      }

      const valorFrete = Number(data.frete);

      if (isNaN(valorFrete)) {
        setMensagemFrete("Erro ao formatar o valor do frete.");
        return;
      }

      setFrete(valorFrete);
      setFreteCalculado(true);

      setMensagemFrete(
        `Distância: ${data.distancia_km} km — Frete R$ ${valorFrete.toFixed(2)}`
      );
    } catch (err) {
      console.error(err);
      setMensagemFrete("Erro na comunicação com o servidor.");
    }
  };

  /* VALIDAR */
  const validarDados = () => {
    if (!nome) return "Informe seu nome completo.";
    if (!email.includes("@")) return "Digite um e-mail válido.";
    if (cpf.length < 11) return "CPF inválido.";
    if (telefone.length < 10) return "Telefone inválido.";
    if (!freteCalculado) return "Calcule o frete antes de continuar.";
    if (!formaPagamento) return "Escolha uma forma de pagamento.";
    return null;
  };

  /* FINALIZAR PEDIDO */
  const handleFinalizarPedido = async () => {
    const erro = validarDados();
    if (erro) {
      alert(erro);
      return;
    }

    try {
      const res = await fetch(
        "https://congolinaria.com.br/api/mercadopago_checkout.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome_cliente: nome,
            email,
            cpf,
            telefone,
            cep,
            endereco,
            numero,
            bairro,
            cidade,
            uf,
            forma_pagamento: formaPagamento,
            observacoes,
            frete: Number(frete),
            total: Number(calcularTotal().toFixed(2)),
            pedido: carrinho,
          }),
        }
      );

      const data = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert("Erro ao criar o pagamento.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  /* RENDER */
  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* 🔵 TARJA DE FRETE GRÁTIS */}
      <div className="w-full bg-green-700 text-white text-center py-2 mb-4 rounded">
        🆓 Frete grátis para pedidos acima de R$ {FRETE_GRATIS_MIN}
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">🧾 Checkout – Pedido</h1>

      {carrinho.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Seu carrinho está vazio.</p>
          <button
            onClick={() => navigate("/cardapio")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Voltar ao cardápio
          </button>
        </div>
      ) : (
        <>
          {/* CARRINHO */}
          <div className="border rounded-lg mb-6 shadow bg-white divide-y">

            {/* 🔶 BARRA – FALTAM X PARA FRETE GRÁTIS */}
            {subtotal < FRETE_GRATIS_MIN ? (
              <div className="p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 text-center text-sm">
                Faltam <b>R$ {faltaParaFreteGratis.toFixed(2)}</b> para ganhar frete grátis!
              </div>
            ) : (
              <div className="p-3 bg-green-100 border border-green-300 text-green-800 text-center text-sm">
                🎉 Seu pedido tem <b>FRETE GRÁTIS!</b>
              </div>
            )}

            {carrinho.map((item) => (
              <div key={item.id_produto} className="flex justify-between items-center p-3">
                <div>
                  <p className="font-medium">{item.nome}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => alterarQuantidade(item.id_produto, item.quantity - 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        alterarQuantidade(item.id_produto, Number(e.target.value))
                      }
                      className="w-12 border rounded text-center"
                    />

                    <button
                      onClick={() => alterarQuantidade(item.id_produto, item.quantity + 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="font-bold text-green-700">
                  R$ {(item.preco * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {/* RESUMO */}
            <div className="p-4 text-right text-gray-700">
              Subtotal:{" "}
              <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>

              <br />
              Frete:{" "}
              <span className="font-semibold">
                {subtotal >= FRETE_GRATIS_MIN
                  ? "Grátis 🎉"
                  : freteCalculado
                  ? `R$ ${frete.toFixed(2)}`
                  : "—"}
              </span>

              <hr className="my-2" />

              <p className="text-xl font-bold text-green-700">
                Total: R$ {calcularTotal().toFixed(2)}
              </p>
            </div>
          </div>

          {/* FORMULÁRIO */}
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
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <h2 className="text-lg font-semibold mt-4">Endereço de Entrega</h2>

            <div className="flex gap-3">
              <input
                className="border p-2 rounded w-1/2"
                placeholder="CEP"
                value={cep}
                onChange={handleCepChange}
              />
              <button
                onClick={calcularFrete}
                className="bg-green-600 text-white px-3 py-2 rounded w-1/2"
              >
                Calcular Frete
              </button>
            </div>

            {mensagemFrete && (
              <p className="text-sm text-gray-700 mt-2">{mensagemFrete}</p>
            )}

            {freteCalculado && frete !== null && subtotal < FRETE_GRATIS_MIN && (
              <p className="text-green-700 font-bold mt-2">
                Frete: R$ {frete.toFixed(2)}
              </p>
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
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer 
                    ${formaPagamento === opcao.label ? "border-green-600 bg-green-50" : "border-gray-300"}`}
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
              placeholder="Observações"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          {/* BOTÕES */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/cardapio")}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              ← Voltar
            </button>

            <button
              onClick={handleFinalizarPedido}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Confirmar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}
