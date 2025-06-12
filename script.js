const namoro = new Date('2024-08-10');
const noivado = new Date('2025-06-10');
const casamento = new Date('2026-04-25');
const hoje = new Date();

function diasEntre(data1, data2) {
  const dif = data2 - data1;
  return Math.floor(dif / (1000 * 60 * 60 * 24));
}

document.getElementById("namoro").textContent = `Estamos juntos há ${diasEntre(namoro, hoje)} dias desde o início do namoro.`;
document.getElementById("noivado").textContent = `Noivamos há ${diasEntre(noivado, hoje)} dias.`;

const casamentoElemento = document.getElementById("casamento");
const casadosElemento = document.getElementById("casados");

if (hoje < casamento) {
  casamentoElemento.textContent = `Faltam ${diasEntre(hoje, casamento)} dias para o nosso casamento! 💍`;
} else {
  casamentoElemento.textContent = `Nos casamos em ${casamento.toLocaleDateString('pt-BR')} 💒`;
  casadosElemento.textContent = `Estamos casados há ${diasEntre(casamento, hoje)} dias! 🥰`;
  casadosElemento.style.display = 'block';
}
