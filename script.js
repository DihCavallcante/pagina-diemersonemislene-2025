// Função para formatar o tempo real
function formatTime(diffMs) {
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Datas
const namoroInicio = new Date('2024-08-10T00:00:00');
const noivadoInicio = new Date('2025-06-10T00:00:00');
const casamentoData = new Date('2026-04-25T00:00:00');

// Atualiza contadores
function atualizarContadores() {
  const agora = new Date();

  // Namoro
  document.getElementById('namoro').textContent = formatTime(agora - namoroInicio);

  // Noivado
  document.getElementById('noivado').textContent = formatTime(agora - noivadoInicio);

  // Casamento
  const blocoCasamento = document.getElementById('casamento-bloco');
  const blocoCasados = document.getElementById('casados');
  const casamento = document.getElementById('casamento');
  const tempoCasados = document.getElementById('tempoCasados');

  if (agora < casamentoData) {
    casamento.textContent = formatTime(casamentoData - agora);
    blocoCasamento.style.display = 'block';
    blocoCasados.style.display = 'none';
  } else {
    tempoCasados.textContent = formatTime(agora - casamentoData);
    blocoCasamento.style.display = 'none';
    blocoCasados.style.display = 'block';
  }
}

// Horário no rodapé
function atualizarHorario() {
  const agora = new Date();
  document.getElementById('horarioAtual').textContent = agora.toLocaleTimeString('pt-BR');
}

// Efeito sonoro
function playClickSound() {
  const audio = document.getElementById('clickSound');
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// Animação de corações
function criarCoracao() {
  const container = document.querySelector('.coracoes-container');
  const coracao = document.createElement('div');
  coracao.className = 'coracao';
  coracao.style.left = Math.random() * 100 + 'vw';
  coracao.style.animationDuration = (2 + Math.random() * 3) + 's';
  container.appendChild(coracao);

  setTimeout(() => coracao.remove(), 5000);
}

setInterval(criarCoracao, 500);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  atualizarContadores();
  atualizarHorario();
  setInterval(atualizarContadores, 1000);
  setInterval(atualizarHorario, 1000);
});
