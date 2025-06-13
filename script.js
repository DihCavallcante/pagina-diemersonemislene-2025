// Defina as datas dos eventos
const dataNamoro = new Date('2019-02-16T00:00:00'); 
const dataNoivado = new Date('2023-03-26T00:00:00');
const dataCasamento = new Date('2025-12-05T00:00:00');

// Pega os elementos do DOM onde vai mostrar os tempos
const elemNamoro = document.getElementById('namoro');
const elemNoivado = document.getElementById('noivado');
const elemCasamento = document.getElementById('casamento');
const blocoCasamento = document.getElementById('casamento-bloco');
const blocoCasados = document.getElementById('casados');
const elemTempoCasados = document.getElementById('tempoCasados');
const elemHorarioAtual = document.getElementById('horarioAtual');

// Função para calcular tempo passado
function calculaTempoDecorrido(dataInicio) {
  const agora = new Date();
  const diffMs = agora - dataInicio;
  if(diffMs < 0) return null;

  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
  const segundos = Math.floor((diffMs / 1000) % 60);

  return { dias, horas, minutos, segundos };
}

// Função para calcular tempo restante
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

// Formatar o tempo para string
function formataTempo(tempo) {
  if (!tempo) return "0d 0h 0m 0s";
  return `${tempo.dias}d ${tempo.horas}h ${tempo.minutos}m ${tempo.segundos}s`;
}

// Atualiza todos os contadores na tela
function atualizaContadores() {
  const tempoNamoro = calculaTempoDecorrido(dataNamoro);
  elemNamoro.textContent = formataTempo(tempoNamoro);

  const tempoNoivado = calculaTempoDecorrido(dataNoivado);
  elemNoivado.textContent = formataTempo(tempoNoivado);

  const tempoRestanteCasamento = calculaTempoRestante(dataCasamento);

  if (tempoRestanteCasamento) {
    // Mostra contagem regressiva para casamento
    elemCasamento.textContent = formataTempo(tempoRestanteCasamento);
    blocoCasamento.style.display = 'block';
    blocoCasados.style.display = 'none';
  } else {
    // Casados - mostra tempo desde casamento
    const tempoCasados = calculaTempoDecorrido(dataCasamento);
    elemTempoCasados.textContent = formataTempo(tempoCasados);
    blocoCasamento.style.display = 'none';
    blocoCasados.style.display = 'block';
  }
}

// Atualiza o horário atual
function atualizaHorario() {
  const agora = new Date();
  const hora = String(agora.getHours()).padStart(2, '0');
  const min = String(agora.getMinutes()).padStart(2, '0');
  const seg = String(agora.getSeconds()).padStart(2, '0');

  elemHorarioAtual.textContent = `${hora}:${min}:${seg}`;
}

// Loop para atualizar tudo a cada 1 segundo
setInterval(() => {
  atualizaContadores();
  atualizaHorario();
}, 1000);

// Cria botão "Voltar ao Início"
const btnVoltarInicio = document.createElement('button');
btnVoltarInicio.id = 'btn-voltar-inicio';
btnVoltarInicio.textContent = 'Início ↑';
document.body.appendChild(btnVoltarInicio);

// Scroll suave para topo ao clicar no botão
btnVoltarInicio.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
