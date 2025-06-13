// Função para formatar diferença de datas em anos, meses, dias, etc.
function formatTimeDiff(diffMs) {
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} ano${years > 1 ? 's' : ''}`;
  if (months > 0) return `${months} mês${months > 1 ? 'es' : ''}`;
  if (days > 0) return `${days} dia${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  return `${seconds} segundo${seconds > 1 ? 's' : ''}`;
}

// Atualiza contadores de tempo
function atualizarContadores() {
  const namoroInicio = new Date('2021-06-13');    // Data do início do namoro
  const noivadoInicio = new Date('2024-01-20');   // Data do noivado
  const casamentoData = new Date('2025-12-15');   // Data do casamento

  const agora = new Date();

  // Tempo juntos (namoro)
  const diffNamoro = agora - namoroInicio;
  document.getElementById('namoro').textContent = formatTimeDiff(diffNamoro);

  // Tempo de noivado
  const diffNoivado = agora - noivadoInicio;
  document.getElementById('noivado').textContent = formatTimeDiff(diffNoivado);

  // Tempo para casamento
  const diffCasamento = casamentoData - agora;
  if (diffCasamento > 0) {
    document.getElementById('casamento').textContent = formatTimeDiff(diffCasamento);
    // Mostrar o bloco de contagem regressiva e esconder o "casados"
    document.getElementById('casamento-bloco').style.display = 'block';
    document.getElementById('casados').style.display = 'none';
  } else {
    // Já casados, mostrar o tempo de casamento e esconder o contador regressivo
    const diffCasados = agora - casamentoData;
    document.getElementById('tempoCasados').textContent = formatTimeDiff(diffCasados);
    document.getElementById('casamento-bloco').style.display = 'none';
    document.getElementById('casados').style.display = 'block';
  }
}

// Atualiza horário atual no rodapé
function atualizarHorario() {
  const agora = new Date();
  const horarioFormatado = agora.toLocaleTimeString('pt-BR', { hour12: false });
  document.getElementById('horarioAtual').textContent = horarioFormatado;
}

// Destaca o link ativo no menu de acordo com a seção visível
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

  // Atualiza contadores a cada minuto (não precisa tão rápido)
  setInterval(atualizarContadores, 60000);

  // Atualiza link ativo ao rolar a página
  window.addEventListener('scroll', atualizarLinkAtivo);

  // Botão voltar ao início
const btnVoltarInicio = document.getElementById('btn-voltar-inicio');

btnVoltarInicio.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
