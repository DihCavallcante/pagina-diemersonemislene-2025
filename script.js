const datingDate = new Date("2024-08-10");
const engagementDate = new Date("2025-06-10");
const weddingDate = new Date("2026-04-25");

function getDaysDiff(from, to) {
  const diffTime = to - from;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function updateCounters() {
  const today = new Date();

  const sinceDating = getDaysDiff(datingDate, today);
  const sinceEngagement = today >= engagementDate ? getDaysDiff(engagementDate, today) : 0;
  const sinceWedding = today >= weddingDate ? getDaysDiff(weddingDate, today) : 0;

  const toEngagement = today < engagementDate ? getDaysDiff(today, engagementDate) : 0;
  const toWedding = today < weddingDate ? getDaysDiff(today, weddingDate) : 0;

  document.getElementById("sinceDating").textContent = `${sinceDating} dias juntos desde o namoro.`;
  document.getElementById("countdownToEngagement").textContent = today < engagementDate ? `Faltam ${toEngagement} dias para o noivado.` : "Já estamos noivos! 💍";

  document.getElementById("sinceEngagement").textContent = today >= engagementDate ? `${sinceEngagement} dias desde o noivado.` : `Aguardando o noivado...`;
  document.getElementById("countdownToWedding").textContent = today < weddingDate ? `Faltam ${toWedding} dias para o casamento.` : "Já estamos casados! 💒";

  document.getElementById("sinceWedding").textContent = today >= weddingDate ? `${sinceWedding} dias de casados.` : `Aguardando o grande dia...`;

  // Atualiza também a hora ao vivo (opcional)
  const horaAgora = today.toLocaleTimeString("pt-BR");
  document.getElementById("horaAtual").textContent = `Hora agora: ${horaAgora}`;
}

// Atualização em tempo real a cada 1 segundo
setInterval(updateCounters, 1000);

// Atualiza na primeira vez ao carregar
updateCounters();

