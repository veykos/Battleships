import { Board } from "./Board.js"


class Game {
    constructor() {
        const enemyPlayingBoard = new Board('enemy');
        const playerPlayingBoard = new Board('player');
        this.enemy = enemyPlayingBoard;
        this.player = playerPlayingBoard;
        this.states = ['placing','shooting'];
        this.state = this.states[0]
    }

    start() {
        //Should have 2 different working states - one for placing ships
        // one for shooting - difference will be the function that is
        // applied to a mouse click on a tile -> Overwriting the function
        // depending on the state?
        if (this.state = 'shooting') {
            while (true) {
                // creating the tiles and adding querySelector to enemyBoard
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
                //creating the tiles and adding querySelector to playerBoard
                // do we even need querySelector for playerBoard?
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


            }
        }
    };
    
    checkForWin();


}