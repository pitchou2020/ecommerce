import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../composant/Sidebar/Sidebar";

export default function PainelEventosAdmin() {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data_inicio: "",
    data_fim: "",
    link: "",
    imagem: null,
    ativo: 1,
  });

  const [editando, setEditando] = useState(null); // evento em edição
  const [modalAberto, setModalAberto] = useState(false); // controle do modal

  const carregarEventos = () => {
    axios
      .get("https://congolinaria.com.br/api/eventos.php")
      .then((r) => setEventos(r.data))
      .catch((e) => console.error("Erro ao carregar eventos:", e));
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    axios
      .post("https://congolinaria.com.br/api/eventos.php", fd)
      .then(() => {
        alert("✅ Evento criado com sucesso!");
        setForm({
          titulo: "",
          descricao: "",
          data_inicio: "",
          data_fim: "",
          link: "",
          imagem: null,
          ativo: 1,
        });
        carregarEventos();
      })
      .catch(() => alert("❌ Erro ao salvar evento."));
  };

  const handleDelete = (id) => {
    if (window.confirm("Excluir este evento?")) {
      axios
        .delete("https://congolinaria.com.br/api/eventos.php", {
          data: { id },
        })
        .then(() => {
          alert("🗑️ Evento excluído.");
          carregarEventos();
        });
    }
  };

  // === ABRIR MODAL DE EDIÇÃO ===
  const abrirModalEdicao = (evento) => {
    setEditando(evento);
    setModalAberto(true);
  };

  // === SALVAR EDIÇÃO ===
  const salvarEdicao = () => {
    if (!editando?.id) return;
    axios
      .put("https://congolinaria.com.br/api/eventos.php", editando)
      .then(() => {
        alert("✅ Evento atualizado com sucesso!");
        setModalAberto(false);
        setEditando(null);
        carregarEventos();
      })
      .catch(() => alert("❌ Erro ao atualizar evento."));
  };

  return (
    <div className="flex">
          <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto p-4">
       
      <h1 className="text-2xl font-bold text-orange-700 mb-6">
        Painel de Eventos
      </h1>

      {/* === FORM DE CRIAÇÃO === */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-lg font-semibold text-orange-700 mb-3">
          Novo Evento
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Título"
            className="border p-2 rounded"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Link"
            className="border p-2 rounded"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={form.data_inicio}
            onChange={(e) => setForm({ ...form, data_inicio: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={form.data_fim}
            onChange={(e) => setForm({ ...form, data_fim: e.target.value })}
          />
        </div>

        <textarea
          placeholder="Descrição"
          className="border p-2 rounded w-full mt-3"
          rows="3"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        ></textarea>

        <div className="flex items-center gap-3 mt-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, imagem: e.target.files[0] })}
          />
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={form.ativo === 1}
              onChange={(e) =>
                setForm({ ...form, ativo: e.target.checked ? 1 : 0 })
              }
            />
            Evento Ativo
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded"
        >
          Salvar Evento
        </button>
      </form>

      {/* === LISTA DE EVENTOS === */}
      <div className="grid gap-4">
        {eventos.map((ev) => (
          <div
            key={ev.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-orange-700">{ev.titulo}</h3>
              <p className="text-sm text-gray-500">
                {ev.data_inicio} → {ev.data_fim}
              </p>
              <p className="text-sm text-gray-600 mt-1">{ev.descricao}</p>
            </div>
            <div className="flex gap-3 mt-3 md:mt-0">
              <button
                onClick={() => abrirModalEdicao(ev)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(ev.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* === MODAL DE EDIÇÃO === */}
      {modalAberto && editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setModalAberto(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-orange-700 mb-3">
              Editar Evento
            </h2>

            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                className="border p-2 rounded"
                value={editando.titulo}
                onChange={(e) =>
                  setEditando({ ...editando, titulo: e.target.value })
                }
              />
              <textarea
                className="border p-2 rounded"
                rows="3"
                value={editando.descricao}
                onChange={(e) =>
                  setEditando({ ...editando, descricao: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="border p-2 rounded"
                  value={editando.data_inicio}
                  onChange={(e) =>
                    setEditando({ ...editando, data_inicio: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="border p-2 rounded"
                  value={editando.data_fim}
                  onChange={(e) =>
                    setEditando({ ...editando, data_fim: e.target.value })
                  }
                />
              </div>
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Link"
                value={editando.link}
                onChange={(e) =>
                  setEditando({ ...editando, link: e.target.value })
                }
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Number(editando.ativo) === 1}
                  onChange={(e) =>
                    setEditando({
                      ...editando,
                      ativo: e.target.checked ? 1 : 0,
                    })
                  }
                />
                Evento Ativo
              </label>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
