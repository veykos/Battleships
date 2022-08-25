import { Game } from "./Game.js"

const welcomeDiv = document.querySelector('.welcome');
const gameContainer = document.querySelector('.game-container-wrapper')
const finalMessage = document.querySelector('.final-message')

welcomeDiv.addEventListener('click', () => {
    welcomeDiv.classList.add('hidden')
    gameContainer.classList.remove('hidden')
})
finalMessage.addEventListener('click', () => {
    location.reload()
})


const game = new Game;
game.start()




