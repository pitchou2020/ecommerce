import React from 'react';
import InputMask from 'react-input-mask';

export default function FormFinalizar({ nome, telefone, setNome, setTelefone, onFinalizar }) {
  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2 text-yellow-900">Finalize seu pedido</h2>
      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border rounded p-2 w-full mb-2"
      />
      <InputMask
        mask="(99) 99999-9999"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      >
        {(inputProps) => <input {...inputProps} type="text" placeholder="Telefone" className="border rounded p-2 w-full mb-2" />}
      </InputMask>
      <button
        onClick={onFinalizar}
        disabled={!nome || telefone.length < 14}
        className="bg-yellow-800 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        Enviar Pedido
      </button>
    </div>
  );
}
