import GameBoard from './game-board';
import User from './user';

let gameOne = new GameBoard();

const body = document.querySelector('body');
const greetingButton = document.querySelector('.greeting button');
const greetingSection = document.querySelector('.greeting');
const rulesSection = document.querySelector('.rules');
const loginSection = document.querySelector('.login');
const gameBoardWrapper = document.querySelector('.game-board-wrapper');
const rulesButton = document.querySelector('.rules button');
const startButton = document.querySelector('form + button');
const restartButton = document.querySelector('.restart');
const loginLeftColumn = document.querySelector('.login .left-column');
const loginRighttColumn = document.querySelector('.login .right-column');
const imgWrapper = document.querySelector('.images-wrapper');
let shirt = 'stars';
let user;

window.onload = function () {
    greetingSection.classList.add('appear');
    document.querySelector('.greeting button').classList.add('move-right');
    document.querySelector('.greeting p').classList.add('move-left');
};


greetingButton.addEventListener('click', () => {
    const list = document.querySelectorAll('.move-right, .move-left, .greeting');
    list.forEach((element) => {
        if (element.classList=='greeting appear') {
            element.classList.add('disappear');
        }
        else if (element.classList=='move-left') {
            element.classList.remove('move-left');
        }
        else {
            element.classList.remove('move-right');
        }
    });  
    rulesSection.classList.add('appear');
});

rulesButton.addEventListener('click',()=>{
    document.querySelector('.rules p').classList.add('move-left'); 
    document.querySelector('.rules ol').classList.add('move-left'); 
    rulesButton.classList.add('move-right');
    rulesSection.classList.add('disappear');
    loginSection.classList.add('appear');
    body.removeChild(greetingSection);
});

imgWrapper.addEventListener('click', () => {
    let target = event.target; 
    if (target.tagName != 'IMG') return;
    shirt = target.alt;
    document.querySelector('.active').classList.remove('active');
    target.classList.add('active');
});

startButton.addEventListener('click', () => { 
    const firstName = document.querySelector('#firstName').value; 
    const lastName = document.querySelector('#lastName').value; 
    const email = document.querySelector('#email').value; 
    let numberOfCards =  +document.querySelector('#complexity').value;

    loginSection.classList.add('disappear');
    loginLeftColumn.classList.add('move-left');
    loginRighttColumn.classList.add('move-right');
    gameBoardWrapper.classList.remove('disappear');
    gameBoardWrapper.classList.add('appear');
    user = new User(firstName, lastName, email);
    document.querySelector('.full-name').innerHTML=`${user.firstName} ${user.lastName}`;
    gameOne.newBoard(numberOfCards, shirt);
    body.removeChild(rulesSection);
});

restartButton.addEventListener('click',() => {
    gameBoardWrapper.classList.add('disappear');
    loginSection.classList.remove('disappear');
    loginLeftColumn.classList.remove('move-left');
    loginRighttColumn.classList.remove('move-right');
});

