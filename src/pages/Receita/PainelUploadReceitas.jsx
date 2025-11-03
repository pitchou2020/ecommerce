import { useState } from 'react';
import axios from 'axios';

export default function PainelUploadReceitas() {
  const [arquivo, setArquivo] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [log, setLog] = useState([]);

  const handleUpload = async () => {
    if (!arquivo) {
      setErro(true);
      setMensagem("Por favor, selecione um arquivo JSON.");
      return;
    }

    const formData = new FormData();
    formData.append("arquivo", arquivo);

    try {
      const res = await axios.post("https://congolinaria.com.br/api/importar_receitas.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.erro) {
        setErro(true);
        setMensagem(res.data.mensagem);
        setLog(res.data.log || []);
      } else {
        setErro(false);
        setMensagem(res.data.mensagem);
        setLog(res.data.log || []);
      }
    } catch (error) {
      setErro(true);
      setMensagem("Erro ao enviar o arquivo. Verifique a conexão e tente novamente.");
      setLog([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">📥 Importar Receitas por JSON</h1>

      <input
        type="file"
        accept="application/json"
        onChange={(e) => setArquivo(e.target.files[0])}
        className="mb-4 border p-2 rounded w-full max-w-md"
      />

      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Enviar Arquivo JSON
      </button>

      {mensagem && (
        <p className={`mt-4 text-center ${erro ? 'text-red-600' : 'text-green-700'}`}>
          {mensagem}
        </p>
      )}

      {log.length > 0 && (
        <div className="mt-6 w-full max-w-2xl bg-white border rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">📄 Log de Processamento</h2>
          <ul className="space-y-1 max-h-60 overflow-y-auto text-sm">
            {log.map((item, index) => (
              <li key={index} className={item.includes("✅") ? "text-green-700" : "text-red-600"}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
