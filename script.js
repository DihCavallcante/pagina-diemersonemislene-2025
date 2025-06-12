const startDate = new Date("2024-08-10T00:00:00");

function updateLoveTimer() {
  const now = new Date();
  let diff = now - startDate;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));

  const years = Math.floor(daysTotal / 365.25);
  const months = Math.floor((daysTotal % 365.25) / 30.44);
  const days = Math.floor((daysTotal % 365.25) % 30.44);

  document.getElementById("loveTimer").innerHTML = `
    <div><strong>${years}</strong> anos</div>
    <div><strong>${months}</strong> meses</div>
    <div><strong>${days}</strong> dias</div>
    <div><strong>${hours}</strong> horas</div>
    <div><strong>${minutes}</strong> minutos</div>
    <div><strong>${seconds}</strong> segundos</div>
  `;
}

setInterval(updateLoveTimer, 1000);
updateLoveTimer();
