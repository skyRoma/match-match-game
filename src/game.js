import gameBoard from '/game-board';
import intro from './introduction';

export default class Game{
  constructor(){}; 

  start(){
    if (intro()===true){
        gameBoard.init();
    }
  }
}
