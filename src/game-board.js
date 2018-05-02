export default class GameBoard{
	constructor(){
		this.memoryArray = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '10', '10'];
		this.memoryValues = [];
		this.memoryTileIds = [];
		this.tilesFlipped = 0;
		this.gameBoard = document.querySelector('.game-board');
	}
    memoryTileShuffle(array) {
		let i = array.length;
		let j;
		let temp;
		while (--i > 0) {
			j = Math.floor(Math.random() * (i + 1));
			temp = array[j];
			array[j] = array[i];
			array[i] = temp;
		}
	};
	newBoard(numberOfCards, shirt) {
	this.tilesFlipped = 0;
	let output = '';
	this.memoryTileShuffle(this.memoryArray);
	for (let i = 0; i < numberOfCards; i++) {
		output += `<div id="${i}" class="card"><div class="${shirt} back"></div><div class="front icon-value-${this.memoryArray[i]}"></div></div>`;
	}
	this.gameBoard.innerHTML = output;
	let cardsList = document.querySelectorAll('.card');
	cardsList.forEach((card) => {
		card.addEventListener('click', this.memoryFlipTile.bind(this));
	});

	// this.gameBoard.addEventListener('click',this.memoryFlipTile.bind(this));
	}
    memoryFlipTile(event) {
		let tile = event.target;
		console.log(tile);
		console.log(event);
		let val = this.memoryArray[+event.target.id];
		if (tile.class !== 'card rotate' && this.memoryValues.length < 2) {
			tile.classList.add('rotate');
			// tile.style.background = '#FFF';
			// tile.innerHTML = val;
			if (this.memoryValues.length === 0) {
				this.memoryValues.push(val);
				this.memoryTileIds.push(tile.id);
			} else if (this.memoryValues.length === 1) {
				this.memoryValues.push(val);
				this.memoryTileIds.push(tile.id);
			if (this.memoryValues[0] === this.memoryValues[1]) {
				this.tilesFlipped += 2;
				// Clear both arrays
				this.memoryValues = [];
				this.memoryTileIds = [];
				// Check to see if the whole board is cleared
				if (this.tilesFlipped === this.memoryArray.length) {
					alert('Board cleared... generating new board');
					this.gameBoard.innerHTML = '';
					newBoard();
				}
			} else {
				function flip2Back() {
					// Flip the 2 tiles back over
					const tile_1 = document.getElementById(this.memoryTileIds[0]);
					const tile_2 = document.getElementById(this.memoryTileIds[1]);
					// tile_1.style.background = 'url(./images/value-7.jpg) ';
					// tile_1.innerHTML = '';
					// tile_2.style.background = 'url(./images/stars.jpg) no-repeat 100% 100%';
					// tile_2.innerHTML = '';
					// Clear both arrays
					this.memoryValues = [];
					this.memoryTileIds = [];
				}
				setTimeout(flip2Back.bind(this), 700);
			}
			}
	    }
	}
}
