const namoro = new Date('2024-08-10T00:00:00');
const noivado = new Date('2025-06-10T00:00:00');
const casamento = new Date('2026-04-25T00:00:00');

// Função para calcular tempo passado (dias, horas, minutos, segundos) desde a data inicial
function calcularTempoPassado(inicio) {
  const agora = new Date();

  // Zerando horas, minutos e segundos para dias completos
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const inicioDia = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());

  const diffDiasMs = hoje - inicioDia; // só dias em ms
  const dias = Math.floor(diffDiasMs / (1000 * 60 * 60 * 24));

  // Tempo do dia atual em segundos
  const segundosHoje = (agora.getHours() * 3600) + (agora.getMinutes() * 60) + agora.getSeconds();
  const horas = Math.floor(segundosHoje / 3600);
  const minutos = Math.floor((segundosHoje % 3600) / 60);
  const segundos = segundosHoje % 60;

  return `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
}

// Função para calcular contagem regressiva até uma data futura
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

  // "Estamos juntos há" - tempo passado
  document.getElementById("namoro").textContent = calcularTempoPassado(namoro);

  // "Noivamos há" - tempo passado
  document.getElementById("noivado").textContent = calcularTempoPassado(noivado);

  // Casamento
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

// Atualiza a cada segundo
setInterval(() => {
  atualizarContagem();
  atualizarHorario();
}, 1000);

// Atualiza na carga da página
atualizarContagem();
atualizarHorario();
