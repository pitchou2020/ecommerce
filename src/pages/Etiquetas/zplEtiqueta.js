// zplEtiqueta.js
// Versão definitiva: layout ANVISA 100x50mm, QR Code, modo preparo, ingredientes

function escapeZPL(text) {
  if (!text) return "";
  return text.replace(/[\^~]/g, ""); // remove chars que quebram o ZPL
}

function wrapText(text, maxCharsPerLine) {
  if (!text) return "";
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach(word => {
    if ((line + " " + word).trim().length <= maxCharsPerLine) {
      line = (line + " " + word).trim();
    } else {
      lines.push(line);
      line = word;
    }
  });
  if (line) lines.push(line);
  return lines.join("\n");
}

function gerarZPL(item) {
  const largura = 800;  // 100mm em dots (~8 dots/mm)
  const altura = 400;   // 50mm em dots
  const padding = 20;
  const lineHeight = 30; // altura de cada linha
  const qrSize = 180; // tamanho do QR Code em dots

  const maxCharsNome = 30;
  const maxCharsIngredientes = 50;
  const maxCharsModo = 50;

  const escapeZPL = (text) => (text || "").replace(/[^ -~]+/g, ""); // remove caracteres não ASCII

  // função para quebrar texto em linhas
  function wrapText(text, maxChars) {
    if (!text) return "";
    const words = text.split(" ");
    const lines = [];
    let line = "";
    words.forEach(word => {
      if ((line + " " + word).trim().length > maxChars) {
        lines.push(line.trim());
        line = word;
      } else {
        line += " " + word;
      }
    });
    if (line) lines.push(line.trim());
    return lines;
  }

  // Quebra os textos
  const nomeLines = wrapText(escapeZPL(item.nome), maxCharsNome);
  const ingredientesLines = wrapText(escapeZPL(item.ingredientes), maxCharsIngredientes);
  const modoLines = wrapText(escapeZPL(item.modo_preparo), maxCharsModo);

  const validade = escapeZPL(item.validade || "N/A");

  // Calcula a posição do QR automaticamente
  const totalTextLines = nomeLines.length + ingredientesLines.length + modoLines.length + 2; // +2 para validade/lote
  let qrY = padding + totalTextLines * lineHeight + 10; // +10 de spacing
  if (qrY + qrSize > altura) {
    qrY = altura - qrSize - padding; // ajusta para não ultrapassar altura da etiqueta
  }
  const qrX = largura - qrSize - padding;

  // Gera ZPL
  let zpl = `^XA
^PW${largura}
^LL${altura}
^LH0,0
`;

  let currentY = padding;

  // nome
  nomeLines.forEach(line => {
    zpl += `^FO${padding},${currentY}^A0N,40,40${line}^FS\n`;
    currentY += lineHeight;
  });

  // ingredientes
  ingredientesLines.forEach(line => {
    zpl += `^FO${padding},${currentY}^A0N,30,30${line}^FS\n`;
    currentY += lineHeight;
  });

  // modo preparo
  modoLines.forEach(line => {
    zpl += `^FO${padding},${currentY}^A0N,30,30${line}^FS\n`;
    currentY += lineHeight;
  });

  // validade e lote
  zpl += `^FO${padding},${currentY}^A0N,30,30Validade: ${validade} Lote: ${item.id}^FS\n`;

  // QR Code
  const qrValue = `https://congolinaria.com.br/produto/${item.id}`;
  zpl += `^FO${qrX},${qrY}^BQN,2,6^FDLA,${qrValue}^FS\n`;

  zpl += "^XZ";
  return zpl;
}

module.exports = { gerarZPL };
