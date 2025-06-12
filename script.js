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

function calcularRegressiva(futuro) {
  const agora = new Date();

  let diff = futuro - agora;

  if(diff < 0) return '0 dias 0h 0m 0s';

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= dias * (1000 * 60 * 60 * 24);
  const horas = Math.floor(diff / (1000 * 60 * 60));
  diff -= horas * (1000 * 60 * 60);
  const minutos = Math.floor(diff / (1000 * 60));
  diff -= minutos * (1000 * 60);
  const segundos = Math.floor(diff / 1000);

  return `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
}

function atualizarContagem() {
  const agora = new Date();

  document.getElementById("namoro").textContent = calcularTempo(namoro);
  document.getElementById("noivado").textContent = calcularTempo(noivado);

  const casamentoElemento = document.getElementById("casamento");
  const casadosElemento = document.getElementById("casados");
  const tempoCasadosSpan = document.getElementById("tempoCasados");

  if (agora < casamento) {
    casamentoElemento
