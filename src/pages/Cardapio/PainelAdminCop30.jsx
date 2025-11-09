import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PainelAdminCop30() {
  const [pratos, setPratos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  const [form, setForm] = useState({
    id: null,
    nome: '',
    descricao: '',
    categoria: '',
    ingredientes: '',
    modo_preparo: '',
    montagem_prato: '',
    modo_servir: '',
    preco: '',
    imagem: null
  });
  const [novaCategoria, setNovaCategoria] = useState({
    nome_pt: '',
    nome_en: '',
    nome_es: '',
    nome_fr: ''
  });

  const carregarPratos = () => {
    axios.get('https://congolinaria.com.br/api/cardapio_cop30.php')
      .then(res => setPratos(res.data))
      .catch(err => console.error(err));
  };

  const carregarCategorias = () => {
    axios.get('https://congolinaria.com.br/api/categorias_cop30.php')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    carregarPratos();
    carregarCategorias();
  }, []);

  const exibirToast = (mensagem, tipo = 'sucesso') => {
    setMensagem(mensagem);
    setTipoMensagem(tipo);
    setTimeout(() => setMensagem(''), 4000);
  };

  const handleSubmit = () => {
    const metodo = form.id ? 'post' : 'post';
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (form.id) formData.append('_method', 'PUT');

    axios({
      method: 'post',
      url: 'https://congolinaria.com.br/api/cardapio_cop30.php',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        setForm({ id: null, nome: '', descricao: '', categoria: '', ingredientes: '', modo_preparo: '', montagem_prato: '', modo_servir: '', preco: '', imagem: null });
        setPreviewImagem(null);
        carregarPratos();
        exibirToast('✅ Prato salvo com sucesso!', 'sucesso');
      })
      .catch(err => {
        console.error(err);
        exibirToast('❌ Erro ao salvar prato.', 'erro');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Deseja excluir este prato?')) {
      axios.delete('https://congolinaria.com.br/api/cardapio_cop30.php', {
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ id })
      })
      .then(() => {
        exibirToast('✅ Prato excluído com sucesso!', 'sucesso');
        carregarPratos();
      })
      .catch((err) => {
        console.error(err);
        exibirToast('❌ Erro ao excluir prato.', 'erro');
      });
    }
  };

  const handleEdit = (prato) => {
    setForm({
      id: prato.id,
      nome: prato.nome,
      descricao: prato.descricao,
      categoria: prato.categoria,
      ingredientes: prato.ingredientes,
      modo_preparo: prato.modo_preparo,
      montagem_prato: prato.montagem_prato,
      modo_servir: prato.modo_servir,
      preco: prato.preco,
      imagem: null
    });
    setPreviewImagem(prato.imagem);
  };

  const handleAddCategoria = () => {
    const { nome_pt, nome_en, nome_es, nome_fr } = novaCategoria;
    if (!nome_pt.trim()) return;
    axios.post('https://congolinaria.com.br/api/categorias_cop30.php', { nome_pt, nome_en, nome_es, nome_fr })
      .then(() => {
        setNovaCategoria({ nome_pt: '', nome_en: '', nome_es: '', nome_fr: '' });
        carregarCategorias();
      })
      .catch(err => console.error(err));
  };

  const handleDeleteCategoria = (id) => {
    if (window.confirm('Deseja excluir esta categoria?')) {
      axios.delete('https://congolinaria.com.br/api/categorias_cop30.php', {
        data: { id }
      })
        .then(() => carregarCategorias())
        .catch(err => console.error(err));
    }
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, imagem: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImagem(null);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Administração Cardápio COP30</h1>

      {mensagem && (
        <div className={`fixed top-5 right-5 p-4 rounded shadow text-white font-medium z-50 ${tipoMensagem === 'sucesso' ? 'bg-green-600' : 'bg-red-600'}`}>
          {mensagem}
        </div>
      )}

      <div className="mb-6">
        <input type="text" placeholder="Nome do prato" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <textarea placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <input type="text" placeholder="Preço (ex: 25.90)" value={form.preco} onChange={e => setForm({ ...form, preco: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <input type="file" accept="image/*" onChange={handleImagemChange} className="w-full border p-2 mb-2 rounded" />
        {previewImagem && <img src={previewImagem} alt="Pré-visualização" className="w-full max-h-60 object-cover rounded-lg mb-2" />}
        <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} className="w-full border p-2 mb-2 rounded">
          <option value="">Selecione a categoria</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.nome_pt}>{cat.nome_pt}</option>
          ))}
        </select>
        <textarea placeholder="Ingredientes" value={form.ingredientes} onChange={e => setForm({ ...form, ingredientes: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <textarea placeholder="Modo de Preparo" value={form.modo_preparo} onChange={e => setForm({ ...form, modo_preparo: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <textarea placeholder="Montagem do Prato" value={form.montagem_prato} onChange={e => setForm({ ...form, montagem_prato: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <textarea placeholder="Modo de Servir" value={form.modo_servir} onChange={e => setForm({ ...form, modo_servir: e.target.value })} className="w-full border p-2 mb-2 rounded" />

        <button onClick={handleSubmit} className="bg-blue-700 text-white px-4 py-2 rounded">
          {form.id ? 'Atualizar' : 'Cadastrar'} Prato
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Gerenciar Categorias</h2>
      <div className="mb-6">
        <input type="text" placeholder="Nome PT" value={novaCategoria.nome_pt} onChange={e => setNovaCategoria({ ...novaCategoria, nome_pt: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <input type="text" placeholder="Nome EN" value={novaCategoria.nome_en} onChange={e => setNovaCategoria({ ...novaCategoria, nome_en: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <input type="text" placeholder="Nome ES" value={novaCategoria.nome_es} onChange={e => setNovaCategoria({ ...novaCategoria, nome_es: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <input type="text" placeholder="Nome FR" value={novaCategoria.nome_fr} onChange={e => setNovaCategoria({ ...novaCategoria, nome_fr: e.target.value })} className="w-full border p-2 mb-2 rounded" />
        <button onClick={handleAddCategoria} className="bg-green-600 text-white px-4 py-2 rounded">Adicionar Categoria</button>
        <ul className="mt-2">
          {categorias.map(cat => (
            <li key={cat.id} className="flex justify-between items-center mt-1">
              <span>{cat.nome_pt}</span>
              <button onClick={() => handleDeleteCategoria(cat.id)} className="bg-red-600 text-white px-2 py-1 rounded">Excluir</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4">
        {pratos.map(prato => (
          <div key={prato.id} className="border p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg">{prato.nome}</h2>
            <p className="text-sm text-gray-600">{prato.descricao}</p>
            {prato.imagem && <img src={prato.imagem} alt={prato.nome} className="w-full max-h-60 object-cover rounded-lg my-2" />}
            <p className="text-sm font-bold text-green-700">R$ {parseFloat(prato.preco).toFixed(2)}</p>
            <p className="text-xs text-gray-500">Categoria: {prato.categoria}</p>
            <p className="text-xs text-gray-500">Ingredientes: {prato.ingredientes}</p>
            <p className="text-xs text-gray-500">Preparo: {prato.modo_preparo}</p>
            <p className="text-xs text-gray-500">Montagem: {prato.montagem_prato}</p>
            <p className="text-xs text-gray-500">Serviço: {prato.modo_servir}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(prato)} className="px-3 py-1 bg-yellow-500 text-white rounded">Editar</button>
              <button onClick={() => handleDelete(prato.id)} className="px-3 py-1 bg-red-600 text-white rounded">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
