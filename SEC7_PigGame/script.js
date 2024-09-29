'use strict';

let activePlayer = 'One';
const WINNING_SCORE = 100;
let finished = false;

const randomDice = () => Math.floor(Math.random() * 6) + 1;

const HTMLElements = {
  playerOne: {
    section: document.querySelector('.player--0'),
    score: document.querySelector('.player--0 .score'),
    currentScore: document.querySelector('.player--0 .current-score'),
  },
  playerTwo: {
    section: document.querySelector('.player--1'),
    score: document.querySelector('.player--1 .score'),
    currentScore: document.querySelector('.player--1 .current-score'),
  },
  newGame: document.querySelector('.btn--new'),
  rollDice: document.querySelector('.btn--roll'),
  hold: document.querySelector('.btn--hold'),
  dice: document.querySelector('.dice'),
};

const PLAYERS = {
  playerOne: {
    score: 0,
    currentScore: 0,
  },
  playerTwo: {
    score: 0,
    currentScore: 0,
  },
};

const newGameHandler = () => {
  PLAYERS.playerOne.score = 0;
  PLAYERS.playerOne.currentScore = 0;
  PLAYERS.playerTwo.score = 0;
  PLAYERS.playerTwo.currentScore = 0;
  HTMLElements.playerOne.score.textContent = 0;
  HTMLElements.playerOne.currentScore.textContent = 0;
  HTMLElements.playerTwo.score.textContent = 0;
  HTMLElements.playerTwo.currentScore.textContent = 0;
  HTMLElements[`player${activePlayer}`].section.classList.remove(
    'player--winner'
  );
  activePlayer = 'Two';
  changePlayer();
  HTMLElements.dice.classList.add('hidden');
  finished = false;
};

const changePlayer = () => {
  HTMLElements[`player${activePlayer}`].section.classList.remove(
    'player--active'
  );
  activePlayer = activePlayer == 'One' ? 'Two' : 'One';
  HTMLElements[`player${activePlayer}`].section.classList.add('player--active');
};

const rollDiceHandler = () => {
  if (finished) return;
  let diceNo = randomDice();
  HTMLElements.dice.classList.remove('hidden');
  HTMLElements.dice.src = `dice-${diceNo}.png`;
  if (diceNo == 1) {
    HTMLElements[`player${activePlayer}`].currentScore.textContent = PLAYERS[
      `player${activePlayer}`
    ].currentScore = 0;
    changePlayer();
    return;
  }
  HTMLElements[`player${activePlayer}`].currentScore.textContent = PLAYERS[
    `player${activePlayer}`
  ].currentScore += diceNo;
};

const holdHandler = () => {
  if (finished) return;
  HTMLElements[`player${activePlayer}`].score.textContent = PLAYERS[
    `player${activePlayer}`
  ].score += PLAYERS[`player${activePlayer}`].currentScore;

  HTMLElements[`player${activePlayer}`].currentScore.textContent = PLAYERS[
    `player${activePlayer}`
  ].currentScore = 0;

  if (PLAYERS[`player${activePlayer}`].score >= WINNING_SCORE) {
    finished = true;
    HTMLElements[`player${activePlayer}`].section.classList.add(
      'player--winner'
    );
    HTMLElements.dice.classList.add('hidden');
    return;
  }

  changePlayer();
};

HTMLElements.newGame.addEventListener('click', newGameHandler);
HTMLElements.rollDice.addEventListener('click', rollDiceHandler);
HTMLElements.hold.addEventListener('click', holdHandler);

newGameHandler();
