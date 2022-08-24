
import { getTileCoordinates } from "./functions.js";
import { Board } from "./Board.js";
import { AircraftCarrier, Ship, Battlecruiser } from "./Ship.js";
import { Game } from "./Game.js"
import { Bot } from "./Bot.js";

const welcomeDiv = document.querySelector('.welcome');
const gameContainer = document.querySelector('.game-container-wrapper')
const finalMessage = document.querySelector('.final-message')

welcomeDiv.addEventListener('click', event => {
    welcomeDiv.classList.add('hidden')
    gameContainer.classList.remove('hidden')
})
finalMessage.addEventListener('click', event => {
    location.reload()
})


const game = new Game;
game.start()




