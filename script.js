// Datas importantes
const datingDate = new Date("2024-08-10T00:00:00");
const engagementDate = new Date("2025-06-10T00:00:00");
const weddingDate = new Date("2026-04-25T00:00:00");

// Função para calcular tempo detalhado
function getTimeDiff(from, to) {
  let diff = Math.abs(to - from) / 1000;
  const years = Math.floor(diff / (365.25 * 24 * 3600));
  diff -= years * 365.25 * 24 * 3600;
  const months = Math.floor(diff / (30.44 * 24 * 3600));
  diff -= months * 30.44 * 24 * 3600;
  const days = Math.floor(diff / (24 * 3600));
  diff -= days * 24 * 3600;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = Math.floor(diff % 60);

  return { years, months, days, hours, minutes, seconds };
}

function formatTimeDiff({ years, months, days, hours, minutes, seconds }) {
  return `${years}a ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Atualiza os contadores e exibe a hora
function updateCounters() {
  const today = new Date();

  // Relacionamento
  const sinceDating = getTimeDiff(datingDate, today);
  document.getElementById("sinceDating").textContent = `💖 Estamos juntos há: ${formatTimeDiff(sinceDating)}`;

  // Noivado
  if (today < engagementDate) {
    const toEngagement = getTimeDiff(today, engagementDate);
    document.getElementById("countdownToEngagement").textContent = `💍 Faltam: ${formatTimeDiff(toEngagement)} para o noivado!`;
    document.getElementById("sinceEngagement").textContent = "💑 Ainda não estamos noivos, mas o dia está chegando!";
  } else {
    const sinceEngagement = getTimeDiff(engagementDate, today);
    document.getElementById("countdownToEngagement").textContent = "💍 Já estamos noivos!";
    document.getElementById("sinceEngagement").textContent = `💑 Estamos noivos há: ${formatTimeDiff(sinceEngagement)}`;
  }

  // Casamento
  if (today < weddingDate) {
    const toWedding = getTimeDiff(today, weddingDate);
    document.getElementById("countdownToWedding").textContent = `💒 Faltam: ${formatTimeDiff(toWedding)} para o casamento!`;
    document.getElementById("sinceWedding").textContent = "🎉 Ainda não casamos, mas está pertinho!";
  } else {
    const sinceWedding = getTimeDiff(weddingDate, today);
    document.getElementById("countdownToWedding").textContent = "💒 Já somos casados!";
    document.getElementById("sinceWedding").textContent = `🎉 Estamos casados há: ${formatTimeDiff(sinceWedding)}`;
  }

  // Hora atual
  const horaAgora = today.toLocaleTimeString("pt-BR");
  document.getElementById("horaAtual").textContent = `🕒 Agora são: ${horaAgora}`;
}

// Atualiza os contadores a cada segundo
setInterval(updateCounters, 1000);
updateCounters();
