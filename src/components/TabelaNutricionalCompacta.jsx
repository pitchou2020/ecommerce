function TabelaNutricionalCompacta({ dados }) {
  return (
    <div className="w-[100mm] p-[4mm] text-[7px] font-sans">
      <h3 className="font-bold text-[8px] mb-1">
        INFORMAÇÃO NUTRICIONAL
      </h3>

      <p className="mb-1">Porção: {dados.porcao} g</p>

      <table className="w-full border border-black border-collapse">
        <tbody>
          <tr className="border-b border-black">
            <td>Valor energético</td>
            <td className="text-right">{dados.energia} kcal</td>
          </tr>
          <tr className="border-b border-black">
            <td>Carboidratos</td>
            <td className="text-right">{dados.carbo} g</td>
          </tr>
          <tr className="border-b border-black">
            <td>Proteínas</td>
            <td className="text-right">{dados.proteina} g</td>
          </tr>
          <tr className="border-b border-black">
            <td>Gorduras totais</td>
            <td className="text-right">{dados.gordura} g</td>
          </tr>
          <tr>
            <td>Sódio</td>
            <td className="text-right">{dados.sodio} mg</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
