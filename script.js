const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const btnIniciarPausar = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iconeIniciarOuPausar = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');

const musicaFoco = new Audio('../sons/luna-rise-part-one.mp3');
const musicaIniciar = new Audio('../sons/play.wav');
const musicaPausar = new Audio('../sons/pause.mp3');
const musicaTempoFinalizado = new Audio('../sons/beep.mp3');
musicaFoco.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
    if(musicaFoco.paused) {
        musicaFoco.play();
    } else {
        musicaFoco.pause();
    }
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `../imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }    
};

btnFoco.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    btnFoco.classList.add('active');
});

btnCurto.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    btnCurto.classList.add('active');
});

btnLongo.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    btnLongo.classList.add('active');
});

function contagemRegressiva() {
    if(tempoDecorridoEmSegundos <= 0) {
        musicaTempoFinalizado.play();
        zerar()
        return
    };
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
};

btnIniciarPausar.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        musicaPausar.play();
        zerar()
        return
    }
    musicaIniciar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar";
    iconeIniciarOuPausar.setAttribute('src', '../imagens/pause.png');
};

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBtn.textContent = "Começar";
    iconeIniciarOuPausar.setAttribute('src', '../imagens/play_arrow.png');
};

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
};

mostrarTempo();