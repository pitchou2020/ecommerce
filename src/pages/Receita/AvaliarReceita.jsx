// pages/AvaliarReceita.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function AvaliarReceita() {
  const [searchParams] = useSearchParams();
  const idPrato = searchParams.get('id');
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const enviarAvaliacao = async () => {
    if (nota < 1 || nota > 5) {
      setMensagem('Escolha uma nota entre 1 e 5 estrelas.');
      return;
    }

    setCarregando(true);
    try {
      const res = await axios.post('https://congolinaria.com.br/api/salvar_avaliacao.php', {
        id_prato: idPrato,
        nota,
        comentario,
      });

      if (res.data.erro) {
        setMensagem(res.data.mensagem);
      } else {
        setMensagem('✅ Avaliação enviada com sucesso!');
      }
    } catch (error) {
      setMensagem('Erro ao enviar avaliação.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg border border-yellow-500">
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">Avalie a Receita</h2>

      <p className="mb-4 text-gray-700">Como foi sua experiência com essa receita?</p>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Nota (1 a 5):</label>
        <select
          value={nota}
          onChange={(e) => setNota(Number(e.target.value))}
          className="w-full border p-2 rounded"
        >
          <option value={0}>Selecione</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n} estrela{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Comentário (opcional):</label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full border p-2 rounded h-24"
        />
      </div>

      <button
        onClick={enviarAvaliacao}
        disabled={carregando}
        className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded w-full font-semibold"
      >
        {carregando ? 'Enviando...' : 'Enviar Avaliação'}
      </button>

      {mensagem && (
        <div className="mt-4 text-center text-sm text-green-700">
          {mensagem}
        </div>
      )}
    </div>
  );
}
