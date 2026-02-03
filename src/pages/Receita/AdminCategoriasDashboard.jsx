import { useEffect, useState } from "react";

const DASH_API =
  "https://congolinaria.com.br/api/dashboard_categorias.php";

export default function AdminCategoriasDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(DASH_API)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return <p className="text-gray-400 mb-4">Carregando métricas...</p>;
  }

  return (
    <div className="space-y-6 mb-8">
      {/* CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Categorias" value={data.total_categorias} />
        <Card title="Categorias ativas" value={data.categorias_ativas} />
        <Card title="Receitas" value={data.total_receitas} />
        <Card title="Receitas ativas" value={data.receitas_ativas} />
      </div>

      {/* LISTA */}
      <div className="bg-[#0f1e17] border border-emerald-900 rounded-lg p-4">
        <h3 className="text-emerald-200 mb-3">
          Receitas por categoria
        </h3>

        <ul className="space-y-2 text-sm">
          {data.receitas_por_categoria.map((c) => (
            <li
              key={c.nome}
              className="flex justify-between text-emerald-100"
            >
              <span>{c.nome}</span>
              <span>{c.total}</span>
            </li>
          ))}
        </ul>
        
      </div>
      <div className="bg-[#0f1e17] border border-emerald-900 rounded-lg p-4">
  <h3 className="text-emerald-200 mb-3">
    Receitas mais acessadas
  </h3>

  <ul className="space-y-2 text-sm">
    {data.receitas_mais_acessadas.map((r, index) => (
      <li
        key={r.id}
        className="flex justify-between items-center text-emerald-100"
      >
        <div className="flex gap-2">
          <span className="text-emerald-400 font-bold">
            #{index + 1}
          </span>
          <span>{r.titre}</span>
          {r.categoria && (
            <span className="text-xs text-emerald-300">
              ({r.categoria})
            </span>
          )}
        </div>

        <span className="text-emerald-300">
          👁️ {r.views}
        </span>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[#13261d] border border-emerald-900 rounded-lg p-4">
      <p className="text-xs text-emerald-300">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
