const datingDate = new Date("2024-08-10T00:00:00");
const engagementDate = new Date("2025-06-10T00:00:00");
const weddingDate = new Date("2026-04-25T00:00:00");

function getDiffComponents(from, to) {
  const diff = Math.abs(to - from);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function renderTimer(id, fromDate, countUp = true) {
  const now = new Date();
  let target = now;
  let label = "";

  if (countUp) {
    target = now;
    label = fromDate;
  } else {
    target = fromDate;
    label = now;
  }

  const { days, hours, minutes, seconds } = getDiffComponents(label, target);

  const html = `
    <div>${hours.toString().padStart(2, '0')}<br><span>horas</span></div>
    <div>${minutes.toString().padStart(2, '0')}<br><span>minutos</span></div>
    <div>${seconds.toString().padStart(2, '0')}<br><span>segundos</span></div>
  `;

  document.getElementById(id).innerHTML = html;
}

function updateCounters() {
  const now = new Date();

  const sinceDating = getDiffComponents(datingDate, now).days;
  const sinceEngagement = now >= engagementDate ? getDiffComponents(engagementDate, now).days : 0;
  const sinceWedding = now >= weddingDate ? getDiffComponents(weddingDate, now).days : 0;

  const toEngagement = now < engagementDate ? getDiffComponents(now, engagementDate).days : 0;
  const toWedding = now < weddingDate ? getDiffComponents(now, weddingDate).days : 0;

  document.getElementById("sinceDating").textContent = sinceDating;
  document.getElementById("sinceEngagement").textContent = now >= engagementDate ? sinceEngagement : "Aguardando...";
  document.getElementById("sinceWedding").textContent = now >= weddingDate ? sinceWedding : "Aguardando...";

  document.getElementById("countdownToEngagement").textContent = now < engagementDate
    ? `Faltam ${toEngagement} dias para o noivado.`
    : "Já estamos noivos! 💍";

  document.getElementById("countdownToWedding").textContent = now < weddingDate
    ? `Faltam ${toWedding} dias para o casamento.`
    : "Já estamos casados! 💒";

  document.getElementById("horaAtual").textContent = `Hora agora: ${now.toLocaleTimeString("pt-BR")}`;

  renderTimer("datingTimer", datingDate);
  renderTimer("engagementTimer", engagementDate);
  renderTimer("weddingTimer", weddingDate);
}

setInterval(updateCounters, 1000);
updateCounters();

document.getElementById("upload").addEventListener("change", function (e) {
  const container = document.getElementById("photoContainer");
  container.innerHTML = "";
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      container.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});
