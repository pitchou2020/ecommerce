import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function VisualizarFichaCop30() {
  const { id } = useParams();
  const [prato, setPrato] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios.get(`https://congolinaria.com.br/api/cardapio_cop30.php?id=${id}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setPrato(res.data[0]);
        } else {
          setErro("Prato não encontrado.");
        }
        setCarregando(false);
      })
      .catch(() => {
        setErro("Erro ao carregar dados do prato.");
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <p className="text-gray-700 text-center mt-10">Carregando...</p>;
  if (erro) return <p className="text-red-600 text-center mt-10">{erro}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ficha Técnica</h1>
      <div className="bg-white shadow-md rounded p-4">
        {prato.imagem && (
          <img
            src={`https://congolinaria.com.br/img_upload/${prato.imagem}`}
            alt={prato.nome_pt}
            className="mb-4 w-full h-auto rounded"
          />
        )}
        <h2 className="text-xl font-semibold mb-2">{prato.nome_pt}</h2>
        <p><strong>Nome em Inglês:</strong> {prato.nome_en}</p>
        <p><strong>Nome em Espanhol:</strong> {prato.nome_es}</p>
        <p><strong>Nome em Francês:</strong> {prato.nome_fr}</p>
        <p className="mt-2"><strong>Categoria:</strong> {prato.categoria}</p>
        <p className="mt-2"><strong>Preço:</strong> R$ {Number(prato.preco).toFixed(2)}</p>
        <p className="mt-4 whitespace-pre-line">{prato.descricao}</p>
        <Link 
          to="/admin/cop30" 
          className="inline-block mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Voltar para o painel
        </Link>
      </div>
    </div>
  );
}
