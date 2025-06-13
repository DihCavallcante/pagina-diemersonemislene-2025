// Formata diferença de tempo com dias, horas, minutos e segundos
function formatTimeDiffCompleta(diffMs) {
  const totalSeconds = Math.floor(diffMs / 1000);

  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Atualiza contadores de tempo
function atualizarContadores() {
  const namoroInicio = new Date('2024-08-10T00:00:00');
  const noivadoInicio = new Date('2025-06-10T00:00:00');
  const casamentoData = new Date('2026-04-25T00:00:00');
  const agora = new Date();

  // Namoro
  const diffNamoro = agora - namoroInicio;
  const spanNamoro = document.getElementById('namoro');
  if (spanNamoro) spanNamoro.textContent = formatTimeDiffCompleta(diffNamoro);

  // Noivado
  const diffNoivado = agora - noivadoInicio;
  const spanNoivado = document.getElementById('noivado');
  if (spanNoivado) spanNoivado.textContent = formatTimeDiffCompleta(diffNoivado);

  // Casamento
  const diffCasamento = casamentoData - agora;
  const spanCasamento = document.getElementById('casamento');
  const blocoCasamento = document.getElementById('casamento-bloco');
  const blocoCasados = document.getElementById('casados');
  const spanCasados = document.getElementById('tempoCasados');

  if (diffCasamento > 0) {
    if (spanCasamento) spanCasamento.textContent = formatTimeDiffCompleta(diffCasamento);
    if (blocoCasamento) blocoCasamento.style.display = 'block';
    if (blocoCasados) blocoCasados.style.display = 'none';
  } else {
    const diffCasados = agora - casamentoData;
    if (spanCasados) spanCasados.textContent = formatTimeDiffCompleta(diffCasados);
    if (blocoCasamento) blocoCasamento.style.display = 'none';
    if (blocoCasados) blocoCasados.style.display = 'block';
  }
}

// Atualiza horário atual no rodapé
function atualizarHorario() {
  const agora = new Date();
  const horarioFormatado = agora.toLocaleTimeString('pt-BR', { hour12: false });
  document.getElementById('horarioAtual').textContent = horarioFormatado;
}

// Destaca link ativo conforme rolagem
function atualizarLinkAtivo() {
  const links = document.querySelectorAll('.menu-lateral a');
  let indiceAtivo = -1;

  links.forEach((link, i) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const secao = document.querySelector(href);
      if (secao) {
        const rect = secao.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 4) {
          indiceAtivo = i;
        }
      }
    }
  });

  links.forEach((link, i) => {
    if (i === indiceAtivo) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Inicialização e intervalos
document.addEventListener('DOMContentLoaded', () => {
  atualizarContadores();
  atualizarHorario();
  atualizarLinkAtivo();

  // Atualiza horário a cada segundo
  setInterval(atualizarHorario, 1000);

  // Atualiza contadores a cada segundo também
  setInterval(atualizarContadores, 1000);

  // Atualiza link ativo ao rolar a página
  window.addEventListener('scroll', atualizarLinkAtivo);
});
