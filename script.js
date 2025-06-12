const namoro = new Date('2024-08-10T00:00:00');
const noivado = new Date('2025-06-10T00:00:00');
const casamento = new Date('2026-04-25T00:00:00');

function calcularTempo(inicio) {
  const agora = new Date();
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

function mostrarContagemRegressiva() {
  const agora = new Date();
  let diff = casamento - agora;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= dias * (1000 * 60 * 60 * 24);
  const horas = Math.floor(diff / (1000 * 60 * 60));
  diff -= horas * (1000 * 60 * 60);
  const minutos = Math.floor(diff / (1000 * 60));
  diff -= minutos * (1000 * 60);
  const segundos = Math.floor(diff / 1000);

  document.getElementById("casamento").textContent = `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
  document.getElementById("casados").style.display = 'none';
}

function mostrarTempoCasados() {
  document.getElementById("casamento").textContent = `Nos casamos em ${casamento.toLocaleDateString('pt-BR')} 💒`;
  document.getElementById("tempoCasados").textContent = calcularTempo(casamento);
  document.getElementById("casados").style.display = 'block';
}

function atualizarContagem() {
  const agora = new Date();

  // Atualiza contagem namoro e noivado sempre (tempo passado)
  document.getElementById("namoro").textContent = calcularTempo(namoro);
  document.getElementById("noivado").textContent = calcularTempo(noivado);

  // Verifica datas sem horas (meia-noite)
  const hojeSemHoras = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const casamentoSemHoras = new Date(casamento.getFullYear(), casamento.getMonth(), casamento.getDate());

  if (hojeSemHoras < casamentoSemHoras) {
    mostrarContagemRegressiva();
  } else {
    mostrarTempoCasados();
  }

  // Atualizar horário atual no rodapé (se existir)
  const horarioAtualSpan = document.getElementById("horarioAtual");
  if (horarioAtualSpan) {
    horarioAtualSpan.textContent = agora.toLocaleTimeString('pt-BR');
  }
}

setInterval(atualizarContagem, 1000);
atualizarContagem();
