import {Board} from './Board.js'

const enemyPlayingBoard = new Board();
enemyPlayingBoard.generateBoard();
console.log(enemyPlayingBoard)

const playerPlayingBoard = new Board();
playerPlayingBoard.generateBoard();
console.log(playerPlayingBoard)

