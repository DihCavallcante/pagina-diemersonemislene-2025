const namoro = new Date('2024-08-10T00:00:00');
const noivado = new Date('2025-06-10T00:00:00');
const casamento = new Date('2026-04-25T00:00:00');

// Calcula o tempo passado desde a data inicial (contagem crescente)
function calcularTempoPassado(inicio) {
  const agora = new Date();

  // Datas com horas zeradas para contar dias completos
  const inicioZeroHora = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
  const agoraZeroHora = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());

  const diffDiasMs = agoraZeroHora - inicioZeroHora;
  const dias = Math.floor(diffDiasMs / (1000 * 60 * 60 * 24));

  // Horas, minutos e segundos do dia atual
  const horas = agora.getHours();
  const minutos = agora.getMinutes();
  const segundos = agora.getSeconds();

  return `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
}

// Calcula o tempo regressivo até a data futura (contagem regressiva)
function calcularRegressiva(futuro) {
  const agora = new Date();

  let diff = futuro - agora;
  if (diff < 0) return "0 dias 0h 0m 0s";

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

  // Tempo passado para namoro e noivado
  document.getElementById("namoro").textContent = calcularTempoPassado(namoro);
  document.getElementById("noivado").textContent = calcularTempoPassado(noivado);

  // Contagem regressiva para casamento
  const casamentoElemento = document.getElementById("casamento");
  const casadosElemento = document.getElementById("casados");
  const tempoCasadosSpan = document.getElementById("tempoCasados");

  if (agora < casamento) {
    casamentoElemento.textContent = calcularRegressiva(casamento);
    casadosElemento.style.display = 'none';
    document.getElementById("casamento-bloco").style.display = 'block';
  } else {
    casamentoElemento.textContent = `Nos casamos em ${casamento.toLocaleDateString('pt-BR')} 💒`;
    tempoCasadosSpan.textContent = calcularTempoPassado(casamento);
    casadosElemento.style.display = 'block';
    document.getElementById("casamento-bloco").style.display = 'none';
  }
}

// Atualiza o horário atual formatado hh:mm:ss
function atualizarHorario() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');

  document.getElementById('horarioAtual').textContent = `${horas}:${minutos}:${segundos}`;
}

// Atualiza tudo a cada segundo
setInterval(() => {
  atualizarContagem();
  atualizarHorario();
}, 1000);

// Atualiza na carga da página
atualizarContagem();
atualizarHorario();
