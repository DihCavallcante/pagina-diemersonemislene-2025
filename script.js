// Formata diferença de datas para texto legível
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

// Atualiza os contadores de tempo
function atualizarContadores() {
  const namoroInicio = new Date('2024-08-10');    // Data do início do namoro
  const noivadoInicio = new Date('2025-06-10');   // Data do noivado
  const casamentoData = new Date('2026-04-25');   // Data do casamento

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
    document.getElementById('casamento-bloco').style.display = 'block';
    document.getElementById('casados').style.display = 'none';
  } else {
    // Se já casados
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

document.addEventListener('DOMContentLoaded', () => {
  atualizarContadores();
  atualizarHorario();

  setInterval(atualizarHorario, 1000);
  setInterval(atualizarContadores, 60000);
});
