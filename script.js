'use strict';

// selecting elements from the DOM
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const restartBtn = document.querySelector('.btn--new');

const dice = document.querySelector('.dice');

let player0 = {
  score: 0,
  currentScore: 0,
};

let player1 = {
  score: 0,
  currentScore: 0,
};

var currentPlayer = player0;

const init = function () {
  score0.textContent = 0;
  currentScore0.textContent = 0;
  score1.textContent = 0;
  currentScore1.textContent = 0;

  resetScores(player0);
  resetScores(player1);

  if (player1Element.classList.contains('player--active')) {
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player-active');
  }
};
init();

rollBtn.addEventListener('click', function () {
  if (currentPlayer === player0) {
    rollDice(player0);
    displayPlayer0Scores();
  } else if (currentPlayer === player1) {
    rollDice(player1);
    displayPlayer1Scores();
  }
});

holdBtn.addEventListener('click', function () {
  if (currentPlayer === player0) {
    holdPressed(player0);
  } else if (currentPlayer === player1) {
    holdPressed(player1);
  }
});

restartBtn.addEventListener('click', init);

function rollDice(player) {
  const diceNo = Math.floor(Math.random() * 6) + 1;
  console.log(`diceNo: ${diceNo}`);
  dice.src = `resources/dice-${diceNo}.png`;
  dice.classList.remove('hidden');

  if (diceNo !== 1) {
    player.currentScore += diceNo;
  } else if (diceNo === 1) {
    player.currentScore = 0;
  }
}

function holdPressed(player) {
  dice.classList.add('hidden');

  player.score = player.currentScore;
  player.currentScore = 0;
  if (player === player0) {
    currentPlayer = player1;
    displayPlayer0Scores();
    player0Element.classList.remove('player--active');
    player1Element.classList.add('player--active');
  } else if (player === player1) {
    currentPlayer = player0;
    displayPlayer1Scores();
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player--active');
  }
}

function resetScores(player) {
  player.score = 0;
  player.currentScore = 0;
}

function displayPlayer0Scores() {
  score0.textContent = player0.score;
  currentScore0.textContent = player0.currentScore;
}

function displayPlayer1Scores() {
  score1.textContent = player1.score;
  currentScore1.textContent = player1.currentScore;
}
