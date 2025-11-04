import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContadorVisitas = () => {
  const [contador, setContador] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    axios
      .get('https://congolinaria.com.br/contador_visitas.php')
      .then(res => {
        setContador(res.data);
      })
      .catch(err => {
        console.error('Erro ao buscar contador:', err);
        setErro(true);
      });
  }, []);

  return (
    <div className="text-sm text-gray-700 mt-2 font-semibold">
      {erro
        ? 'Erro ao carregar visitantes.'
        : contador
        ? `Total de visitantes únicos: ${contador}`
        : 'Carregando visitantes...'}
    </div>
  );
};

export default ContadorVisitas;
