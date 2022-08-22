
import { getTileCoordinates } from "./functions.js";
import { Board } from "./Board.js";
import { AircraftCarrier, Ship, Battlecruiser } from "./Ship.js";
import { Game } from "./Game.js"

let acVert = document.querySelector('#AC1')
let acHor = document.querySelector('#AC2')
let bcVert = document.querySelector('#BC1')
let bcHor = document.querySelector('#BC2')
let sh1 = document.querySelector('#SH1')
let sh2 = document.querySelector('#SH2')


const game = new Game;
game.start()

console.log(game.player,game.enemy)
console.log(game)