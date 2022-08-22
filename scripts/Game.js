import { Board } from "./Board.js"
import { getTileCoordinates } from "./functions.js";
import { AircraftCarrier, Ship, Battlecruiser } from "./Ship.js";



export class Game {
    constructor() {
        const enemyPlayingBoard = new Board('enemy');
        const playerPlayingBoard = new Board('player');
        this.enemy = enemyPlayingBoard;
        this.player = playerPlayingBoard;
        this.states = ['placing','shooting'];
        this.state = this.states[0]
    }
    
    start() {

        // generating some ships for testing purposes
        let one_battlecruiser = new Battlecruiser
        let one_aircraftcarrier = new AircraftCarrier
        let one_ship = new Ship
        let second_aircraftcarrier = new AircraftCarrier
        second_aircraftcarrier.orientation = 'vertical'
        // end of generation of ships and place the ships on enemy board :)
        
        this.enemy.generateBoard();
        this.player.generateBoard();
            
        this.enemy.placeShip({'col':3,'row':7}, second_aircraftcarrier)
        this.enemy.placeShip({'col':2,'row':3}, one_battlecruiser)
        this.enemy.placeShip({'col':5,'row':5}, one_aircraftcarrier);
        this.enemy.placeShip({'col':6,'row':4}, one_ship)
        this.player.placeShip({'col':3,'row':7}, second_aircraftcarrier)

        //Should have 2 different working states - one for placing ships
        // one for shooting - difference will be the function that is
        // applied to a mouse click on a tile -> Overwriting the function
        // depending on the state?
        this.enemy.updateShipTiles()
        this.player.updateShipTiles()

        if (this.state = 'shooting') {
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
                            let tile = getTileCoordinates(event.target)
                            this.enemy.markTile(tile);
                            this.enemy.updateShipTiles()
                            this.enemy.colorTilesEnemy();
                            this.checkForWin();
                            // CHECK FOR WIN?
                            // on click should get the tile coordinates from DOM;
                            // then mark the tile
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
                        oneRow.appendChild(oneTile);
                    }
                    playerBoard.appendChild(oneRow)
                }
                // end of tile creation and tiles event listeners
                //
                //SOMEWHERE HERE THE AI SHOULD ATTACK :#
                //
                this.enemy.colorTilesEnemy();
                this.player.colorTilesPlayer();
                // This will color the tiles in proper color after any action has happened

            
        }
    };
    
    checkForWin() {
        // check for win of player: 

        if (this.enemy.shipTiles === 0) {
            console.log('Player wins the GAMEEEE!!')
        }

        else if (this.player.shipTiles === 0) {
            console.log('THE AI BEAT YOU HAHAHA')
        }
        
    };

    aiShoot () {
    }


}
