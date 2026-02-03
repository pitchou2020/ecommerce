export default function RecipeTable({ recipes, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-emerald-900 rounded-xl overflow-hidden">
        <thead className="bg-[#13261d] text-emerald-300">
          <tr>
            <th className="p-3 text-left">Receita</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Status</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>

        <tbody>
          {recipes.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-400">
                Nenhuma receita encontrada
              </td>
            </tr>
          )}

          {recipes.map((r) => (
            <tr
              key={r.id}
              className="border-t border-emerald-900 hover:bg-[#13261d]"
            >
              <td className="p-3 font-medium">{r.titre}</td>

              <td className="p-3 text-center">{r.categoria || "-"}</td>

              <td className="p-3 text-center">
                {r.is_active ? (
                  <span className="text-green-400 font-semibold">● Ativa</span>
                ) : (
                  <span className="text-gray-500">● Oculta</span>
                )}
              </td>

              <td className="p-3 text-center">
                {r.is_pro ? (
                  <span className="text-yellow-400 font-semibold">🔒 PRO</span>
                ) : (
                  <span className="text-gray-400">Grátis</span>
                )}
              </td>

              <td className="p-3 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(r)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => onDelete(r.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
