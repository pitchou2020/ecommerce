export default function EtiquetaMarmita100x50({ marmita }) {
  return (
    <div
      className="
        w-[100mm] h-[50mm]
        p-[4mm]
        border border-black
        font-sans text-[8px] leading-tight
        flex flex-col justify-between
        print:break-after-page
      "
    >
      {/* TÍTULO */}
      <div className="text-[10px] font-bold uppercase">
        {marmita.nome}
      </div>

      {/* PESO / LOTE */}
      <div>
        Peso: {marmita.peso}g | Lote: {marmita.lote}
      </div>

      {/* DATAS */}
      <div>
        Fab: {marmita.fabricacao} | Val: {marmita.validade}
      </div>

      {/* ALERTA */}
      <div className="font-bold text-center">
        Manter congelado a -18 °C
      </div>

      {/* PREPARO */}
      <div className="text-[7.5px]">
        Preparo: {marmita.preparo}
      </div>

      {/* ALÉRGENOS */}
      <div className="text-[7px] font-bold">
        CONTÉM: {marmita.alergenos}<br />
        {marmita.gluten}
      </div>
    </div>
  );
}
