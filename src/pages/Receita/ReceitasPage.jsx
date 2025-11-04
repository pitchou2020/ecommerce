import { useNavigate } from 'react-router-dom';

export default function ReceitaPreview({ receita }) {
  const navigate = useNavigate();
  receita = 24;

  if (!receita) {
    return (
      <div className="max-w-xl mx-auto mt-6 bg-yellow-800 text-white p-6 rounded-xl shadow-lg text-center">
        <p className="text-lg">Carregando receita...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6 bg-yellow-800 text-white p-6 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">{receita.titulo}</h2>
      <p className="mb-6">Clique no botão abaixo para iniciar o preparo passo a passo.</p>

      <button
        onClick={() => navigate(`/assistente-completo?id=${receita.id}`)}
        className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-lg font-semibold shadow"
      >
        ▶️ Iniciar com Assistente Completo
      </button>
    </div>
  );
}
