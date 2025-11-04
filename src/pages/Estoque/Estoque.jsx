import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Estoque() {
  const BASE_URL = 'https://congolinaria.com.br/api/';

  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [estoque, setEstoque] = useState([]);

  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [medida, setMedida] = useState('');

  const [saidas, setSaidas] = useState({});
  const [destinos, setDestinos] = useState({});

  useEffect(() => {
    carregarCategorias();
    listarEstoque();
  }, []);

  const carregarCategorias = () => {
    axios.get(`${BASE_URL}categorias.php`).then(res => setCategorias(res.data));
  };

  const carregarSubcategorias = (id_categoria) => {
    axios.get(`${BASE_URL}subcategorias.php?id_categoria=${id_categoria}`)
      .then(res => setSubcategorias(res.data));
  };

  const carregarProdutos = (id_subcategoria) => {
    axios.get(`${BASE_URL}produtos.php?id_subcategoria=${id_subcategoria}`)
      .then(res => setProdutos(res.data));
  };

  const listarEstoque = () => {
    axios.get(`${BASE_URL}estoque.php`).then(res => setEstoque(res.data));
  };

  const adicionarEntrada = () => {
    if (!produto || !quantidade) return;
    axios.post(`${BASE_URL}estoque.php`, {
      id_produto: produto,
      quantidade: parseFloat(quantidade),
      medida
    }).then(() => {
      limparCamposEntrada();
      listarEstoque();
    });
  };

  const registrarSaida = (id_produto) => {
    const quantidadeSaida = saidas[id_produto];
    const destino = destinos[id_produto];
    if (!quantidadeSaida || !destino) return;

    axios.put(`${BASE_URL}estoque.php`, {
      id_produto,
      quantidade_saida: parseFloat(quantidadeSaida),
      destino
    }).then(() => {
      setSaidas(prev => ({ ...prev, [id_produto]: '' }));
      setDestinos(prev => ({ ...prev, [id_produto]: '' }));
      listarEstoque();
    });
  };

  const limparCamposEntrada = () => {
    setCategoria('');
    setSubcategoria('');
    setProduto('');
    setQuantidade('');
    setMedida('');
  };

  const formatarQuantidade = (valor) => {
    if (valor == null) return 0;
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(valor);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Controle de Estoque</h2>

      {/* Entrada de Produto */}
      <div className="bg-white shadow-md p-6 rounded-xl mb-10">
        <h3 className="font-semibold text-lg mb-4 text-gray-600">Registrar Entrada</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <select value={categoria} onChange={e => {
            setCategoria(e.target.value);
            setSubcategoria('');
            setProduto('');
            carregarSubcategorias(e.target.value);
          }} className="border border-gray-300 p-2 rounded-lg">
            <option value="">Categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>

          <select value={subcategoria} onChange={e => {
            setSubcategoria(e.target.value);
            setProduto('');
            carregarProdutos(e.target.value);
          }} className="border border-gray-300 p-2 rounded-lg" disabled={!categoria}>
            <option value="">Subcategoria</option>
            {subcategorias.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.nome}</option>
            ))}
          </select>

          <select value={produto} onChange={e => setProduto(e.target.value)} className="border border-gray-300 p-2 rounded-lg" disabled={!subcategoria}>
            <option value="">Produto</option>
            {produtos.map(prod => (
              <option key={prod.id} value={prod.id}>{prod.nome}</option>
            ))}
          </select>

          <select value={medida} onChange={e => setMedida(e.target.value)} className="border border-gray-300 p-2 rounded-lg">
            <option value="">Medida</option>
            <option value="Unidade">Unidade</option>
            <option value="Caixa">Caixa</option>
            <option value="Kg">Kg</option>
            <option value="g">g</option>
            <option value="Litros">Litros</option>
          </select>

          <input type="number" placeholder="Quantidade" value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />

          <button onClick={adicionarEntrada} className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
            Registrar Entrada
          </button>
        </div>
      </div>

      {/* Listagem de Estoque */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3 text-left">Produto</th>
              <th className="p-3 text-left">Quantidade</th>
              <th className="p-3 text-left">Unidade</th>
              <th className="p-3 text-left">Atualizado</th>
              <th className="p-3 text-left">Registrar Saída</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map(e => (
              <tr key={e.id} className="border-b">
                <td className="p-3">{e.produto}</td>
                <td className="p-3">{formatarQuantidade(e.quantidade)}</td>
                <td className="p-3">{e.unidade}</td>
                <td className="p-3">{new Date(e.atualizado_em).toLocaleString()}</td>
                <td className="p-3 flex items-center flex-wrap gap-2">
                  <label className="font-medium">Saída:</label>
                  <input
                    value={saidas[e.id_produto] || ''}
                    onChange={ev => setSaidas({ ...saidas, [e.id_produto]: ev.target.value })}
                    className="border p-1 w-20 rounded"
                    type="number"
                  />
                  <select
                    value={destinos[e.id_produto] || ''}
                    onChange={(ev) => setDestinos({ ...destinos, [e.id_produto]: ev.target.value })}
                    className="border p-1 rounded"
                  >
                    <option value="">Destino</option>
                    <option value="producao">Produção</option>
                    <option value="sumare">Sumaré</option>
                    <option value="penha">Penha</option>
                  </select>
                  <button
                    onClick={() => registrarSaida(e.id_produto)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold"
                  >
                    OK
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
