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

function atualizarContadores() {
  const namoroInicio = new Date('2024-08-10');
  const noivadoInicio = new Date('2025-06-10');
  const casamentoData = new Date('2026-04-25');
  const agora = new Date();

  const diffNamoro = agora - namoroInicio;
  const diffNoivado = agora - noivadoInicio;
  const diffCasamento = casamentoData - agora;

  if (document.getElementById('namoro'))
    document.getElementById('namoro').textContent = formatTimeDiff(diffNamoro);

  if (document.getElementById('noivado'))
    document.getElementById('noivado').textContent = formatTimeDiff(diffNoivado);

  if (diffCasamento > 0) {
    if (document.getElementById('casamento'))
      document.getElementById('casamento').textContent = formatTimeDiff(diffCasamento);
    document.getElementById('casamento-bloco').style.display = 'block';
    document.getElementById('casados').style.display = 'none';
  } else {
    const diffCasados = agora - casamentoData;
    if (document.getElementById('tempoCasados'))
      document.getElementById('tempoCasados').textContent = formatTimeDiff(diffCasados);
    document.getElementById('casamento-bloco').style.display = 'none';
    document.getElementById('casados').style.display = 'block';
  }
}

function atualizarHorario() {
  const agora = new Date();
  const horario = agora.toLocaleTimeString('pt-BR', { hour12: false });
  const span = document.getElementById('horarioAtual');
  if (span) span.textContent = horario;
}

document.addEventListener('DOMContentLoaded', () => {
  const som = document.getElementById('clickSound');
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (som) {
        som.currentTime = 0;
        som.play();
      }
    });
  });

  atualizarContadores();
  atualizarHorario();

  setInterval(atualizarContadores, 60000);
  setInterval(atualizarHorario, 1000);
});
