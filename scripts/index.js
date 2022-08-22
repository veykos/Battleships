
import { getTileCoordinates } from "./functions.js";
import { Board } from "./Board.js";
import { AircraftCarrier, Ship, Battlecruiser } from "./Ship.js";
import { Game } from "./Game.js"

const game = new Game;
game.start()

console.log(game.player,game.enemy)