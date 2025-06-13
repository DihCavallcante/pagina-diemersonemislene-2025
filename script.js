// Função para formatar diferença de datas em anos, meses, dias, horas, minutos e segundos
function formatTimeDiff(diffMs) {
  const seconds = Math.floor(diffMs / 1000) % 60;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return `${days} dia${days !== 1 ? 's' : ''}, ` +
         `${hours} hora${hours !== 1 ? 's' : ''}, ` +
         `${minutes} minuto${minutes !== 1 ? 's' : ''}, ` +
         `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
}

// Atualiza contadores de tempo para namoro, noivado e casamento
function atualizarContadores() {
  const namoroInicio = new Date('2024-08-10T00:00:00');
  const noivadoInicio = new Date('2025-06-10T00:00:00');
  const casamentoData = new Date('2026-04-25T00:00:00');

  const agora = new Date();

  // Tempo juntos (namoro)
  const diffNamoro = agora - namoroInicio;
  document.getElementById('namoro').textContent = formatTimeDiff(diffNamoro);

  // Tempo de noivado
  const diffNoivado = agora - noivadoInicio;
  document.getElementById('noivado').textContent = formatTimeDiff(diffNoivado);

  // Contagem regressiva para casamento ou tempo desde casamento
  const diffCasamento = casamentoData - agora;

  if (diffCasamento > 0) {
    // Antes do casamento — contagem regressiva
    document.getElementById('casamento').textContent = formatTimeDiff(diffCasamento);
    document.getElementById('casamento-bloco').style.display = 'block';
    document.getElementById('casados').style.display = 'none';
  } else {
    // Depois do casamento — tempo casados
    const diffCasados = agora - casamentoData;
    document.getElementById('tempoCasados').textContent = formatTimeDiff(diffCasados);
    document.getElementById('casamento-bloco').style.display = 'none';
    document.getElementById('casados').style.display = 'block';
  }
}

// Atualiza horário atual no rodapé a cada segundo
function atualizarHorario() {
  const agora = new Date();
  const horarioFormatado = agora.toLocaleTimeString('pt-BR', { hour12: false });
  const elemHorario = document.getElementById('horarioAtual');
  if (elemHorario) {
    elemHorario.textContent = horarioFormatado;
  }
}

// Atualiza link ativo no menu lateral conforme seção visível na viewport
function atualizarLinkAtivo() {
  const links = document.querySelectorAll('.menu-lateral a');
  let indiceAtivo = -1;

  links.forEach((link, i) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const secao = document.querySelector(href);
      if (secao) {
        const rect = secao.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 4) {
          indiceAtivo = i;
        }
      }
    }
  });

  links.forEach((link, i) => {
    if (i === indiceAtivo) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Tocar som romântico ao clicar nos botões do menu lateral
function adicionarSomClick() {
  // Coloque o caminho do seu som romântico aqui (mp3, wav, etc)
  const somClick = new Audio('som-romantico.mp3');

  const botoes = document.querySelectorAll('.menu-lateral a');
  botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault(); // impede navegação imediata para tocar som primeiro
      somClick.currentTime = 0;
      somClick.play();

      const href = botao.getAttribute('href');
      // Navegar para outra página ou seção após som tocar
      somClick.onended = () => {
        window.location.href = href;
      };
    });
  });
}

// Inicialização após carregar a página
document.addEventListener('DOMContentLoaded', () => {
  atualizarContadores();
  atualizarHorario();
  atualizarLinkAtivo();
  adicionarSomClick();

  // Atualizações periódicas
  setInterval(atualizarHorario, 1000);       // a cada segundo
  setInterval(atualizarContadores, 1000);    // a cada segundo para contagem em tempo real
  window.addEventListener('scroll', atualizarLinkAtivo);
});
