const namoro = new Date('2024-08-10T00:00:00');
const noivado = new Date('2025-06-10T00:00:00');
const casamento = new Date('2026-04-25T00:00:00');

function calcularTempo(inicio) {
  const agora = new Date();

  // Usar só datas sem horas para cálculo de dias inteiros
  const hojeSemHoras = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const inicioSemHoras = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());

  let diff = hojeSemHoras - inicioSemHoras; // diferença em ms

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Como calculamos só os dias, horas, minutos e segundos serão zerados
  // Se quiser mostrar só dias, pode retornar só isso
  return `${dias} dias`;
}

function calcularRegressiva(futuro) {
  const agora = new Date();

  // Somente datas sem horas para contagem regressiva baseada em dias
  const hojeSemHoras = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const futuroSemHoras = new Date(futuro.getFullYear(), futuro.getMonth(), futuro.getDate());

  let diff = futuroSemHoras - hojeSemHoras;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

  return dias >= 0 ? `${dias} dias` : '0 dias';
}

function atualizarContagem() {
  const agora = new Date();

  // Atualiza contagem considerando só dias inteiros
  document.getElementById("namoro").textContent = calcularTempo(namoro);
  document.getElementById("noivado").textContent = calcularTempo(noivado);

  // Se casamento ainda não aconteceu (considerando só dias)
  const hojeSemHoras = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const casamentoSemHoras = new Date(casamento.getFullYear(), casamento.getMonth(), casamento.getDate());

  if (hojeSemHoras < casamentoSemHoras) {
    document.getElementById("casamento").textContent = calcularRegressiva(casamento);
    document.getElementById("casados").style.display = 'none';
  } else {
    document.getElementById("casamento").textContent = `Nos casamos em ${casamento.toLocaleDateString('pt-BR')} 💒`;
    document.getElementById("tempoCasados").textContent = calcularTempo(casamento);
    document.getElementById("casados").style.display = 'block';
  }
}

// Atualiza a cada 1 segundo para garantir que a mudança no 00:00 seja pega
setInterval(atualizarContagem, 1000);
atualizarContagem();
