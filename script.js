// Datas dos eventos (ajuste conforme pedido)
const namoroInicio = new Date('2024-08-10T00:00:00');
const noivadoInicio = new Date('2025-06-10T00:00:00');
const casamentoData = new Date('2026-04-25T00:00:00');

const audioClick = document.getElementById('audioClick');

function formatTimeDiff(diffMs) {
  let totalSeconds = Math.floor(diffMs / 1000);
  let seconds = totalSeconds % 60;
  let totalMinutes = Math.floor(totalSeconds / 60);
  let minutes = totalMinutes % 60;
  let totalHours = Math.floor(totalMinutes / 60);
  let hours = totalHours % 24;
  let days = Math.floor(totalHours / 24);

  return `${days} dia${days !== 1 ? 's' : ''}, ${hours} hora${hours !== 1 ? 's' : ''}, ` +
         `${minutes} minuto${minutes !== 1 ? 's' : ''}, ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
}

function atualizarContadores() {
  const agora = new Date();

  // Namoro
  let diffNamoro = agora - namoroInicio;
  document.getElementById('namoro').textContent = diffNamoro > 0 ? formatTimeDiff(diffNamoro) : 'Ainda não começou';

  // Noivado
  let diffNoivado = agora - noivadoInicio;
  document.getElementById('noivado').textContent = diffNoivado > 0 ? formatTimeDiff(diffNoivado) : 'Ainda não começou';

  // Casamento - contagem regressiva ou tempo desde o casamento
  let diffCasamento = casamentoData - agora;
  if (diffCasamento > 0) {
    document.getElementById('casamento').textContent = formatTimeDiff(diffCasamento);
    document.getElementById('casados').style.display = 'none';
    document.getElementById('casamento-bloco').style.display = 'block';
  } else {
    let diffCasados = agora - casamentoData;
    document.getElementById('tempoCasados').textContent = formatTimeDiff(diffCasados);
    document.getElementById('casados').style.display = 'block';
    document.getElementById('casamento-bloco').style.display = 'none';
  }
}

function tocarSom() {
  if (audioClick) {
    audioClick.currentTime = 0;
    audioClick.play();
  }
}

function criarCoracao() {
  const container = document.querySelector('.coracoes-container');
  if (!container) return;

  const coracao = document.createElement('div');
  coracao.classList.add('coracao');

  coracao.style.left = Math.random() * 100 + 'vw';
  coracao.style.animationDuration = (4 + Math.random() * 3) + 's';
  coracao.style.opacity = Math.random();

  container.appendChild(coracao);

  setTimeout(() => {
    coracao.remove();
  }, 7000);
}

function initCoracoes() {
  setInterval(criarCoracao, 500);
}

// Destaca link ativo baseado na URL (útil em navegação entre páginas)
function destacarLinkAtivo() {
  const links = document.querySelectorAll('.menu-lateral a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarContadores();
  initCoracoes();
  destacarLinkAtivo();

  // Atualiza contadores a cada segundo para tempo real
  setInterval(atualizarContadores, 1000);

  // Som ao clicar nos links do menu
  const linksMenu = document.querySelectorAll('.menu-lateral a');
  linksMenu.forEach(link => {
    link.addEventListener('click', () => {
      tocarSom();
      // Navegação padrão já funciona se href for uma página real
      // Aqui não precisamos manipular o evento para não bloquear a navegação
    });
  });
});
