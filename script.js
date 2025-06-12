const namoro = new Date('2024-08-10T00:00:00');
const noivado = new Date('2025-06-10T00:00:00');
const casamento = new Date('2026-04-25T00:00:00');

function calcularDiferencaPassado(inicio) {
  const agora = new Date();
  let diff = agora - inicio; // diferença em ms (passado)

  if (diff < 0) diff = 0; // para evitar números negativos se data no futuro

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= dias * (1000 * 60 * 60 * 24);

  const horas = Math.floor(diff / (1000 * 60 * 60));
  diff -= horas * (1000 * 60 * 60);

  const minutos = Math.floor(diff / (1000 * 60));
  diff -= minutos * (1000 * 60);

  const segundos = Math.floor(diff / 1000);

  return `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
}

function calcularDiferencaFuturo(futuro) {
  const agora = new Date();
  let diff = futuro - agora; // diferença em ms (futuro)

  if (diff < 0) diff = 0;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= dias * (1000 * 60 * 60 * 24);

  const horas = Math.floor(diff / (1000 * 60 * 60));
  diff -= horas * (1000 * 60 * 60);

  const minutos = Math.floor(diff / (1000 * 60));
  diff -= minutos * (1000 * 60);

  const segundos = Math.floor(diff / 1000);

  return `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
}

function atualizarContagem() {
  const agora = new Date();

  const namoroSpan = document.getElementById("namoro");
  const noivadoSpan = document.getElementById("noivado");
  const casamentoSpan = document.getElementById("casamento");
  const casadosDiv = document.getElementById("casados");
  const tempoCasadosSpan = document.getElementById("tempoCasados");
  const casamentoBloco = document.getElementById("casamento-bloco");

  if (namoroSpan) namoroSpan.textContent = calcularDiferencaPassado(namoro);
  if (noivadoSpan) noivadoSpan.textContent = calcularDiferencaPassado(noivado);

  if (agora < casamento) {
    if (casamentoSpan) casamentoSpan.textContent = calcularDiferencaFuturo(casamento);
    if (casadosDiv) casadosDiv.style.display = 'none';
    if (casamentoBloco) casamentoBloco.style.display = 'block';
  } else {
    if (casamentoSpan) casamentoSpan.textContent = `Nos casamos em ${casamento.toLocaleDateString('pt-BR')} 💒`;
    if (tempoCasadosSpan) tempoCasadosSpan.textContent = calcularDiferencaPassado(casamento);
    if (casadosDiv) casadosDiv.style.display = 'block';
    if (casamentoBloco) casamentoBloco.style.display = 'none';
  }
}

function atualizarHorario() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');

  const horarioSpan = document.getElementById('horarioAtual');
  if (horarioSpan) horarioSpan.textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(() => {
  atualizarContagem();
  atualizarHorario();
}, 1000);

window.onload = () => {
  atualizarContagem();
  atualizarHorario();
};
