import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import ReceitasPage from "./ReceitasPage";


export default function IAReceitas() {
  const [ingredientes, setIngredientes] = useState("");
  const [tempo, setTempo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [receitas, setReceitas] = useState([]);
  const [erro, setErro] = useState("");
  const [mostrarFormularioWhatsApp, setMostrarFormularioWhatsApp] = useState(null);
  const [numeroWhatsApp, setNumeroWhatsApp] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [jsonFile, setJsonFile] = useState(null);

  const categoriasDisponiveis = [
    { label: "Todas", value: "" },
    { label: "Entrada", value: "entrada" },
    { label: "Prato Principal", value: "prato principal" },
    { label: "Sobremesa", value: "sobremesa" },
  ];

  const limparTexto = (texto) => {
    return texto.replace(/[[\]"'`]/g, "").trim();
  };

  const buscarReceitas = async () => {
    setErro("");
    setReceitas([]);

    try {
      const res = await axios.post("https://congolinaria.com.br/api/sugerir_receitas.php", {
        ingredientes,
        tempo: tempo ? parseInt(tempo) : 0,
        categoria,
      });

      if (res.data.receitas?.length > 0) {
        setReceitas(res.data.receitas);
      } else {
        setErro(res.data.mensagem || "Nenhuma receita encontrada.");
      }
    } catch (err) {
      setErro("Erro ao buscar receitas.");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Receitas AfroVeg sugeridas", 10, 10);
    let y = 20;

    receitas.forEach((r, i) => {
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${r.titre}`, 10, y);
      y += 6;
      if (r.categoria) {
        doc.setFontSize(10);
        doc.text(`Categoria: ${r.categoria}`, 10, y);
        y += 5;
      }
      if (r.ingredients) {
        const listaIngredientes = limparTexto(r.ingredients).split(',').map(item => `- ${item.trim()}`);
        doc.setFontSize(10);
        doc.text("Ingredientes:", 10, y);
        y += 6;
        listaIngredientes.forEach(ing => {
          doc.text(ing, 12, y);
          y += 5;
        });
      }
      if (r.etapes) {
        const etapas = limparTexto(r.etapes)
          .split(/\n|\r|\r\n|\n\n|\d+\.\s/)
          .filter(e => e.trim() !== '');
        doc.setFontSize(10);
        doc.text("Modo de Preparo:", 10, y);
        y += 6;
        etapas.forEach((etapa, idx) => {
          const texto = `${idx + 1}. ${etapa.trim()}`;
          const linhas = doc.splitTextToSize(texto, 180);
          doc.text(linhas, 12, y);
          y += linhas.length * 6;
        });
      }
      y += 4;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("receitas_afroveg.pdf");
  };

  const handleJsonUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        await axios.post("https://congolinaria.com.br/api/importar_receitas.php", json);
        alert("Receitas importadas com sucesso.");
      } catch (err) {
        alert("Erro ao importar JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <h1 className="text-2xl font-bold text-center mb-6">🍲 Descubra receitas AfroVeg com o que você tem!</h1>

        <div className="w-full max-w-xl space-y-4 mb-6">
          <input
            type="text"
            placeholder="Digite os ingredientes disponíveis (ex: banana, gengibre)"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded shadow"
          />

          <input
            type="number"
            placeholder="Tempo máximo de preparo (min)"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded shadow"
          />

          <div className="flex flex-wrap justify-center gap-2">
            {categoriasDisponiveis.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoria(cat.value)}
                className={`px-4 py-2 rounded-full border ${
                  categoria === cat.value
                    ? "bg-green-700 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                } hover:bg-green-100 transition`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={buscarReceitas}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Buscar Receitas
          </button>

          <div className="pt-4 border-t">
            <label className="block mb-2 font-semibold">📥 Importar Receitas (JSON)</label>
            <input type="file" accept=".json" onChange={handleJsonUpload} className="w-full" />
          </div>
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        {receitas.length > 0 && (
          <button
            onClick={exportarPDF}
            className="mb-6 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
          >
            📄 Exportar Receitas em PDF
          </button>
        )}

        <div className="w-full max-w-3xl space-y-6">
          {receitas.map((r, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded shadow-sm bg-white">
              <h2 className="text-lg font-bold text-green-800 mb-2">{r.titre}</h2>
              {r.url_images && (
                <img
                  src={r.url_images}
                  alt={r.titre}
                  className="w-full h-48 object-cover mt-2 mb-3 rounded"
                />
              )}
              {r.categoria && (
                <p className="text-sm text-purple-700 font-medium mb-2">🍽 Categoria: {r.categoria}</p>
              )}
              <div className="bg-green-50 p-3 rounded mb-2">
                <p className="text-sm text-green-900 font-semibold mb-1">Ingredientes:</p>
                <ul className="list-disc list-inside text-sm text-gray-800">
                  {limparTexto(r.ingredients).split(',').map((ing, idx) => (
                    <li key={idx}>{ing.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm text-yellow-900 font-semibold mb-1">Modo de Preparo:</p>
                <ol className="list-decimal list-inside text-sm text-gray-700">
                  {limparTexto(r.etapes)
                    .split(/\n|\r|\r\n|\n\n|\d+\.\s/)
                    .filter(step => step.trim() !== '')
                    .map((step, idx) => (
                      <li key={idx} className="mb-1">{step.trim()}</li>
                    ))}
                </ol>
              </div>
              {r.tempo_preparo && (
                <p className="text-sm text-blue-600 mt-2 italic">
                  ⏱ Tempo de preparo: {r.tempo_preparo} min
                </p>
              )}

              {mostrarFormularioWhatsApp === i ? (
                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Número de WhatsApp (ex: 5511999999999)"
                    value={numeroWhatsApp}
                    onChange={(e) => setNumeroWhatsApp(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {numeroWhatsApp && nomeUsuario && (
                    <a
                      href={`https://wa.me/${numeroWhatsApp}?text=Olá%20sou%20${encodeURIComponent(nomeUsuario)}.%20Gostaria%20de%20fazer%20a%20receita:%20${encodeURIComponent(
                        r.titre
                      )}%0AIngredientes:%20${encodeURIComponent(
                        limparTexto(r.ingredients)
                      )}%0A%0AModo%20de%20Preparo:%20${encodeURIComponent(limparTexto(r.etapes))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-green-700 font-medium hover:underline"
                    >
                      ✅ Enviar para meu WhatsApp
                    </a>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setMostrarFormularioWhatsApp(i)}
                  className="mt-3 text-sm text-orange-700 font-medium hover:underline"
                >
                  💬 Receber essa receita no meu WhatsApp
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <ReceitasPage />
    </>
  );
}
