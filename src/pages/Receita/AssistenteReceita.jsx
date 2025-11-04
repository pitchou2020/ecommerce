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
    setEtapaAtual(0);
    setIniciada(true); // começa direto
    setTempoRestante(0);
    setReceita(null);
    setNota(0);
    setComentario('');
    setEnviado(false);
  }, [id]);

  useEffect(() => {
    axios.get(`https://congolinaria.com.br/api/receitas_autoriais.php?id=${id}`)
      .then(res => setReceita(res.data));
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

  const etapa = receita?.etapas[etapaAtual];
  const progresso = etapa ? ((etapa.tempo - tempoRestante) / etapa.tempo) * 100 : 0;
  const ultimaEtapa = etapaAtual === receita?.etapas.length - 1 && tempoRestante === 0;

  const enviarAvaliacao = async () => {
    try {
      const response = await axios.post('https://congolinaria.com.br/api/salvar_avaliacao.php', {
        id_receita: receita.id,
        nota,
        comentario
      });
      if (!response.data.erro) setEnviado(true);
    } catch (error) {
      alert('Erro ao enviar avaliação.');
    }
  };

  if (!receita) return <div className="text-white text-center">Carregando receita...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-yellow-900 text-white rounded-xl mt-10 border-4 border-yellow-700">
      <h2 className="text-2xl font-bold mb-4">{receita.titulo}</h2>

      {!ultimaEtapa && etapa && (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Etapa {etapaAtual + 1}</h3>
            <p>{etapa.texto}</p>
            <div className="w-full bg-yellow-800 h-2 rounded-full mt-3 mb-1">
              <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${progresso}%` }}></div>
            </div>
            <p className="text-sm text-yellow-300">⏱ {tempoRestante}s</p>
          </div>

          <div className="flex justify-between gap-2">
            <button onClick={() => setEtapaAtual(e => Math.max(0, e - 1))} className="bg-gray-600 px-4 py-2 rounded-lg">
              Voltar
            </button>
            <button onClick={() => setEtapaAtual(e => Math.min(receita.etapas.length - 1, e + 1))} className="bg-yellow-500 px-4 py-2 rounded-lg">
              Próxima
            </button>
          </div>
        </>
      )}

      {ultimaEtapa && (
        <div className="text-center">
          <h3 className="text-green-300 text-xl font-bold mb-3">✅ Receita Finalizada!</h3>
          <button onClick={() => setEtapaAtual(0)} className="bg-green-500 px-4 py-2 rounded-lg mb-4">Fazer Novamente</button>
          <div>
            <p className="text-yellow-300 font-semibold mb-2">Avalie:</p>
            {[1,2,3,4,5].map(n => (
              <span key={n} onClick={() => setNota(n)} className={`cursor-pointer text-2xl ${n <= nota ? 'text-yellow-400' : 'text-gray-500'}`}>★</span>
            ))}
            <textarea
              className="w-full mt-2 p-2 rounded text-black"
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="Comentário opcional"
            />
            <button onClick={enviarAvaliacao} disabled={nota === 0 || enviado} className="mt-2 bg-purple-600 px-4 py-2 rounded text-white">
              {enviado ? '✅ Enviado!' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
