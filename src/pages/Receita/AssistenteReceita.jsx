import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function AssistenteReceita({ id }) {
  const [receita, setReceita] = useState(null);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [iniciada, setIniciada] = useState(false);
  const [erro, setErro] = useState(null);
  const audioRef = useRef(null);
  const intervaloRef = useRef(null);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);

  // Reset quando muda o ID
  useEffect(() => {
    setEtapaAtual(0);
    setIniciada(false);
    setTempoRestante(0);
    setReceita(null);
    setNota(0);
    setComentario('');
    setEnviado(false);
    setErro(null);
  }, [id]);

  // Carregar a receita
  useEffect(() => {
    if (!id || id === 'undefined') {
      setErro('Nenhum ID de receita foi informado.');
      return;
    }

    axios
      .get(`https://congolinaria.com.br/api/receitas_autoriais.php?id=${id}`)
      .then((res) => {
        if (!res.data || typeof res.data !== 'object') {
          setErro('Receita inválida ou não encontrada.');
          return;
        }

        const dados = Array.isArray(res.data) ? res.data[0] : res.data;

        if (!Array.isArray(dados.etapas)) {
          dados.etapas = [
            { texto: 'Modo de preparo não informado.', tempo: 5, audio: null },
          ];
        }

        setReceita(dados);
        setIniciada(true);
      })
      .catch(() => setErro('Erro ao carregar a receita.'));
  }, [id]);

  // Controle das etapas + correção do áudio
  useEffect(() => {
    if (!iniciada || !receita || !receita.etapas || !receita.etapas[etapaAtual])
      return;

    const etapa = receita.etapas[etapaAtual];

    // Para o áudio anterior com segurança
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Espera 200ms antes de tocar o novo áudio (evita conflito com pause)
    if (etapa.audio) {
      setTimeout(() => {
        const audio = new Audio(etapa.audio);
        audio
          .play()
          .catch((err) =>
            console.warn('⚠️ Erro ao tocar áudio (ignorado):', err)
          );
        audioRef.current = audio;
      }, 200);
    }

    // Contagem regressiva
    setTempoRestante(etapa.tempo || 0);

    clearInterval(intervaloRef.current);
    intervaloRef.current = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervaloRef.current);
          if (etapaAtual < receita.etapas.length - 1) {
            setEtapaAtual((e) => e + 1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Limpeza ao sair
    return () => {
      clearInterval(intervaloRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [etapaAtual, receita, iniciada]);

  // Verificações seguras
  if (erro)
    return <div className="text-red-400 text-center mt-10">{erro}</div>;
  if (!receita)
    return (
      <div className="text-white text-center mt-10">
        Carregando receita...
      </div>
    );

  const etapa = receita.etapas?.[etapaAtual];
  const progresso =
    etapa && etapa.tempo
      ? ((etapa.tempo - tempoRestante) / etapa.tempo) * 100
      : 0;
  const ultimaEtapa =
    receita.etapas &&
    etapaAtual === receita.etapas.length - 1 &&
    tempoRestante === 0;

  // Envio de avaliação
  const enviarAvaliacao = async () => {
    try {
      const response = await axios.post(
        'https://congolinaria.com.br/api/salvar_avaliacao.php',
        {
          id_receita: receita.id,
          nota,
          comentario,
        }
      );
      if (!response.data.erro) setEnviado(true);
    } catch {
      alert('Erro ao enviar avaliação.');
    }
  };

  // Renderização
  return (
    <div className="max-w-xl mx-auto p-6 bg-yellow-900 text-white rounded-xl mt-10 border-4 border-yellow-700">
      <h2 className="text-2xl font-bold mb-4">
        {receita.titulo || 'Receita sem título'}
      </h2>

      {!ultimaEtapa && etapa && (
        <>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">
              Etapa {etapaAtual + 1}
            </h3>
            <p>{etapa.texto}</p>
            <div className="w-full bg-yellow-800 h-2 rounded-full mt-3 mb-1">
              <div
                className="h-2 bg-yellow-400 rounded-full"
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
            <p className="text-sm text-yellow-300">
              ⏱ {tempoRestante}s
            </p>
          </div>

          <div className="flex justify-between gap-2">
            <button
              onClick={() => setEtapaAtual((e) => Math.max(0, e - 1))}
              className="bg-gray-600 px-4 py-2 rounded-lg"
            >
              Voltar
            </button>
            <button
              onClick={() =>
                setEtapaAtual((e) =>
                  Math.min(receita.etapas.length - 1, e + 1)
                )
              }
              className="bg-yellow-500 px-4 py-2 rounded-lg"
            >
              Próxima
            </button>
          </div>
        </>
      )}

      {ultimaEtapa && (
        <div className="text-center">
          <h3 className="text-green-300 text-xl font-bold mb-3">
            ✅ Receita Finalizada!
          </h3>
          <button
            onClick={() => setEtapaAtual(0)}
            className="bg-green-500 px-4 py-2 rounded-lg mb-4"
          >
            Fazer Novamente
          </button>

          <div>
            <p className="text-yellow-300 font-semibold mb-2">Avalie:</p>
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setNota(n)}
                className={`cursor-pointer text-2xl ${
                  n <= nota ? 'text-yellow-400' : 'text-gray-500'
                }`}
              >
                ★
              </span>
            ))}
            <textarea
              className="w-full mt-2 p-2 rounded text-black"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Comentário opcional"
            />
            <button
              onClick={enviarAvaliacao}
              disabled={nota === 0 || enviado}
              className="mt-2 bg-purple-600 px-4 py-2 rounded text-white"
            >
              {enviado ? '✅ Enviado!' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
