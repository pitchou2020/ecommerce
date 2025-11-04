import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, CheckCircle, XCircle, PlusCircle, Upload } from 'lucide-react';
import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from '@headlessui/react';
import Sidebar from '../../composant/Sidebar/Sidebar';

import { motion } from 'framer-motion';
import { Toast } from '../../composant/Toast';

export default function PainelCardapioAdmin() {
  const URL_CARDAPIO = 'https://congolinaria.com.br/api/cardapio.php';
  const URL_RODIZIO = 'https://congolinaria.com.br/api/rodizio.php';

  const [itens, setItens] = useState([]);
  const [toast, setToast] = useState(null);
  const [modoEdicaoId, setModoEdicaoId] = useState(null);
  const [edicoes, setEdicoes] = useState({});
  const [edicaoImagem, setEdicaoImagem] = useState(null);
  const [previewImagemEdicao, setPreviewImagemEdicao] = useState(null);
  const [novoItemAtivo, setNovoItemAtivo] = useState(false);
 
  const [novoItem, setNovoItem] = useState({
    titulo: '',
    descricao: '',
    preco: '',
    categoria: '',
    dia: '',
    ativo: true,
    imagem: null,
    rodizioDias: '',
    rodizioPratos: [] // 👈 adicione isso
  });
  
  const [previewImagem, setPreviewImagem] = useState(null);
  const [confirmarExclusaoId, setConfirmarExclusaoId] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [imagemValida, setImagemValida] = useState(true);
  const [erroImagem, setErroImagem] = useState('');
  const [rodizios, setRodizios] = useState([]);
  const [novoRodizio, setNovoRodizio] = useState({ dia_semana: '', nome_rodizio: '' });
  const [itensRodizio, setItensRodizio] = useState({});
  const [novoItemRodizio, setNovoItemRodizio] = useState({});
  const [modoEdicaoItemRodizio, setModoEdicaoItemRodizio] = useState({});
  const [rodiziosAbertos, setRodiziosAbertos] = useState({});
  

  useEffect(() => {
    async function verificarSessao() {
      try {
        const res = await axios.get('https://congolinaria.com.br/api/verificar_sessao.php', {
          withCredentials: true
        });
        if (res.data.erro) {
          window.location.href = '/login'; // redireciona se não estiver logado
        }
      } catch {
        window.location.href = '/login';
      }
    }
  
    verificarSessao();
    fetchItens();
    fetchRodizios();
  }, []);

  const fetchItens = async () => {
    try {
      const res = await axios.get(URL_CARDAPIO);
      if (res.data && !res.data.erro && Array.isArray(res.data.dados)) {
        setItens(res.data.dados);
      } else {
        setItens([]);
      }
    } catch (error) {
      console.error('Erro ao carregar itens do cardápio:', error);
      setItens([]);
    }
  };

  const fetchRodizios = async () => {
    try {
      const res = await axios.get(`${URL_RODIZIO}?action=listarRodizios`);
      if (res.data) setRodizios(res.data);
    } catch (error) {
      console.error('Erro ao carregar rodízios:', error);
    }
  };

  const adicionarRodizio = async () => {
    try {
      const res = await axios.post(URL_RODIZIO, novoRodizio);
      if (!res.data.erro) {
        fetchRodizios();
        setNovoRodizio({ dia_semana: '', nome_rodizio: '' });
      }
    } catch (error) {
      console.error('Erro ao adicionar rodízio:', error);
    }
  };

  const carregarItensRodizio = async (idRodizio) => {
    try {
      const res = await axios.get(`${URL_RODIZIO}?action=listarItens&id_rodizio=${idRodizio}`);
      if (res.data) setItensRodizio(prev => ({ ...prev, [idRodizio]: res.data }));
    } catch (error) {
      console.error('Erro ao carregar itens do rodízio:', error);
    }
  };

  const adicionarItemRodizio = async (idRodizio) => {
    try {
      const novoItem = novoItemRodizio[idRodizio];
      const res = await axios.post(URL_RODIZIO, { ...novoItem, id_rodizio: idRodizio });
      if (!res.data.erro) {
        carregarItensRodizio(idRodizio);
        setNovoItemRodizio(prev => ({ ...prev, [idRodizio]: {} }));
      }
    } catch (error) {
      console.error('Erro ao adicionar item no rodízio:', error);
    }
  };

  const editarItemRodizio = async (idRodizio, idItem) => {
    try {
      const itemEditado = modoEdicaoItemRodizio[idItem];
      const res = await axios.put(URL_RODIZIO, { ...itemEditado, id: idItem });
      if (!res.data.erro) {
        carregarItensRodizio(idRodizio);
        setModoEdicaoItemRodizio(prev => {
          const novo = { ...prev };
          delete novo[idItem];
          return novo;
        });
      }
    } catch (error) {
      console.error('Erro ao editar item do rodízio:', error);
    }
  };

  const excluirItemRodizio = async (idRodizio, idItem) => {
    try {
      const res = await axios.delete(URL_RODIZIO, { data: { id: idItem } });
      if (!res.data.erro) carregarItensRodizio(idRodizio);
    } catch (error) {
      console.error('Erro ao excluir item do rodízio:', error);
    }
  };

  const toggleRodizio = (idRodizio) => {
    setRodiziosAbertos(prev => {
      const novo = { ...prev, [idRodizio]: !prev[idRodizio] };
      if (!prev[idRodizio]) carregarItensRodizio(idRodizio);
      return novo;
    });
  };

  const iniciarEdicao = (item) => {
    setModoEdicaoId(item.id);
    setEdicoes({ ...item });
    setEdicaoImagem(null);
    setPreviewImagemEdicao(null);
    setImagemValida(true);
    setErroImagem('');
  };

  const cancelarEdicao = () => {
    setModoEdicaoId(null);
    setEdicoes({});
    setEdicaoImagem(null);
    setPreviewImagemEdicao(null);
    setImagemValida(true);
    setErroImagem('');
  };

  const salvarEdicao = async () => {
    if (!imagemValida) return;
  
    try {
      const dados = { ...edicoes };
      if (edicoes.categoria === 'Rodízio') {
        dados.rodizioDias = edicoes.rodizioDias || '';
        dados.rodizioPratos = edicoes.rodizioPratos || '[]';
      }
  
      const res = await axios.put(URL_CARDAPIO, dados, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.data.erro) {
        fetchItens();
        cancelarEdicao();
      }
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
    }
  };
  

  const salvarNovoItem = async () => {

    if (!novoItem.titulo || !novoItem.descricao || !novoItem.preco || !novoItem.categoria) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
  
    if (novoItem.categoria === 'Rodízio') {
      if (!novoItem.rodizioDias) {
        alert('Selecione o dia do rodízio.');
        return;
      }
      const pratosValidos = novoItem.rodizioPratos?.filter(p => p.trim() !== '');
      if (!pratosValidos || pratosValidos.length === 0) {
        alert('Adicione ao menos um prato no rodízio.');
        return;
      }
    }

    if (!imagemValida) return;
    try {
      const formData = new FormData();
      if (novoItem.categoria === 'Rodízio') {
        const pratosValidos = (novoItem.rodizioPratos || []).filter(p => p.trim() !== '');
        formData.append('rodizioDias', novoItem.rodizioDias || '');
        formData.append('rodizioPratos', JSON.stringify(pratosValidos));
      }
      Object.entries(novoItem).forEach(([key, value]) => {
        if (key !== 'rodizioDias' && key !== 'rodizioPratos') {
          formData.append(key, value);
        }
      });
    
      if (novoItem.imagem) formData.append('imagem', novoItem.imagem);
      const res = await axios.post(URL_CARDAPIO, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (!res.data.erro) {
        fetchItens();
        setNovoItemAtivo(false);
        setNovoItem({ titulo: '', descricao: '', preco: '', categoria: '', dia: '', ativo: true, imagem: null });
        setPreviewImagem(null);
      }
      console.log(res.data);
    } catch (error) {
      console.error('Erro ao salvar novo item:', error);
    }
   
  };
  const excluirItem = async () => {
    try {
      const res = await axios.delete(URL_CARDAPIO, {
        data: { id: confirmarExclusaoId }
      });
  
      if (!res.data.erro) {
        fetchItens();
        setConfirmarExclusaoId(null);
        setItemParaExcluir(null);
        setModalAberto(false);
      } else {
        setToast({ msg: res.data.mensagem || 'Erro ao excluir.', tipo: 'error' });
      }
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      setToast({ msg: 'Erro ao excluir item.', tipo: 'error' });
    }
  };
  


  const confirmarExclusao = (id, titulo) => {
    setConfirmarExclusaoId(id);
    setItemParaExcluir(titulo);
    setModalAberto(true);
  };

  const handleImagemEdicao = (e) => { validarImagem(e, setEdicaoImagem, setPreviewImagemEdicao); };
  const handleImagemNovoItem = (e) => { validarImagem(e, (file) => setNovoItem({ ...novoItem, imagem: file }), setPreviewImagem); };

  const validarImagem = (e, setImagemFunc, setPreviewFunc) => {
    const file = e.target.files[0];
    if (file) {
      const tiposPermitidos = ['image/jpeg', 'image/png'];
      const tamanhoMaximo = 2 * 1024 * 1024;
      if (!tiposPermitidos.includes(file.type)) {
        setErroImagem('Por favor, selecione uma imagem JPG ou PNG.');
        setImagemValida(false);
        limparErroDepois();
        return;
      }
      if (file.size > tamanhoMaximo) {
        setErroImagem('A imagem deve ter no máximo 2MB.');
        setImagemValida(false);
        limparErroDepois();
        return;
      }
      setImagemValida(true);
      setErroImagem('');
      setImagemFunc(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewFunc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const limparErroDepois = () => {
    setTimeout(() => {
      setErroImagem('');
    }, 5000);
  };

  return (
    <div className="flex min-h-screen">
<Sidebar />
   
      <div className="min-h-screen p-4 bg-gray-50">
    <button
  onClick={async () => {
    try {
      await axios.get('https://congolinaria.com.br/api/logout.php', {
        withCredentials: true
      });
      window.location.href = '/login'; // redireciona para a página de login
    } catch (error) {
      alert('Erro ao fazer logout');
    }
  }}
  className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 fixed top-4 right-4 z-50"
>
  Sair
</button>
        {toast && (
          <div className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white z-50 ${toast.tipo === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            {toast.msg}
          </div>
        )}
    
      <div className="flex justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setNovoItemAtivo(!novoItemAtivo)}
          className={`${novoItemAtivo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded flex items-center gap-2`}
        >
          <PlusCircle size={18} /> {novoItemAtivo ? 'Cancelar Novo Item' : 'Novo Item'}
        </motion.button>
      </div>
      
      <main className="flex-1 p-4">
        <section className="mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Administração do Cardápio</h1>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-2">
  <input placeholder="Título" value={novoItem.titulo} onChange={e => setNovoItem({ ...novoItem, titulo: e.target.value })} className="border p-1 rounded" />
  <input placeholder="Descrição" value={novoItem.descricao} onChange={e => setNovoItem({ ...novoItem, descricao: e.target.value })} className="border p-1 rounded" />
  <input placeholder="Preço" type="number" value={novoItem.preco} onChange={e => setNovoItem({ ...novoItem, preco: e.target.value })} className="border p-1 rounded" />

  {/* Categoria (select) */}
  <select
    value={novoItem.categoria}
    onChange={(e) => setNovoItem({ ...novoItem, categoria: e.target.value })}
    className="border p-1 rounded"
  >
    <option value="">Selecione Categoria</option>
    <option value="Entradas">Entradas</option>
    <option value="Pratos Principais">Pratos Principais</option>
    <option value="Rodízio">Rodízio</option>
    <option value="Bebidas">Bebidas</option>
    <option value="Sobremesas">Sobremesas</option>
  </select>
  {novoItem.categoria !== 'Rodízio' && (
  <div className="mt-4 flex justify-end">
    <button
      onClick={salvarNovoItem}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
    >
      Salvar Item
    </button>
  </div>
)}
  <input type="checkbox" checked={novoItem.ativo} onChange={e => setNovoItem({ ...novoItem, ativo: e.target.checked })} /> Ativo
  <input type="file" onChange={e => setNovoItem({ ...novoItem, imagem: e.target.files[0] })} />
</div>

{/* Se for Rodízio, mostrar campos específicos */}
{novoItem.categoria === 'Rodízio' && (
  <div className="bg-gray-100 p-3 rounded mb-4">
    <label className="block font-semibold mb-1">Dia da Semana *</label>
    <select
      value={novoItem.rodizioDias}
      onChange={(e) => setNovoItem({ ...novoItem, rodizioDias: e.target.value })}
      className="border p-1 rounded w-full mb-2"
    >
      <option value="">Selecione o dia</option>
      <option value="Terca-feira">Terça-feira</option>
      <option value="Quarta-feira">Quarta-feira</option>
      <option value="Quinta-feira">Quinta-feira</option>
      <option value="Sexta-feira">Sexta-feira</option>
      <option value="Sábado">Sábado</option>
      <option value="Domingo">Domingo</option>
    </select>

    <label className="block font-semibold mb-1 mt-2">Pratos do Rodízio *</label>
    {novoItem.rodizioPratos.map((prato, idx) => (
      <div key={idx} className="flex items-center gap-2 mb-2">
        <input
          value={prato}
          onChange={(e) => {
            const pratosAtualizados = [...novoItem.rodizioPratos];
            pratosAtualizados[idx] = e.target.value;
            setNovoItem({ ...novoItem, rodizioPratos: pratosAtualizados });
          }}
          className="border p-1 rounded flex-1"
          placeholder={`Prato ${idx + 1}`}
        />
        <button
          onClick={() => {
            const pratosAtualizados = novoItem.rodizioPratos.filter((_, i) => i !== idx);
            setNovoItem({ ...novoItem, rodizioPratos: pratosAtualizados });
          }}
          className="text-red-600 font-bold"
        >
          X
        </button>
      </div>
    ))}
    <button
      onClick={() => setNovoItem({ ...novoItem, rodizioPratos: [...novoItem.rodizioPratos, ''] })}
      className="bg-green-500 text-white px-3 py-1 rounded"
    >
      + Adicionar Prato
    </button>
   

    {/* BOTÃO DE SALVAR DEDICADO PARA RODÍZIO */}
    <div className="mt-4 flex justify-end">
      <button
        onClick={salvarNovoItem}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
      >
        Salvar Rodízio
      </button>
    </div>
  </div>
)}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">Título</th>
                  <th className="py-3 px-4 text-left">Descrição</th>
                  <th className="py-3 px-4 text-left">Preço</th>
                  <th className="py-3 px-4 text-left">Categoria</th>
                  <th className="py-3 px-4 text-left">Dia</th>
                  <th className="py-3 px-4 text-left">Ativo</th>
                  <th className="py-3 px-4 text-left">Imagem</th>
                  <th className="py-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
              {itens.map((item) => (
  <React.Fragment key={item.id}>
    {modoEdicaoId === item.id ? (
      <>
        <tr className="border-b bg-yellow-50">
          <td className="py-3 px-4">
            <input value={edicoes.titulo} onChange={(e) => setEdicoes({ ...edicoes, titulo: e.target.value })} className="border p-1 rounded w-full" />
          </td>
          <td className="py-3 px-4">
            <input value={edicoes.descricao} onChange={(e) => setEdicoes({ ...edicoes, descricao: e.target.value })} className="border p-1 rounded w-full" />
          </td>
          <td className="py-3 px-4">
            <input type="number" value={edicoes.preco} onChange={(e) => setEdicoes({ ...edicoes, preco: e.target.value })} className="border p-1 rounded w-full" />
          </td>
          <td className="py-3 px-4">
            <select value={edicoes.categoria} onChange={(e) => setEdicoes({ ...edicoes, categoria: e.target.value })} className="border p-1 rounded w-full">
              <option value="">Selecione</option>
              <option value="Entradas">Entradas</option>
              <option value="Pratos principais">Pratos principais</option>
              <option value="Sobremesas">Sobremesas</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Rodízio">Rodízio</option>
            </select>
          </td>
          <td className="py-3 px-4">
            <select value={edicoes.dia} onChange={(e) => setEdicoes({ ...edicoes, dia: e.target.value })} className="border p-1 rounded w-full">
              <option value="">Selecione</option>
              <option value="segunda">Segunda-feira</option>
              <option value="terca">Terça-feira</option>
              <option value="quarta">Quarta-feira</option>
              <option value="quinta">Quinta-feira</option>
              <option value="sexta">Sexta-feira</option>
              <option value="sabado">Sábado</option>
              <option value="domingo">Domingo</option>
              <option value="todos">Todos os dias</option>
            </select>
          </td>
          <td className="py-3 px-4 text-center">
            <input type="checkbox" checked={edicoes.ativo} onChange={(e) => setEdicoes({ ...edicoes, ativo: e.target.checked })} />
          </td>
          <td className="py-3 px-4">
            <input type="file" onChange={handleImagemEdicao} className="text-xs" />
            {previewImagemEdicao && <img src={previewImagemEdicao} alt="preview" className="h-10 mt-1" />}
          </td>
          <td className="py-3 px-4 flex gap-2 justify-center">
            <button onClick={salvarEdicao} className="text-green-600 hover:text-green-800"><CheckCircle size={16} /></button>
            <button onClick={cancelarEdicao} className="text-red-600 hover:text-red-800"><XCircle size={16} /></button>
          </td>
        </tr>

        {edicoes.categoria === 'Rodízio' && (
          <tr className="bg-yellow-100">
            <td colSpan={9} className="p-4">
              <div className="mb-3">
                <label className="block font-semibold text-yellow-800 mb-1">Dia do Rodízio</label>
                <select
                  value={edicoes.rodizioDias || ''}
                  onChange={(e) => setEdicoes({ ...edicoes, rodizioDias: e.target.value })}
                  className="border p-1 rounded w-full"
                >
                  <option value="">Selecione</option>
                  <option value="Quarta-feira">Quarta-feira</option>
                  <option value="Quinta-feira">Quinta-feira</option>
                  <option value="Sábado">Sábado</option>
                  <option value="Domingo">Domingo</option>
                </select>
              </div>

              <label className="block font-semibold text-yellow-800 mb-1">Pratos do Rodízio</label>
              {(Array.isArray(edicoes.rodizioPratos) ? edicoes.rodizioPratos : JSON.parse(edicoes.rodizioPratos || '[]')).map((prato, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    value={prato}
                    onChange={(e) => {
                      const novos = [...JSON.parse(edicoes.rodizioPratos || '[]')];
                      novos[idx] = e.target.value;
                      setEdicoes({ ...edicoes, rodizioPratos: JSON.stringify(novos) });
                    }}
                    className="border p-1 rounded flex-1"
                  />
                  <button
                    onClick={() => {
                      const novos = [...JSON.parse(edicoes.rodizioPratos || '[]')];
                      novos.splice(idx, 1);
                      setEdicoes({ ...edicoes, rodizioPratos: JSON.stringify(novos) });
                    }}
                    className="text-red-600 font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const novos = [...JSON.parse(edicoes.rodizioPratos || '[]'), ''];
                  setEdicoes({ ...edicoes, rodizioPratos: JSON.stringify(novos) });
                }}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm mt-2"
              >
                + Adicionar Prato
              </button>
            </td>
          </tr>
        )}
      </>
    ) : (
      <tr className="border-b hover:bg-gray-50">
        <td className="py-3 px-4">{item.titulo}</td>
        <td className="py-3 px-4">{item.descricao}</td>
        <td className="py-3 px-4">R$ {parseFloat(item.preco).toFixed(2)}</td>
        <td className="py-3 px-4">{item.categoria}</td>
        <td className="py-3 px-4">{item.dia}</td>
        <td className="py-3 px-4 text-center">{item.ativo ? 'Sim' : 'Não'}</td>
        <td className="py-3 px-4">{item.imagem ? <img src={`https://congolinaria.com.br/${item.imagem}`} alt="Imagem" className="h-10 w-10 object-cover rounded" /> : <span className="text-gray-400">Sem imagem</span>}</td>
        <td className="py-3 px-4 text-center flex gap-2 justify-center">
          <button onClick={() => iniciarEdicao(item)} className="text-green-600 hover:text-green-800"><Pencil size={16} /></button>
          <button onClick={() => confirmarExclusao(item.id, item.titulo)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
        </td>
      </tr>
    )}
  </React.Fragment>
))}

              </tbody>
            </table>
          </div>
        </section>

        <Dialog open={modalAberto} onClose={() => setModalAberto(false)} className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
  <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-sm mx-auto relative z-50">
    <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
    <p className="mb-6">
      Tem certeza que deseja excluir <span className="font-semibold">{itemParaExcluir}</span>?
    </p>
    <div className="flex justify-end gap-4">
      <button
        onClick={() => setModalAberto(false)}
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Cancelar
      </button>
      <button
        onClick={excluirItem}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Excluir
      </button>
    </div>
  </div>
</Dialog>


      </main>
    </div>
    </div>
  );
}
