import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategoriaCop30() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nome_pt: '',
    nome_en: '',
    nome_es: '',
    nome_fr: ''
  });

  const carregarCategorias = () => {
    axios.get('https://congolinaria.com.br/api/categorias_cop30.php')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleSubmit = () => {
    if (!form.nome_pt.trim()) return alert("Preencha ao menos o nome em português.");
    
    axios.post('https://congolinaria.com.br/api/categorias_cop30.php', form)
      .then(() => {
        setForm({ nome_pt: '', nome_en: '', nome_es: '', nome_fr: '' });
        carregarCategorias();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir esta categoria?")) {
      axios.delete('https://congolinaria.com.br/api/categorias_cop30.php', {
        data: { id }
      })
      .then(() => carregarCategorias())
      .catch(err => console.error(err));
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Gerenciar Categorias COP30</h2>

      <div className="space-y-2 mb-4">
        <input type="text" placeholder="Nome em Português" value={form.nome_pt} onChange={e => setForm({ ...form, nome_pt: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Nome em Inglês" value={form.nome_en} onChange={e => setForm({ ...form, nome_en: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Nome em Espanhol" value={form.nome_es} onChange={e => setForm({ ...form, nome_es: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Nome em Francês" value={form.nome_fr} onChange={e => setForm({ ...form, nome_fr: e.target.value })} className="w-full border p-2 rounded" />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar Categoria</button>
      </div>

      <ul className="space-y-2">
        {categorias.map(cat => (
          <li key={cat.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
            <div>
              <strong>{cat.nome_pt}</strong>
              <div className="text-sm text-gray-500">
                EN: {cat.nome_en} | ES: {cat.nome_es} | FR: {cat.nome_fr}
              </div>
            </div>
            <button onClick={() => handleDelete(cat.id)} className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
