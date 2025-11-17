import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './../../composant/Sidebar/Sidebar';

export default function NovaReceitaAutoral() {
  const [form, setForm] = useState({
    titre: '',
    categoria: '',
    tempo_preparo: '',
    tempo_cozimento: '',
    tempo_reposo: '',
    metodo_cocao: '',
    ingredientes: '',
    etapes: '',
    url: '',
    imagem: null
  });

  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagem: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    data.append('vegan', 'Vegan (vegano)');

    try {
      const res = await axios.post('https://www.congolinaria.com.br/api/receita_autoral.php', data);
      if (res.data?.mensagem) {
        setMensagem(res.data.mensagem);
        setTipoMensagem('sucesso');
      } else if (res.data?.erro) {
        setMensagem('Erro: ' + res.data.erro);
        setTipoMensagem('erro');
      } else {
        setMensagem('Receita enviada, mas sem resposta definida.');
        setTipoMensagem('erro');
      }
      setForm({
        titre: '', categoria: '', tempo_preparo: '', tempo_cozimento: '', tempo_reposo: '',
        metodo_cocao: '', ingredientes: '', etapes: '', url: '', imagem: null
      });
    } catch (err) {
      setMensagem('Erro ao cadastrar receita.');
      setTipoMensagem('erro');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Cadastrar Receita Autoral Vegana</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="titre" value={form.titre} onChange={handleChange} placeholder="Título" className="w-full border p-2 rounded" required />
          <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" className="w-full border p-2 rounded" required />
          <input name="tempo_preparo" value={form.tempo_preparo} onChange={handleChange} placeholder="Tempo de Preparo (min)" type="number" className="w-full border p-2 rounded" />
          <input name="tempo_cozimento" value={form.tempo_cozimento} onChange={handleChange} placeholder="Tempo de Cozimento (min)" type="number" className="w-full border p-2 rounded" />
          <input name="tempo_reposo" value={form.tempo_reposo} onChange={handleChange} placeholder="Tempo de Repouso (min)" type="number" className="w-full border p-2 rounded" />
          <input name="metodo_cocao" value={form.metodo_cocao} onChange={handleChange} placeholder="Método de Cocção" className="w-full border p-2 rounded" />
          <textarea name="ingredientes" value={form.ingredientes} onChange={handleChange} placeholder="Ingredientes" rows={4} className="w-full border p-2 rounded" required />
          <textarea name="etapes" value={form.etapes} onChange={handleChange} placeholder="Modo de Preparo" rows={6} className="w-full border p-2 rounded" required />
          <input name="url" value={form.url} onChange={handleChange} placeholder="URL da Receita (opcional)" className="w-full border p-2 rounded" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Cadastrar Receita</button>
        </form>
        {mensagem && (
          <p className={`mt-4 text-center font-medium ${tipoMensagem === 'erro' ? 'text-red-600' : 'text-green-700'}`}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}
