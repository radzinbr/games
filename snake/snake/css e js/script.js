const tabelaGame = document.querySelector('.tabela');
const snakebody = [];
let snakeX = 5, snakeY = 10;
let foodX, foodY;
let velocityX = 0, velocityY = 0;
let gameheight = 31, gamewidth = 31;
let pontos = 0 //inicializa o sistema de pontos 
let record = 0 //inicializa o sistema de record 

const restatgame = () => {
  //faz o jogo reiniciar 
  velocityX = 0;
  velocityY = 0;
  snakeX = Math.floor(gamewidth / 2);
  snakeY = Math.floor(gameheight / 2);
  foodX = Math.floor(Math.random() * gamewidth);
  foodY = Math.floor(Math.random() * gameheight)

  //reinicia a cobra 
  snakebody.splice(1);
  // reinicia o contador
  pontos = 0
}


// Função que atualiza a posição da cobra na tela
const atualizarposiçao = () => {
  snakeX += velocityX;
  snakeY += velocityY;
  const ultimaCelula = snakebody[snakebody.length - 1];

  // Verifica se a cobra comeu a maçã
  if (snakeX === foodX && snakeY === foodY) {
    pontos += 1;
    if (pontos > record) {
      record = pontos
    }
    snakebody.push([snakeX, snakeY]);
    posicaoComida();
    console.log(pontos)
    console.log(record)
  }

  // exibir pontos 
  const pontoselem = document.querySelector('.pontos')
  pontoselem.textContent = `pontos:${pontos}`;
  const recordelem = document.querySelector('.record')
  recordelem.textContent = `Maior pontuação: ${record}`

  //verificar se a cobra bateu na parede 

  if (snakeX < 0 || snakeX >= gamewidth || snakeY < - 0 || snakeY >= gameheight) {

    restatgame();

  }
  // Atualiza a posição da última célula para a posição da maçã e adiciona-a no início do array
  snakebody.unshift([snakeX, snakeY]);
  ultimaCelula[0] = snakeX;
  ultimaCelula[1] = snakeY;

  // Remove a última célula da cobra se ela não tiver comido a maçã
  if (!snakebody.includes([foodX, foodY])) {
    snakebody.pop();
  }

  // Cria o HTML da tabela com a posição atual da cobra e da maçã
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  for (let i = 0; i < snakebody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
  }



  // Atualiza o HTML da tabela com o novo markup criado
  tabelaGame.innerHTML = htmlMarkup;
};

// Função que atualiza a posição da maçã na tela
const posicaoComida
  = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
  };

// Função que atualiza a velocidade da cobra de acordo com a tecla pressionada
const mudarDirecao = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
    case 'ArrowDown':
      if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
    case 'ArrowLeft':
      if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case 'ArrowRight':
      if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
    default:
      break;
  }
};

// Inicia o jogo
const iniciarJogo = () => {
  posicaoComida();
  setInterval(atualizarposiçao, 125);
  document.addEventListener('keydown', mudarDirecao);
};

// Chama a função iniciarJogo para começar a jogar
iniciarJogo();