import GameBoard from './game-board';
import User from './user';

const gameBoard = new GameBoard();

const body = document.querySelector('body');
const greetingButton = document.querySelector('.greeting button');
const greetingSection = document.querySelector('.greeting');
const rulesSection = document.querySelector('.rules');
const loginSection = document.querySelector('.login');
const congratsSection = document.querySelector('.congrats');
const gameBoardWrapper = document.querySelector('.game-board-wrapper');
const rulesButton = document.querySelector('.rules button');
const startButton = document.querySelector('form + button');
const tryAgainButton = document.querySelector('.congrats button');
const restartButton = document.querySelector('.restart');
const loginLeftColumn = document.querySelector('.login .left-column');
const loginRighttColumn = document.querySelector('.login .right-column');
const imgWrapper = document.querySelector('.images-wrapper');
let shirt = 'stars';
let numberOfCards;
let user;
let savedUser = JSON.parse(localStorage.getItem('currentUser'));
if (!savedUser) {
  savedUser = { firstName: '', lastName: '', email: '', level: '' };
}


function makeRating() {
  let users = JSON.parse(localStorage.getItem('users'));
  if (!users) {
    users = [];
  } else users.sort((a, b) => a.total - b.total);
  let output = '';
  const top = users.length > 9 ? 10 : users.length;
  for (let i = 0; i < top; i += 1) {
    if (users[i].level == savedUser.level) {
      output += `<li>${users[i].fullName} ${users[i].result}</li>`;
    }
  }
  document.querySelector('.rating ol').innerHTML = output;
}

window.onload = function () {
  greetingSection.classList.add('appear');
  document.querySelector('.greeting button').classList.add('move-right');
  document.querySelector('.greeting p').classList.add('move-left');
  document.querySelector('#firstName').value = `${savedUser.firstName}`;
  document.querySelector('#lastName').value = `${savedUser.lastName}`;
  document.querySelector('#email').value = `${savedUser.email}`;
  makeRating();
};

greetingButton.addEventListener('click', () => {
  document.querySelectorAll('.move-right, .move-left, .greeting').forEach((element) => {
    if (element.classList == 'greeting appear') {
      element.classList.add('disappear');
    } else if (element.classList == 'move-left') {
      element.classList.remove('move-left');
    } else {
      element.classList.remove('move-right');
    }
  });
  rulesSection.classList.add('appear');
});

rulesButton.addEventListener('click', () => {
  document.querySelector('.rules p').classList.add('move-left');
  document.querySelector('.rules ol').classList.add('move-left');
  rulesButton.classList.add('move-right');
  rulesSection.classList.add('disappear');
  loginSection.classList.add('appear');
  body.removeChild(greetingSection);
});

imgWrapper.addEventListener('click', () => {
  const target = event.target;
  if (target.tagName != 'IMG') return;
  shirt = target.alt;
  document.querySelector('.active').classList.remove('active');
  target.classList.add('active');
});

startButton.addEventListener('click', () => {
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  numberOfCards = +document.querySelector('#complexity').value;
  loginSection.classList.add('disappear');
  loginLeftColumn.classList.add('move-left');
  loginRighttColumn.classList.add('move-right');
  gameBoardWrapper.classList.remove('disappear');
  gameBoardWrapper.classList.add('appear');
  user = new User(firstName, lastName, email, numberOfCards);
  localStorage.setItem('currentUser', JSON.stringify(user));
  savedUser = JSON.parse(localStorage.getItem('currentUser'));
  document.querySelector('.full-name').innerHTML = `${savedUser.firstName} ${savedUser.lastName}`;
  makeRating();
  gameBoard.newBoard(numberOfCards, shirt);
});

restartButton.addEventListener('click', () => {
  gameBoardWrapper.classList.add('disappear');
  loginSection.classList.remove('disappear');
  loginLeftColumn.classList.remove('move-left');
  loginRighttColumn.classList.remove('move-right');
});

tryAgainButton.addEventListener('click', () => {
  gameBoardWrapper.classList.remove('disappear');
  congratsSection.classList.add('disappear');
  makeRating();
  gameBoard.newBoard(numberOfCards, shirt);
});

