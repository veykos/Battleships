
import { getTileCoordinates } from "./functions.js";
import { Board } from "./Board.js";

// generate the 2 playing boards
const enemyPlayingBoard = new Board();
enemyPlayingBoard.generateBoard();
console.log(enemyPlayingBoard)

const playerPlayingBoard = new Board();
playerPlayingBoard.generateBoard();
console.log(playerPlayingBoard)



// Select the enemy board and create the tile layout
const enemyBoard = document.querySelector('.enemy-board')
for (let i = 0; i < 8; i++) {
    let oneRow = document.createElement('div')
    oneRow.className = 'enemy-' + i
    for (let x = 0; x < 10; x++) {
        let oneTile = document.createElement('div')
        oneTile.className = 'enemy-' + i + x
        oneTile.classList.add('enemy-tile')
        oneTile.classList.add('tile')
        oneTile.addEventListener('click', event => {
            getTileCoordinates(event.target)
            // Return tile faction and coordinates on click 
        })

        oneRow.appendChild(oneTile);
    }
    enemyBoard.appendChild(oneRow)
}
// Select the enemy board and create the player layout
const playerBoard = document.querySelector('.player-board')
for (let i = 0; i < 8; i++) {
    let oneRow = document.createElement('div')
    oneRow.className = 'player-' + i
    for (let x = 0; x < 10; x++) {
        let oneTile = document.createElement('div')
        oneTile.className = 'player-' + i + x
        oneTile.classList.add('player-tile')
        oneTile.classList.add('tile')
        oneTile.addEventListener('click', event => {
            getTileCoordinates(event.target)
            // Return tile faction and coordinates on click 
        })

        oneRow.appendChild(oneTile);
    }
    playerBoard.appendChild(oneRow)
}

playerPlayingBoard.placeShip({'col':2,'row':3})
console.log(playerPlayingBoard.retrieveTileFromArray({'col':2,'row':3}))