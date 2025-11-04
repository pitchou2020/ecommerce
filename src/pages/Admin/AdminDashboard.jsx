import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [acessos, setAcessos] = useState([]);

  useEffect(() => {
    fetch("http://localhost/RestoAfrica/src/views/listar_acessos.php")
      .then((res) => res.json())
      .then((data) => setAcessos(data))
      .catch((err) => console.error("Erro ao carregar dados:", err));
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Painel de Acessos</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">User Agent</th>
              <th className="p-3 border-b">Idioma</th>
              <th className="p-3 border-b">Plataforma</th>
              <th className="p-3 border-b">URL</th>
              <th className="p-3 border-b">Referência</th>
              <th className="p-3 border-b">Data</th>
            </tr>
          </thead>
          <tbody>
            {acessos.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{item.id}</td>
                <td className="p-3 border-b truncate max-w-xs">{item.user_agent}</td>
                <td className="p-3 border-b">{item.language}</td>
                <td className="p-3 border-b">{item.platform}</td>
                <td className="p-3 border-b">{item.url}</td>
                <td className="p-3 border-b">{item.referrer}</td>
                <td className="p-3 border-b">{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
