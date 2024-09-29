'use strict';

let SECRET = Math.floor(Math.random() * 20) + 1;
let finished = false;
let currentScore = 20;
let highscore = 0;

const ELEMENTS = {
  guessInput: document.querySelector('.guess'),
  check: document.querySelector('.check'),
  again: document.querySelector('.again'),
  hiddenNumber: document.querySelector('.number'),
  message: document.querySelector('.message'),
  score: document.querySelector('.score'),
  highscore: document.querySelector('.highscore'),
  body: document.querySelector('body'),
};

//ELEMENTS.hiddenNumber.textContent = SECRET;

const disableGame = () => {
  ELEMENTS.hiddenNumber.textContent = SECRET;
  ELEMENTS.hiddenNumber.style.width = '30rem';
  finished = true;
};

const guessHandler = e => {
  let guessedNumber = Number(ELEMENTS.guessInput.value);
  if (finished) return;
  if (!guessedNumber) {
    ELEMENTS.message.textContent = 'No number!';
    return;
  }
  if (guessedNumber != SECRET) {
    ELEMENTS.message.textContent =
      guessedNumber > SECRET ? 'Too high!' : 'Too Low!';
    currentScore--;
    ELEMENTS.score.textContent = currentScore;
    if (!currentScore) {
      ELEMENTS.message.textContent = 'You lost the game!';
      disableGame();
    }
  } else {
    highscore = Math.max(highscore, currentScore);
    ELEMENTS.highscore.textContent = highscore;
    ELEMENTS.message.textContent = 'Correct! You win the game!';
    ELEMENTS.body.style.backgroundColor = '#60b347';
    disableGame();
  }
};

const agianHandler = e => {
  SECRET = Math.floor(Math.random() * 20) + 1;
  currentScore = 20;
  ELEMENTS.message.textContent = 'Start guessing...';
  ELEMENTS.score.textContent = currentScore;
  ELEMENTS.hiddenNumber.style.width = '15rem';
  ELEMENTS.body.style.backgroundColor = '#333';
  ELEMENTS.hiddenNumber.textContent = '?';
  ELEMENTS.guessInput.value = '';
  finished = false;
};

ELEMENTS.check.addEventListener('click', guessHandler);

ELEMENTS.again.addEventListener('click', agianHandler);
