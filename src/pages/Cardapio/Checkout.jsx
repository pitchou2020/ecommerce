import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";
import { SiPix } from "react-icons/si";

export default function Checkout() {
  const [carrinho, setCarrinho] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [frete, setFrete] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [freteCalculado, setFreteCalculado] = useState(false);

  const navigate = useNavigate();

  // 🛒 Carrega carrinho salvo
  useEffect(() => {
    const carrinhoSalvo =
      JSON.parse(localStorage.getItem("carrinhoCOP30")) || [];
    setCarrinho(carrinhoSalvo);
  }, []);

  // 💰 Calcula subtotal e total
  const calcularSubtotal = () =>
    carrinho.reduce(
      (acc, item) => acc + (Number(item.preco) || 0) * (Number(item.quantity) || 1),
      0
    );

  const calcularTotal = () => calcularSubtotal() + Number(frete || 0);

  // 🧮 Atualiza quantidade
  const alterarQuantidade = (id, novaQtd) => {
    if (novaQtd < 1) novaQtd = 1;
    const atualizado = carrinho.map((item) =>
      item.id_produto === id ? { ...item, quantity: novaQtd } : item
    );
    setCarrinho(atualizado);
    localStorage.setItem("carrinhoCOP30", JSON.stringify(atualizado));
  };

  // 📦 Máscara CEP
  const handleCepChange = (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 8) valor = valor.slice(0, 8);
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    setCep(valor);
  };

  // 🚚 Calcular frete manualmente (ao clicar no botão)
  const calcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido.");
      return;
    }
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await res.json();

      if (!dados.erro) {
        setEndereco(dados.logradouro);
        setBairro(dados.bairro);
        setCidade(dados.localidade);
        setUf(dados.uf);

        let valorFrete = 24.9;
        if (dados.localidade === "São Paulo") valorFrete = 8.9;
        else if (dados.uf === "SP") valorFrete = 14.9;

        setFrete(valorFrete);
        setFreteCalculado(true);
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar o CEP.");
    }
  };

  // 💳 Finaliza o pedido
const handleFinalizarPedido = async () => {
  try {
    const res = await fetch("https://congolinaria.com.br/api/mercadopago_checkout.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome_cliente: nome,
        cpf,
        telefone,
        observacoes,
        frete,
        total: calcularTotal(),
        pedido: carrinho
      })
    });

    const data = await res.json();
    console.log("Retorno MP:", data);

    if (data?.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert("Erro ao criar pagamento");
      console.error(data);
    }

  } catch (err) {
    console.error(err);
    alert("Erro ao conectar ao servidor.");
  }
};


  // 🔸 Opções de pagamento
  const opcoesPagamento = [
    { id: "pix", label: "Pix", icon: <SiPix className="text-green-600 text-2xl" /> },
    { id: "credito", label: "Cartão de Crédito", icon: <FaCreditCard className="text-blue-600 text-xl" /> },
    { id: "debito", label: "Cartão de Débito", icon: <RiBankCardLine className="text-indigo-600 text-xl" /> },
    { id: "boleto", label: "Boleto Bancário", icon: <BsFileEarmarkText className="text-gray-600 text-xl" /> },
  ];

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🧾 Checkout – Pedido</h1>

      {carrinho.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Seu carrinho está vazio.</p>
          <button
            onClick={() => navigate("/cardapio")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Voltar ao cardápio
          </button>
        </div>
      ) : (
        <>
          {/* 🧾 Itens do pedido */}
          <div className="border rounded-lg mb-6 shadow divide-y bg-white">
            {carrinho.map((item) => (
              <div
                key={item.id_produto}
                className="flex justify-between items-center p-3"
              >
                <div>
                  <p className="font-medium">{item.nome}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alterarQuantidade(item.id_produto, item.quantity - 1)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        alterarQuantidade(item.id_produto, Number(e.target.value))
                      }
                      className="w-12 border rounded text-center"
                    />
                    <button
                      onClick={() => alterarQuantidade(item.id_produto, item.quantity + 1)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="font-bold text-green-700">
                  R$ {(Number(item.preco) * Number(item.quantity)).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="p-4 text-right text-gray-700">
              Subtotal:{" "}
              <span className="font-bold">R$ {calcularSubtotal().toFixed(2)}</span>
              <br />
              Frete:{" "}
              <span className="font-bold">
                {freteCalculado ? `R$ ${frete.toFixed(2)}` : "—"}
              </span>
              <hr className="my-2" />
              <p className="text-lg font-bold text-green-700">
                Total: R$ {calcularTotal().toFixed(2)}
              </p>
            </div>
          </div>

          {/* 🧍 Dados do cliente */}
          <div className="space-y-3 mb-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Dados do Cliente
            </h2>

            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="tel"
              placeholder="Telefone / WhatsApp"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full border p-2 rounded"
            />

            {/* 🏠 Endereço */}
            <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-700">
              Endereço de Entrega
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={handleCepChange}
                className="border p-2 rounded w-1/2"
              />
              <button
                onClick={calcularFrete}
                className="bg-green-600 text-white px-3 py-2 rounded w-1/2 hover:bg-green-700"
              >
                Calcular Frete
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="border p-2 rounded w-1/2"
              />
            </div>
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-2/3 border p-2 rounded"
              />
              <input
                type="text"
                placeholder="UF"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                className="w-1/3 border p-2 rounded text-center"
              />
            </div>

            {/* 💳 Pagamento */}
            <h2 className="text-lg font-semibold mt-6 text-gray-700">
              Forma de Pagamento
            </h2>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {opcoesPagamento.map((opcao) => (
                <label
                  key={opcao.id}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:border-green-600 transition ${
                    formaPagamento === opcao.label
                      ? "border-green-600 bg-green-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="pagamento"
                    value={opcao.label}
                    checked={formaPagamento === opcao.label}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                    className="hidden"
                  />
                  {opcao.icon}
                  <span className="text-gray-700 font-medium">
                    {opcao.label}
                  </span>
                </label>
              ))}
            </div>

            <textarea
              placeholder="Observações (ex: sem pimenta, pouco sal...)"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full border p-2 rounded mt-4"
            />
          </div>

          {/* ✅ Botões finais */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/cardapio")}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
