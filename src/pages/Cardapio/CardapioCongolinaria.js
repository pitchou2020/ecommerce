import React, { useEffect, useState } from 'react';
import Toast from '../../composant/Toast';
import axios from 'axios';
import ResumoPedido from './ResumoPedido';
import { useDispatch } from 'react-redux';
import { adicionarItem, limparCarrinho } from '../../redux/cartReducer';
import SugestaoAfroveg from "./SugestaoAfroveg";

export default function CardapioCongolinaria() {
  const [itens, setItens] = useState([]);
  const [toast, setToast] = useState(null);
  const [mostrarResumoCarrinho, setMostrarResumoCarrinho] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [trocoPara, setTrocoPara] = useState('');
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('');
  const [tipoPedidoSelecionado, setTipoPedidoSelecionado] = useState('');
  const [pedidoResumo, setPedidoResumo] = useState(null);
  const [recibo, setRecibo] = useState(null);
  const [categoriaAberta, setCategoriaAberta] = useState('');
  const [termoBusca, setTermoBusca] = useState('');

  const dispatch = useDispatch();

  // NORMALIZAR STRINGS (sem acentos)
  const normalizar = (str) =>
    str
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // BUSCAR ITENS DO CARDÁPIO
  useEffect(() => {
    async function fetchItens() {
      try {
        const res = await axios.get('https://congolinaria.com.br/api/cardapio.php');
        if (!res.data.erro) setItens(res.data.dados);
      } catch (error) {
        setToast({ msg: 'Erro ao carregar itens', tipo: 'error' });
      }
    }
    fetchItens();
  }, []);

  const adicionarAoCarrinho = (item) => {
    dispatch(adicionarItem({ nome: item.titulo, preco: parseFloat(item.preco) }));
  };

  const limparCarrinhoGlobal = () => {
    dispatch(limparCarrinho());
    setToast({ msg: 'Carrinho limpo com sucesso.', tipo: 'success' });
  };

  const finalizarPedido = async () => {
    if (!nome || !telefone || !unidadeSelecionada || !tipoPedidoSelecionado || !formaPagamento || (formaPagamento === 'Dinheiro' && !trocoPara)) {
      setToast({ msg: 'Preencha todas as informações obrigatórias.', tipo: 'error' });
      return;
    }

    const dataHora = new Date().toLocaleString();

    const pedido = {
      nome_cliente: nome,
      telefone,
      email,
      unidade: unidadeSelecionada,
      tipo_pedido: tipoPedidoSelecionado,
      forma_pagamento: formaPagamento,
      troco_para: formaPagamento === 'Dinheiro' ? trocoPara : '',
      dataHora
    };

    try {
      await axios.post('https://congolinaria.com.br/api/pedidos/novo_pedido.php', pedido, {
        headers: { 'Content-Type': 'application/json' }
      });

      setRecibo(pedido);
      setToast({ msg: 'Pedido enviado com sucesso!', tipo: 'success' });

      const mensagem = encodeURIComponent(
        `🍴 *Novo Pedido Recebido!* 🍴\n\n` +
        `👤 *Nome:* ${nome}\n` +
        `📞 *Telefone:* ${telefone}\n` +
        `✉️ *Email:* ${email || 'Não informado'}\n` +
        `🏠 *Unidade:* ${pedido.unidade}\n` +
        `💰 *Pagamento:* ${pedido.forma_pagamento}${pedido.troco_para ? ` (Troco para R$ ${pedido.troco_para})` : ''}\n` +
        `📦 *Tipo de Pedido:* ${pedido.tipo_pedido}\n` +
        `🕒 *Horário:* ${dataHora}`
      );

      window.open(`https://wa.me/5511980451471?text=${mensagem}`, '_blank');

      limparCarrinhoGlobal();
      setNome('');
      setTelefone('');
      setEmail('');
      setFormaPagamento('');
      setTrocoPara('');
      setUnidadeSelecionada('');
      setTipoPedidoSelecionado('');
      setMostrarResumoCarrinho(false);

    } catch (error) {
      setToast({ msg: 'Erro ao enviar pedido.', tipo: 'error' });
    }
  };

  const toggleCategoria = (categoria) => {
    setCategoriaAberta(prev => (prev === categoria ? '' : categoria));
  };

  // DIA ATUAL
  const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  const diaAtual = diasSemana[new Date().getDay()];
  const diaAtualNormalizado = normalizar(diaAtual);

  // FILTRO DE BUSCA
  const itensFiltrados = termoBusca
    ? itens.filter(item => item.titulo.toLowerCase().includes(termoBusca.toLowerCase()))
    : itens;

  // AGRUPAR POR CATEGORIA
  const categoriasAgrupadas = itensFiltrados.reduce((acc, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {});

  // 🔥 CORREÇÃO DEFINITIVA DO RODÍZIO
  const tratarRodizioDias = (dias) => {
    if (!dias) return [];

    // JSON ["quarta"]
    if (dias.startsWith("[")) {
      try {
        return JSON.parse(dias).map(d => normalizar(d));
      } catch {}
    }

    let d = normalizar(dias).trim();
    d = d.replace(/-/g, " ").replace(/\s+/g, " ");

    const mapa = {
      "quarta feira": "quarta",
      "quarta": "quarta",
      "4a feira": "quarta",
      "4ª feira": "quarta",

      "terca feira": "terca",
      "terca": "terca",

      "segunda feira": "segunda",
      "segunda": "segunda",

      "quinta feira": "quinta",
      "quinta": "quinta",

      "sexta feira": "sexta",
      "sexta": "sexta",

      "sabado": "sabado",
      "domingo": "domingo",

      "todos": "todos",
      "todos os dias": "todos"
    };

    return mapa[d] ? [mapa[d]] : [d];
  };

  // AGRUPAR RODÍZIO POR DIA
  const rodiziosAgrupadosPorDia = itens
    .filter(item => item.categoria === "Rodízio" && item.rodizioDias)
    .reduce((acc, item) => {
      const dias = tratarRodizioDias(item.rodizioDias);

      dias.forEach((dia) => {
        if (!acc[dia]) acc[dia] = [];
        acc[dia].push(item);
      });

      return acc;
    }, {});

  return (
    <>
      <div className="min-h-screen p-4 bg-gray-50">
        {toast && <Toast toast={toast} />}

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {['Penha', 'Sumaré'].map((u) => (
            <button
              key={u}
              onClick={() => setUnidadeSelecionada(u)}
              className={`px-5 py-2 rounded-full font-bold text-white ${unidadeSelecionada === u ? 'bg-green-700 scale-110' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {u}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['Viagem', 'Retirada', 'Comer no Local'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setTipoPedidoSelecionado(tipo)}
              className={`px-5 py-2 rounded-full font-bold text-white ${tipoPedidoSelecionado === tipo ? 'bg-yellow-600 scale-110' : 'bg-yellow-500 hover:bg-yellow-600'}`}
            >
              {tipo}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="🔎 Buscar prato..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 focus:ring focus:ring-yellow-400"
          />
        </div>

        <div className="max-w-2xl mx-auto">

          {/* ⭐ RODÍZIO DO DIA */}
          {(rodiziosAgrupadosPorDia[diaAtualNormalizado] || rodiziosAgrupadosPorDia["todos"]) && (
            <div className="mb-8 border-l-4 border-yellow-500 pl-4">
              <h2 className="text-2xl font-bold text-yellow-700 mb-2">
                🍽️ Rodízio de {diaAtual.charAt(0).toUpperCase() + diaAtual.slice(1)}
              </h2>

              <div className="grid gap-4">
                {(rodiziosAgrupadosPorDia[diaAtualNormalizado] || [])
                  .concat(rodiziosAgrupadosPorDia["todos"] || [])
                  .map((item) => (
                    <div key={item.id} className="border rounded p-3 bg-white shadow">
                      <h3 className="text-lg font-bold text-green-700">{item.titulo}</h3>
                      <p className="text-sm text-gray-600">{item.descricao}</p>
                      <p className="text-sm mt-1"><strong>Preço:</strong> R$ {parseFloat(item.preco).toFixed(2)}</p>

                      {(() => {
                        let pratos = [];
                        try {
                          pratos = JSON.parse(item.rodizioPratos || '[]');
                        } catch (e) {
                          console.warn('Erro ao parsear rodizioPratos:', e);
                        }

                        return pratos.length > 0 ? (
                          <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                            {pratos.map((prato, idx) => (
                              <li key={idx}>{prato}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-red-500 mt-2">Nenhum prato listado.</p>
                        );
                      })()}

                      {(tipoPedidoSelecionado === 'Viagem' || tipoPedidoSelecionado === 'Retirada') && (
                        <button
                          onClick={() => adicionarAoCarrinho(item)}
                          className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
                        >
                          Pedir
                        </button>
                      )}
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* ⭐ OUTRAS CATEGORIAS */}
          {Object.keys(categoriasAgrupadas).map((categoria) => {
            if (categoria === 'Rodízio') return null;

            return (
              <div key={categoria} className="mb-4">
                <button
                  onClick={() => toggleCategoria(categoria)}
                  className="w-full text-left bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded mb-2 transition-all"
                >
                  {categoria}
                </button>

                {categoriaAberta === categoria && (
                  <div className="grid gap-4 animate-fadeIn">
                    {categoriasAgrupadas[categoria].map((item) => {
                      let textoDia = '';
                      if (item.dia) {
                        if (item.dia.toLowerCase() === 'todos') {
                          textoDia = 'Todos os dias';
                        } else {
                          const normalizadoDia = normalizar(item.dia);
                          textoDia = normalizadoDia.charAt(0).toUpperCase() + normalizadoDia.slice(1);
                        }
                      }

                      return (
                        <div key={item.id} className="border rounded p-3 bg-white shadow">
                          <h3 className="text-lg font-bold text-green-700">{item.titulo}</h3>
                          <p className="text-sm text-gray-600">{item.descricao}</p>
                          <p className="text-sm mt-1"><strong>Preço:</strong> R$ {parseFloat(item.preco).toFixed(2)}</p>

                          {textoDia && (
                            <p className="text-sm mt-1 text-blue-600">
                              🗓️ Servido: <strong>{textoDia}</strong>
                            </p>
                          )}

                          {(tipoPedidoSelecionado === 'Viagem' || tipoPedidoSelecionado === 'Retirada') && (
                            <button
                              onClick={() => adicionarAoCarrinho(item)}
                              className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
                            >
                              Pedir
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <SugestaoAfroveg />
        </div>

        {mostrarResumoCarrinho && pedidoResumo && (
          <ResumoPedido
            pedido={pedidoResumo}
            setNome={setNome}
            setTelefone={setTelefone}
            setEmail={setEmail}
            setFormaPagamento={setFormaPagamento}
            setTrocoPara={setTrocoPara}
            setUnidadeSelecionada={setUnidadeSelecionada}
            onConfirmar={finalizarPedido}
            onVoltar={() => setMostrarResumoCarrinho(false)}
          />
        )}
      </div>
    </>
  );
}
