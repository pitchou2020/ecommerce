import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from './../../composant/Sidebar/Sidebar';

export default function PainelReceitasAutorais() {
  const [receitas, setReceitas] = useState([]);
  const [novaReceita, setNovaReceita] = useState({
    id: null,
    titulo: '',
    ingredientes: [''],
    etapas: [{ texto: '', tempo: 0, audio: null }]
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const printRef = useRef();
  const itensPorPagina = 5;

  useEffect(() => {
    carregarReceitas();
  }, []);

  const carregarReceitas = async () => {
    const res = await axios.get('https://congolinaria.com.br/api/receitas_autoriais.php');
    const ordenadas = res.data.sort((a, b) => a.titulo.localeCompare(b.titulo));
    setReceitas(ordenadas);
  };

  const imprimirReceita = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const win = window.open('', '', 'height=600,width=800');
      win.document.write(`
        <html>
        <head>
          <title>Receita</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h3 { color: #333; }
            ul, ol { margin-left: 20px; }
            .no-print { display: none; }
            .logo { max-width: 150px; margin-bottom: 20px; }
            .footer { margin-top: 40px; font-size: 0.9em; color: #666; border-top: 1px solid #ccc; padding-top: 10px; }
          </style>
        </head>
        <body>
          <img src="https://congolinaria.com.br/logo.png" class="logo" alt="Logo Congolinaria" />
          ${printContents}
          <div class="footer">
            Impresso em ${new Date().toLocaleDateString()} - Receita por Chef Pitchou Luambo
          </div>
        </body>
        </html>
      `);
      win.document.close();
      win.print();
    }
  };

  const exportarPDF = () => {
    window.print();
  };

  const compartilharWhatsApp = () => {
    if (!receitaSelecionada) return;
    const texto = `🍽 Receita: ${receitaSelecionada.titulo}\n\nIngredientes:\n- ${receitaSelecionada.ingredientes.join('\n- ')}\n\nEtapas:\n${receitaSelecionada.etapas.map((et, i) => `${i + 1}. ${et.texto} (${et.tempo}s)`).join('\n')}`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const handleChangeReceita = (field, value) => {
    setNovaReceita({ ...novaReceita, [field]: value });
  };

  const handleIngrediente = (i, value) => {
    const novaLista = [...novaReceita.ingredientes];
    novaLista[i] = value;
    setNovaReceita({ ...novaReceita, ingredientes: novaLista });
  };

  const handleEtapa = (i, field, value) => {
    const etapasAtualizadas = [...novaReceita.etapas];
    etapasAtualizadas[i][field] = value;
    setNovaReceita({ ...novaReceita, etapas: etapasAtualizadas });
  };

  const handleAudio = (i, file) => {
    const etapasAtualizadas = [...novaReceita.etapas];
    etapasAtualizadas[i].audio = file;
    setNovaReceita({ ...novaReceita, etapas: etapasAtualizadas });
  };

  const adicionarIngrediente = () => {
    setNovaReceita({ ...novaReceita, ingredientes: [...novaReceita.ingredientes, ''] });
  };

  const adicionarEtapa = () => {
    setNovaReceita({ ...novaReceita, etapas: [...novaReceita.etapas, { texto: '', tempo: 0, audio: null }] });
  };



const salvarReceita = async () => {
  const etapasValidas = novaReceita.etapas
    .map((et) => ({
      texto: et.texto?.trim(),
      tempo: Number(et.tempo),
      audio: et.audio
    }))
    .filter((et) => et.texto && et.tempo > 0);

  if (etapasValidas.length === 0) {
    alert('Adicione ao menos uma etapa válida.');
    return;
  }

  const formData = new FormData();
  formData.append('id', novaReceita.id ?? ''); // obrigatório para edição
  formData.append('titulo', novaReceita.titulo);
  formData.append('ingredientes', JSON.stringify(novaReceita.ingredientes));
  formData.append(
    'etapas_json',
    JSON.stringify(
      etapasValidas.map(({ texto, tempo, audio }) => ({
        texto,
        tempo,
        audio: typeof audio === 'string' ? audio : null // mantém se for link
      }))
    )
  );

  etapasValidas.forEach((et, i) => {
    if (et.audio instanceof File) {
      formData.append(`audio_${i}`, et.audio);
    }
  });

  try {
    await axios.post('https://congolinaria.com.br/api/receitas_autoriais.php', formData);
    carregarReceitas();
    resetarFormulario();
  } catch (err) {
    console.error('Erro ao salvar:', err);
    alert('Erro ao salvar receita.');
  }
};





  const excluirReceita = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
      await axios.delete('https://congolinaria.com.br/api/receitas_autoriais.php', { data: { id } });
      carregarReceitas();
    }
  };

  const editarReceita = async (id) => {
    const res = await axios.get(`https://congolinaria.com.br/api/receitas_autoriais.php?id=${id}`);
    const dados = res.data;
    setNovaReceita({
      id: dados.id,
      titulo: dados.titulo,
      ingredientes: dados.ingredientes,
      etapas: dados.etapas.map(et => ({ ...et, audio: et.audio || null }))
    });
    setModoEdicao(true);
  };

  const visualizarReceita = async (id) => {
    const res = await axios.get(`https://congolinaria.com.br/api/receitas_autoriais.php?id=${id}`);
    setReceitaSelecionada(res.data);
  };

  const resetarFormulario = () => {
    setNovaReceita({ id: null, titulo: '', ingredientes: [''], etapas: [{ texto: '', tempo: 0, audio: null }] });
    setModoEdicao(false);
  };

  const receitasFiltradas = receitas.filter(r => r.titulo.toLowerCase().includes(filtro.toLowerCase()));
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const receitasPaginadas = receitasFiltradas.slice(inicio, inicio + itensPorPagina);
  const totalPaginas = Math.ceil(receitasFiltradas.length / itensPorPagina);

  return (

    <div className="flex min-h-screen">
      <Sidebar />
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gerenciar Receitas Autorais</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          className="w-full mb-2 p-2 border"
          placeholder="Título da Receita"
          value={novaReceita.titulo}
          onChange={(e) => handleChangeReceita('titulo', e.target.value)}
        />

        <h3 className="font-semibold">Ingredientes</h3>
        {novaReceita.ingredientes.map((ing, i) => (
          <input
            key={i}
            className="w-full mb-1 p-1 border"
            value={ing}
            placeholder={`Ingrediente ${i + 1}`}
            onChange={(e) => handleIngrediente(i, e.target.value)}
          />
        ))}
        <button onClick={adicionarIngrediente} className="text-sm text-blue-500 mb-4">+ Ingrediente</button>

        <h3 className="font-semibold">Etapas</h3>
        {novaReceita.etapas.map((etapa, i) => (
          <div key={i} className={`mb-2 border p-2 rounded ${etapa.invalida ? 'border-red-500' : ''}`}>
            <input
              className="w-full mb-1 p-1 border"
              placeholder="Descrição"
              value={etapa.texto}
              onChange={(e) => handleEtapa(i, 'texto', e.target.value)}
            />
            <input
              type="number"
              className="w-full mb-1 p-1 border"
              placeholder="Tempo (s)"
              value={etapa.tempo}
              onChange={(e) => handleEtapa(i, 'tempo', e.target.value)}
            />
            {etapa.audio && typeof etapa.audio === 'string' && (
              <audio controls src={etapa.audio} className="mb-2 w-full" />
            )}
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleAudio(i, e.target.files[0])}
            />
            {etapa.invalida && (
              <p className="text-red-600 text-sm mt-1">Preencha texto e tempo válidos para esta etapa.</p>
            )}
          </div>
        ))}
        <button onClick={adicionarEtapa} className="text-sm text-blue-500 mb-4">+ Etapa</button>

        <div className="flex gap-4">
          <button onClick={salvarReceita} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            {modoEdicao ? 'Atualizar Receita' : 'Salvar Receita'}
          </button>
          {modoEdicao && (
            <button onClick={resetarFormulario} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
              Cancelar Edição
            </button>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Receitas Salvas</h3>
      <input
        type="text"
        placeholder="Filtrar por título..."
        className="w-full mb-4 p-2 border"
        value={filtro}
        onChange={(e) => {
          setFiltro(e.target.value);
          setPaginaAtual(1);
        }}
      />

      <ul className="bg-white rounded shadow p-4">
        {receitasPaginadas.map((r) => (
          <li key={r.id} className="mb-2 flex justify-between items-center">
            <span>{r.titulo}</span>
            <div className="flex gap-3">
              <button onClick={() => visualizarReceita(r.id)} className="text-green-600 hover:text-green-800">Ver</button>
              <button onClick={() => editarReceita(r.id)} className="text-blue-600 hover:text-blue-800">Editar</button>
              <button onClick={() => excluirReceita(r.id)} className="text-red-600 hover:text-red-800">Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaAtual(i + 1)}
            className={`px-3 py-1 rounded ${paginaAtual === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

     {receitasPaginadas.map((r) => (
  <li key={r.id} className="mb-2 flex justify-between items-center">
    <span>{r.titulo}</span>
    <div className="flex gap-3">
      <button onClick={() => visualizarReceita(r.id)} className="text-green-600 hover:text-green-800">Ver</button>
      <button onClick={() => editarReceita(r.id)} className="text-blue-600 hover:text-blue-800">Editar</button>
      <button onClick={() => excluirReceita(r.id)} className="text-red-600 hover:text-red-800">Excluir</button>
     <a
  href={`/assistente/${r.id}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow text-sm"
  title="Iniciar Assistente de Preparo"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-3.027A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z" />
  </svg>
  Assistente
</a>

    </div>
  </li>
))}

    </div>
    </div>
  );
}  