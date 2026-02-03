import { quebrarTextoZPL } from "./quebraTexto";

export function gerarZPL(item) {
  const ingredientes = quebrarTextoZPL(item.ingredientes, 42);
  const preparo = quebrarTextoZPL(item.modo_preparo, 42);

  let y = 60;
  let zpl = `
^XA
^PW800
^LL400
^CI28
^CF0,28
^FO20,20^FD${item.nome}^FS
`;

  zpl += `
^CF0,20
^FO20,${y}^FDIngredientes:^FS
`;
  y += 24;

  ingredientes.forEach(linha => {
    zpl += `^FO20,${y}^FD${linha}^FS\n`;
    y += 20;
  });

  y += 10;
  zpl += `
^FO20,${y}^FDModo de preparo:^FS
`;
  y += 24;

  preparo.forEach(linha => {
    zpl += `^FO20,${y}^FD${linha}^FS\n`;
    y += 20;
  });

  zpl += `
^CF0,20
^FO20,${y + 10}^FDVal: ${item.validade}^FS
^FO300,${y + 10}^FDLote: ${item.id}^FS

^FO620,40
^BQN,2,6
^FDLA,https://congolinaria.com.br/produto/${item.id}^FS

^XZ
`;

  return zpl;
}
