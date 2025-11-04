import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdmin from '../../composant/SidebarAdmin';

export default function PainelPratosPopulares() {
  const [pratos, setPratos] = useState([]);
  const [form, setForm] = useState({ titulo: '', descricao: '', imagem: null });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarPratos();
  }, []);

  const carregarPratos = () => {
    axios.get('https://congolinaria.com.br/api/pratos_populares.php', { withCredentials: true })
      .then(res => setPratos(res.data))
      .catch(err => console.error('Erro ao carregar pratos:', err));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') {
      setForm({ ...form, imagem: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('descricao', form.descricao);
    if (form.imagem) {
      formData.append('imagem', form.imagem);
    }
    if (editando) {
      formData.append('id', editando);
    }

    try {
      const res = await axios.post('https://congolinaria.com.br/api/pratos_populares.php', formData, {
        withCredentials: true,
      });

      if (res.data.erro === false || res.data.success === true) {
        setForm({ titulo: '', descricao: '', imagem: null });
        setEditando(null);
        carregarPratos();
      } else {
        alert('Erro ao salvar: ' + (res.data.mensagem || 'Erro desconhecido.'));
      }
    } catch (err) {
      console.error('Erro ao salvar prato:', err);
      alert('Erro ao salvar prato. Veja o console.');
    }
  };

  const handleEdit = (prato) => {
    setEditando(prato.id);
    setForm({ titulo: prato.titulo, descricao: prato.descricao, imagem: null });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este prato?')) return;

    try {
      const res = await axios.delete('https://congolinaria.com.br/api/pratos_populares.php', {
        data: { id },
        withCredentials: true
      });

      if (res.data.erro === false || res.data.success === true) {
        carregarPratos();
      } else {
        alert('Erro ao excluir: ' + (res.data.mensagem || 'Erro desconhecido.'));
      }
    } catch (err) {
      console.error('Erro ao excluir prato:', err);
      alert('Erro ao excluir prato. Veja o console.');
    }
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setForm({ titulo: '', descricao: '', imagem: null });
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Painel de Pratos Populares</h1>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4" encType="multipart/form-data">
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            name="imagem"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              {editando ? 'Atualizar' : 'Adicionar'}
            </button>
            {editando && (
              <button type="button" onClick={cancelarEdicao} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pratos.map(prato => (
            <div key={prato.id} className="border rounded p-4 shadow">
              {prato.imagem && (
                <img
                  src={prato.imagem}
                  alt={prato.titulo}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-bold text-lg">{prato.titulo}</h3>
              <p className="text-sm text-gray-600">{prato.descricao}</p>
              <div className="flex gap-4 mt-2">
                <button onClick={() => handleEdit(prato)} className="text-blue-600">Editar</button>
                <button onClick={() => handleDelete(prato.id)} className="text-red-600">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
