export function quebrarTextoZPL(texto, maxChars = 40) {
  if (!texto) return [];
  const palavras = texto.split(" ");
  const linhas = [];
  let linha = "";

  palavras.forEach(palavra => {
    if ((linha + palavra).length <= maxChars) {
      linha += palavra + " ";
    } else {
      linhas.push(linha.trim());
      linha = palavra + " ";
    }
  });

  if (linha) linhas.push(linha.trim());
  return linhas;
}
