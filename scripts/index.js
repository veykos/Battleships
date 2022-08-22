
import { getTileCoordinates } from "./functions.js";
import { Board } from "./Board.js";
import { AircraftCarrier, Ship, Battlecruiser } from "./Ship.js";
import { Game } from "./Game.js"

const game = new Game;
game.start()




// // TESTING COMMANDS
// let one_battlecruiser = new Battlecruiser
// let one_aircraftcarrier = new AircraftCarrier
// let one_ship = new Ship
// let second_aircraftcarrier = new AircraftCarrier
// second_aircraftcarrier.orientation = 'vertical'
// playerPlayingBoard.placeShip({'col':3,'row':7},second_aircraftcarrier)
// playerPlayingBoard.placeShip({'col':1,'row':3}, one_battlecruiser)
// playerPlayingBoard.placeShip({'col':4,'row':5}, one_aircraftcarrier);
// playerPlayingBoard.placeShip({'col':7,'row':4}, one_ship)
// playerPlayingBoard.markTile({'col':3,'row':7})
// playerPlayingBoard.markTile({'col':3,'row':2})
// playerPlayingBoard.markTile({'col':1,'row':2})


// enemyPlayingBoard.placeShip({'col':3,'row':7},second_aircraftcarrier)
// enemyPlayingBoard.placeShip({'col':2,'row':3}, one_battlecruiser)
// enemyPlayingBoard.placeShip({'col':5,'row':5}, one_aircraftcarrier);
// enemyPlayingBoard.placeShip({'col':6,'row':4}, one_ship)
// enemyPlayingBoard.markTile({col:2,row:4})
// enemyPlayingBoard.markTile({col:2,row:3})

// playerPlayingBoard.colorTilesPlayer();
// enemyPlayingBoard.colorTilesEnemy();

// console.log(playerPlayingBoard.gamingTiles)
// console.log(enemyPlayingBoard.gamingTiles)