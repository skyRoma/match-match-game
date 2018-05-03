import Timer from './timer';

export default class GameBoard {
  constructor() {
    this.memoryArray = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10'];
    this.arrayForInput = [];
    this.memoryValues = [];
    this.memoryTileIds = [];
    this.tilesFlipped = 0;
    this.gameBoard = document.querySelector('.game-board');
    this.numberOfCards = 0;
    this.users = [];
    this.timer = {};
  }
  memoryTileShuffle(array) {
    let i = this.arrayForInput.length;
    let j;
    let temp;
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
  }
  newBoard(numberOfCards, shirt) {
    this.timer = new Timer();
    this.arrayForInput = this.memoryArray.slice(0, numberOfCards);
    this.numberOfCards = numberOfCards;
    this.tilesFlipped = 0;
    let output = '';
    this.memoryTileShuffle(this.arrayForInput);
    for (let i = 0; i < this.numberOfCards; i += 1) {
      output += `<div id="${i}" class="card"><div class="${shirt} back"></div><div class="front icon-value-${this.arrayForInput[i]}"></div></div>`;
    }
    this.gameBoard.innerHTML = output;
    this.gameBoard.addEventListener('click', this.memoryFlipTile.bind(this));
    document.querySelector('.game-board-wrapper .restart').addEventListener('click', () => { this.timer.stop(); });
  }

  memoryFlipTile(event) {
    const tile = event.target.parentNode;
    if (tile.classList != 'card') return;
    const val = this.arrayForInput[+tile.id];
    if (tile.class !== 'card rotate' && this.memoryValues.length < 2) {
      tile.classList.add('rotate');

      if (this.memoryValues.length === 0) {
        this.memoryValues.push(val);
        this.memoryTileIds.push(tile.id);
      } else if (this.memoryValues.length === 1) {
        this.memoryValues.push(val);
        this.memoryTileIds.push(tile.id);

        if (this.memoryValues[0] === this.memoryValues[1]) {
          this.tilesFlipped += 2;
          function removeEqualCards() {
            const tile_1 = document.getElementById(this.memoryTileIds[0]);
            const tile_2 = document.getElementById(this.memoryTileIds[1]);
            tile_1.classList.add('disappear');
            tile_2.classList.add('disappear');
            this.memoryValues = [];
            this.memoryTileIds = [];
          }
          setTimeout(removeEqualCards.bind(this), 1000);

          if (this.tilesFlipped === this.numberOfCards) {
            this.win();
          }
        } else {
          function flip2Back() {
            const tile_1 = document.getElementById(this.memoryTileIds[0]);
            const tile_2 = document.getElementById(this.memoryTileIds[1]);
            tile_1.classList.remove('rotate');
            tile_2.classList.remove('rotate');
            this.memoryValues = [];
            this.memoryTileIds = [];
          }
          setTimeout(flip2Back.bind(this), 700);
        }
      }
    }
  }

  win() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const result = this.timer.stop();
    const timeArray = result.split(':');
    const timeTotalSec = (+timeArray[0]) * 60 + (+timeArray[1]);
    this.users = JSON.parse(localStorage.getItem('users'));
    if (!this.users) this.users = [];
    this.users.push({ fullName: `${currentUser.firstName} ${currentUser.lastName}`, level: this.numberOfCards, result: result, total: timeTotalSec });
    localStorage.setItem('users', JSON.stringify(this.users));
    document.querySelector('.game-board-wrapper').classList.add('disappear');
    document.querySelector('.congrats').classList.add('appear');
    document.querySelector('.congrats').classList.remove('disappear');
    document.querySelector('.info span:first-child').innerHTML = `${currentUser.firstName} ${currentUser.lastName}`;
    document.querySelector('.info span:last-child').innerHTML = `${result}`;
  }
}
