import React, { useState } from 'react';
import axios from 'axios';

export default function FecharPedidoGarcom() {
  const [mesa, setMesa] = useState('');
  const [pessoas, setPessoas] = useState(1);
  const [itens, setItens] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [mensagem, setMensagem] = useState('');

  const adicionarItem = () => {
    setItens([...itens, { nome_prato: '', quantidade: 1 }]);
  };

  const atualizarItem = (index, campo, valor) => {
    const novosItens = [...itens];
    novosItens[index][campo] = valor;
    setItens(novosItens);
  };

  const removerItem = (index) => {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
  };

  const enviarPedido = () => {
    const dados = {
      mesa,
      pessoas,
      observacoes,
      itens
    };

    axios.post('https://congolinaria.com.br/api/registrar_pedido_cop30.php', dados)
      .then(() => {
        setMensagem('Pedido enviado com sucesso!');
        setMesa('');
        setPessoas(1);
        setItens([]);
        setObservacoes('');
      })
      .catch(() => setMensagem('Erro ao enviar o pedido.'));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Fechar Pedido - Garçom</h2>

      <input
        type="text"
        placeholder="Mesa"
        value={mesa}
        onChange={e => setMesa(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Número de pessoas"
        value={pessoas}
        onChange={e => setPessoas(parseInt(e.target.value))}
        className="border p-2 rounded w-full mb-2"
      />

      {itens.map((item, index) => (
        <div key={index} className="mb-2 flex gap-2">
          <input
            type="text"
            placeholder="Nome do prato"
            value={item.nome_prato}
            onChange={e => atualizarItem(index, 'nome_prato', e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            placeholder="Qtde"
            value={item.quantidade}
            onChange={e => atualizarItem(index, 'quantidade', parseInt(e.target.value))}
            className="border p-2 rounded w-20"
          />
          <button onClick={() => removerItem(index)} className="bg-red-500 text-white px-2 rounded">X</button>
        </div>
      ))}

      <button onClick={adicionarItem} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Adicionar Item</button>

      <textarea
        placeholder="Observações"
        value={observacoes}
        onChange={e => setObservacoes(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <button onClick={enviarPedido} className="bg-green-600 text-white px-6 py-2 rounded">Enviar Pedido</button>

      {mensagem && <p className="mt-4 text-center text-sm text-green-700 font-bold">{mensagem}</p>}
    </div>
  );
}
