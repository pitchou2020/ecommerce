import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function AssistenteReceita({ id }) {
  const [receita, setReceita] = useState(null);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [iniciada, setIniciada] = useState(false);
  const audioRef = useRef(null);
  const intervaloRef = useRef(null);
  const [nota, setNota] = useState(0);
const [comentario, setComentario] = useState('');
const [enviado, setEnviado] = useState(false);


  useEffect(() => {
    axios.get(`https://congolinaria.com.br/api/receitas_autoriais.php?id=${id}`).then(res => {
      setReceita(res.data);
    });
  }, [id]);

  useEffect(() => {
    if (!iniciada || !receita || !receita.etapas[etapaAtual]) return;

    const etapa = receita.etapas[etapaAtual];

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (etapa.audio) {
      const audio = new Audio(etapa.audio);
      audio.play();
      audioRef.current = audio;
    }

    setTempoRestante(etapa.tempo);

    clearInterval(intervaloRef.current);
    intervaloRef.current = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(intervaloRef.current);
          if (etapaAtual < receita.etapas.length - 1) {
            setEtapaAtual(e => e + 1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervaloRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [etapaAtual, receita, iniciada]);

  const iniciarReceita = () => {
    setEtapaAtual(0);
    setIniciada(true);
  };

  const proximaEtapa = () => {
    if (etapaAtual < receita.etapas.length - 1) {
      setEtapaAtual(e => e + 1);
    }
  };

  const voltarEtapa = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(e => e - 1);
    }
  };

  const reiniciarReceita = () => {
    setEtapaAtual(0);
    setIniciada(true);
  };

  if (!receita) return <div className="text-center text-white">Carregando receita...</div>;

  if (!iniciada) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-white p-6 bg-yellow-800 rounded-xl border-4 border-yellow-600">
        <h2 className="text-3xl font-bold mb-6">{receita.titulo}</h2>
        <p className="text-lg mb-6">Clique no botão abaixo para iniciar o preparo passo a passo.</p>
        <button
          onClick={iniciarReceita}
          className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold px-6 py-3 rounded-lg shadow"
        >
          ▶️ Iniciar Receita
        </button>
      </div>
    );
  }

  if (etapaAtual >= receita.etapas.length) {
  return (
    <div className="max-w-xl mx-auto p-6 mt-20 rounded-2xl shadow-lg bg-gradient-to-br from-green-800 to-green-600 text-white text-center border-4 border-green-500">
      <h2 className="text-3xl font-bold mb-4">🍽 Receita Finalizada!</h2>
      <p className="text-lg mb-6">
        A comida está <strong>preparada</strong>, <strong>pronta para servir</strong> e… <strong>se deliciar</strong>!<br />
        Esperamos que tenha aproveitado essa experiência culinária com o <strong>Assistente do Congolinaria</strong>!
      </p>

      <button
        onClick={reiniciarReceita}
        className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-lg font-semibold shadow mb-4"
      >
        🔁 Fazer Novamente
      </button>

      <br />

      <button
        onClick={() => {
          const texto = `👨🏽‍🍳 Terminei de preparar a receita: *${receita.titulo}* com o Assistente do Congolinaria!\n\nFicou pronta e deliciosa 😋\nAcesse também: https://congolinaria.com.br`;
          const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
          window.open(url, '_blank');
        }}
        className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-2 rounded-lg font-semibold shadow"
      >
        📲 Compartilhar no WhatsApp
      </button>
    </div>
  );
}


  const etapa = receita.etapas[etapaAtual];
  const progresso = ((etapa.tempo - tempoRestante) / etapa.tempo) * 100;
  const ultimaEtapa = etapaAtual === receita.etapas.length - 1 && tempoRestante === 0;
const enviarAvaliacao = async () => {
  try {
    const response = await axios.post('https://congolinaria.com.br/api/salvar_avaliacao.php', {
      id_receita: receita.id,
      nota,
      comentario
    });
    if (!response.data.erro) {
      setEnviado(true);
    }
  } catch (error) {
    alert('Erro ao enviar avaliação. Tente novamente.');
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-lg bg-gradient-to-br from-yellow-900 to-amber-800 text-white font-sans mt-10 border-4 border-yellow-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-200 tracking-widest">
        {receita.titulo}
      </h2>

      <div className="bg-yellow-950 bg-opacity-60 p-4 rounded-xl mb-6 border border-yellow-600">
        <h3 className="text-xl font-semibold text-yellow-300 mb-2">Etapa {etapaAtual + 1}</h3>
        <p className="text-lg">{etapa.texto}</p>

        <div className="w-full bg-yellow-800 rounded-full h-2.5 mt-4 mb-1">
          <div
            className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progresso}%` }}
          ></div>
        </div>
        <div className="text-sm text-yellow-400">⏱ Tempo restante: {tempoRestante}s</div>
      </div>

      {ultimaEtapa ? (
  <div className="text-center mt-6">
    <p className="text-lg text-green-200 font-semibold">
      🎉 Comida preparada! Pronto para servir e se deliciar!
    </p>
    <div className="mt-6 text-left">
  <p className="text-lg font-semibold mb-2 text-yellow-300">⭐ Avalie esta receita:</p>
  <div className="flex gap-2 mb-4">
    {[1, 2, 3, 4, 5].map((n) => (
      <span
        key={n}
        onClick={() => setNota(n)}
        className={`cursor-pointer text-3xl ${n <= nota ? 'text-yellow-400' : 'text-gray-500'}`}
      >
        ★
      </span>
    ))}
  </div>
  <textarea
    className="w-full p-2 rounded bg-yellow-100 text-black mb-4"
    rows={3}
    placeholder="Comentário opcional"
    value={comentario}
    onChange={(e) => setComentario(e.target.value)}
  ></textarea>
  <button
    onClick={enviarAvaliacao}
    disabled={nota === 0 || enviado}
    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow disabled:opacity-50"
  >
    {enviado ? '✅ Avaliação enviada!' : 'Enviar Avaliação'}
  </button>
</div>

  </div>
) : (
  <div className="flex gap-3">
    <button
      onClick={voltarEtapa}
      disabled={etapaAtual === 0}
      className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg shadow disabled:opacity-40"
    >
      Voltar
    </button>
    <button
      onClick={proximaEtapa}
      disabled={etapaAtual >= receita.etapas.length - 1}
      className="w-1/2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg transition duration-200 shadow"
    >
      Próxima Etapa
    </button>
  </div>
)}

    </div>
  );
}
