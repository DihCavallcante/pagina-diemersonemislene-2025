const namoro = new Date('2024-08-10T00:00:00');
const noivado = new Date('2025-06-10T00:00:00');
const casamento = new Date('2026-04-25T00:00:00');

function atualizarContagem() {
  const agora = new Date();

  function calcularTempo(inicio) {
    let diff = agora - inicio;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= dias * (1000 * 60 * 60 * 24);
    const horas = Math.floor(diff / (1000 * 60 * 60));
    diff -= horas * (1000 * 60 * 60);
    const minutos = Math.floor(diff / (1000 * 60));
    diff -= minutos * (1000 * 60);
    const segundos = Math.floor(diff / 1000);

    return `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
  }

  document.getElementById("namoro").textContent = calcularTempo(namoro);
  document.getElementById("noivado").textContent = calcularTempo(noivado);

  const casamentoElemento = document.getElementById("casamento");
  const casadosElemento = document.getElementById("casados");
  const tempoCasadosSpan = document.getElementById("tempoCasados");

  if (agora < casamento) {
    let diff = casamento - agora;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= dias * (1000 * 60 * 60 * 24);
    const horas = Math.floor(diff / (1000 * 60 * 60));
    diff -= horas * (1000 * 60 * 60);
    const minutos = Math.floor(diff / (1000 * 60));
    diff -= minutos * (1000 * 60);
    const segundos = Math.floor(diff / 1000);

    casamentoElemento.textContent = `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
    casadosElemento.style.display = 'none';
  } else {
    casamentoElemento.textContent = `Nos casamos em ${casamento.toLocaleDateString('pt-BR')} 💒`;
    tempoCasadosSpan.textContent = calcularTempo(casamento);
    casadosElemento.style.display = 'block';
  }
}

// Atualizar hora atual no rodapé
function atualizarHora() {
  const agora = new Date();
  const hora = agora.toLocaleTimeString('pt-BR', { hour12: false });
  document.getElementById('horaAtual').textContent = hora;
}

setInterval(atualizarContagem, 1000);
setInterval(atualizarHora, 1000);
atualizarContagem();
atualizarHora();
