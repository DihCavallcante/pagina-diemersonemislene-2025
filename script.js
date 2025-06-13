// -- Suas funções originais de contadores e horário (coloque seu código completo aqui) --

const dataNamoro = new Date('2019-02-16T00:00:00'); // exemplo
const dataNoivado = new Date('2023-03-26T00:00:00');
const dataCasamento = new Date('2025-12-05T00:00:00');

const elemNamoro = document.getElementById('namoro');
const elemNoivado = document.getElementById('noivado');
const elemCasamento = document.getElementById('casamento');
const elemCasados = document.getElementById('casados');
const elemTempoCasados = document.getElementById('tempoCasados');
const elemHorarioAtual = document.getElementById('horarioAtual');

function calculaTempoDecorrido(dataInicial) {
  const agora = new Date();
  const diffMs = agora - dataInicial;
  if(diffMs < 0) return null;

  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
  const segundos = Math.floor((diffMs / 1000) % 60);

  return { dias, horas, minutos, segundos };
}

function calculaTempoRestante(dataFutura) {
  const agora = new Date();
  const diffMs = dataFutura - agora;
  if(diffMs < 0) return null;

  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
  const segundos = Math.floor((diffMs / 1000) % 60);

  return { dias, horas, minutos, segundos };
}

function formataTempo(tempo) {
  if (!tempo) return "0d 0h 0m 0s";
  return `${tempo.dias}d ${tempo.horas}h ${tempo.minutos}m ${tempo.segundos}s`;
}

function atualizaContadores() {
  const tempoNamoro = calculaTempoDecorrido(dataNamoro);
  elemNamoro.textContent = formataTempo(tempoNamoro);

  const tempoNoivado = calculaTempoDecorrido(dataNoivado);
  elemNoivado.textContent = formataTempo(tempoNoivado);

  const tempoRestanteCasamento = calculaTempoRestante(dataCasamento);

  if(tempoRestanteCasamento) {
    elemCasamento.textContent = formataTempo(tempoRestanteCasamento);
    document.getElementById('casamento-bloco').style.display = 'block';
    elemCasados.parentElement.style.display = 'none';
  } else {
    const tempoCasados = calculaTempoDecorrido(dataCasamento);
    elemTempoCasados.textContent = formataTempo(tempoCasados);
    document.getElementById('casamento-bloco').style.display = 'none';
    elemCasados.style.display = 'block';
    elemCasados.parentElement.style.display = 'block';
  }
}

function atualizaHorario() {
  const agora = new Date();
  const hora = String(agora.getHours()).padStart(2, '0');
  const min = String(agora.getMinutes()).padStart(2, '0');
  const seg = String(agora.getSeconds()).padStart(2, '0');

  elemHorarioAtual.textContent = `${hora}:${min}:${seg}`;
}

setInterval(() => {
  atualizaContadores();
  atualizaHorario();
}, 1000);

// NOVO: Botão Voltar ao Início
const btnVoltarInicio = document.createElement('button');
btnVoltarInicio.id = 'btn-voltar-inicio';
btnVoltarInicio.textContent = 'Início ↑';
document.body.appendChild(btnVoltarInicio);

btnVoltarInicio.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
