let score = JSON.parse(localStorage.getItem('score')) ||  {
        wins: 0,
        losses: 0,
        ties: 0
      };

  updateScoreElement();


 document.querySelector('.js-reset-button').addEventListener('click', () => {confirmationMassage()});




  document.querySelector('.js-auto-play').addEventListener('click', () => {
    autoPlay();
  });



  let isAutoPlaying = false;
  let intervalid;

  function resetScore() {
  localStorage.removeItem('score');

  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();
};

const confirmation = [
  {message: 'Are you sure want to reset the score'}
];

function confirmationMassage() {
  let confirmationMassageHtml = '';

  confirmation.forEach((confirmationObject, index) => {
    const {message} = confirmationObject;
    const html =`
    <div>${message}</div>
    <button class="js-confirm-yes">YES</button>
    <button class="js-confirm-no">NO</button>`;

    confirmationMassageHtml += html;
  });
  
  document.querySelector('.js-reset-confirmation').innerHTML = confirmationMassageHtml
  

  document.querySelector('.js-confirm-yes').addEventListener('click', () => {
    resetScore();

  document.querySelector('.js-reset-confirmation').innerHTML ='';
  });

  document.querySelector('.js-confirm-no').addEventListener('click', () => {

  document.querySelector('.js-reset-confirmation').innerHTML ='';
  });
}



  function autoPlay() {
   const buttonElement = document.querySelector('.js-auto-play');

   if (buttonElement.innerText === 'Auto Play') {buttonElement.innerHTML = 'Stop Playing';}

   else {buttonElement.innerHTML = 'Auto Play';};

    if (!isAutoPlaying) {
      intervalid = setInterval(function(){
      const playerMove = pickRandomMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    } else {
      clearInterval(intervalid);
      isAutoPlaying = false;
    }
  }

  document.querySelector('.js-rock-button').addEventListener('click', () => {playGame('rock');});

   document.querySelector('.js-paper-button').addEventListener('click', () => {playGame('paper');});

  document.querySelector('.js-scissor-button').addEventListener('click', () => {playGame('scissor');});

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper');
    } else if (event.key === 's') {
      playGame('scissor');
    } else if (event.key === 'a') {
      autoPlay();
    } else if (event.key === 'Backspace') {
      confirmationMassage();
    }
  });

  function pickRandomMove () {
  const randomNumber = Math.random();

  if (randomNumber < 1/3) {
    return 'rock';
  } else if (randomNumber < 2/3) {
    return 'paper';
  } else {
    return 'scissor';
  }
  return;
  }

  function playGame(playerMove) {
 
  let computerMove = pickRandomMove();
  let result = '';

  if (playerMove === computerMove) {
    result = 'Tie';
  } else if (
    (playerMove === 'rock' && computerMove === 'scissor') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissor' && computerMove === 'paper')
  ) {
    result = 'You win';
  } else {
    result = 'You lose';
  }

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('score',JSON.stringify(score));

     document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
   
     document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-move').innerHTML = ` You 
    <img src="${playerMove}-emoji.png" class="move-icon">
    <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;
}

   function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
  }
