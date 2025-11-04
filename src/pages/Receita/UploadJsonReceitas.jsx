import React, { useState } from 'react';
import axios from 'axios';

export default function UploadJsonReceitas() {
  const [arquivos, setArquivos] = useState(null);
  const [resultado, setResultado] = useState([]);

  const enviarArquivos = async () => {
    if (!arquivos) return alert("Selecione um arquivo JSON.");

    const formData = new FormData();
    for (let i = 0; i < arquivos.length; i++) {
      formData.append("jsons[]", arquivos[i]);
    }

    try {
      const response = await axios.post('https://www.congolinaria.com.br/api/importar_receitas.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResultado(response.data.resultado || ['Importação concluída com sucesso.']);
    } catch (error) {
      setResultado([`Erro ao importar: ${error.message}`]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Importar Receitas JSON</h2>

      <input
        type="file"
        accept=".json"
        multiple
        onChange={e => setArquivos(e.target.files)}
        className="mb-4"
      />

      <button
        onClick={enviarArquivos}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Enviar
      </button>

      {resultado.length > 0 && (
        <div className="mt-4 bg-gray-100 p-3 rounded shadow">
          <h3 className="font-semibold mb-2">Resultado:</h3>
          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
            {resultado.map((linha, i) => (
              <li key={i}>{linha}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
