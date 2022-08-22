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

        
        this.enemy.generateBoard();
        this.player.generateBoard();
        // generate the playing boards
        this.enemy.placeFlotilia();
        // this.player.placeFlotilia();
        this.enemy.updateShipTiles();
        this.player.updateShipTiles();
        // place enemy ships and our ships :)
        

            let acVert = document.querySelector('#AC1')
            let acHor = document.querySelector('#AC2')
            let bcVert = document.querySelector('#BC1')
            let bcHor = document.querySelector('#BC2')
            let sh1 = document.querySelector('#SH1')
            let sh2 = document.querySelector('#SH2')

            let selected_ship_div;
            let selected_ship;

            const ships_buttons = [acVert,acHor,bcVert,bcHor,sh1,sh2]
            for (let i = 0; i < ships_buttons.length; i++) {
                ships_buttons[i].addEventListener('click', event => {
                    selected_ship_div = event.target;
                    let selected_ship_div_idx = ships_buttons.indexOf(selected_ship_div)
                    console.log(ships_buttons.indexOf(selected_ship_div))
                    selected_ship = this.player.ships[selected_ship_div_idx]
                })
            }
            
            // creating the enemy tiles
            const enemyBoard = document.querySelector('.enemy-board')
            for (let i = 0; i < 8; i++) {
                let oneRow = document.createElement('div')
                oneRow.className = 'enemy-' + i
                for (let x = 0; x < 10; x++) {
                    let oneTile = document.createElement('div')
                    oneTile.className = 'enemy-' + i + x
                    oneTile.classList.add('enemy-tile')
                    oneTile.classList.add('tile')
                    oneRow.appendChild(oneTile);
                }
                enemyBoard.appendChild(oneRow)
            }

            // creating the player board and adding event listener
            // and logic for placing the ships
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
                        let all_ships_positioned = false;
                        let tile_coord = getTileCoordinates(event.target);
                        if (selected_ship.col === undefined) {
                            let ship_coord = this.player.placeShip(tile_coord, selected_ship);
                            if (ship_coord) {
                                selected_ship.col = ship_coord.col
                                selected_ship.row = ship_coord.row
                                selected_ship_div.style.display = 'none'
                            }
                        }
                        this.player.updateShipTiles();
                        this.player.colorTilesPlayer();
                        let ships_positions = this.player.ships.map(ship => ship.col)
                        if (ships_positions.every(ele => ele !== undefined)) {
                            this.shoot();
                        }
                        console.log(ships_positions)
                        

                    })
                    oneRow.appendChild(oneTile);
                }
                playerBoard.appendChild(oneRow)
            



        }
    }

    shoot() {

            // creating the tiles and adding querySelector to enemyBoard
            let enemy_tiles = document.querySelectorAll('.enemy-tile')
            for (let i = 0; i < enemy_tiles.length; i ++) {

            
                enemy_tiles[i].addEventListener('click', event => {
                    let tile = getTileCoordinates(event.target)
                    this.enemy.markTile(tile);
                    this.enemy.updateShipTiles()
                    this.enemy.colorTilesEnemy();
                    this.checkForWin();
                    // somehow put some Timeout here
                    this.aiShoot();
                    this.player.updateShipTiles();
                    this.player.colorTilesPlayer();
                    this.checkForWin();
                    // CHECK FOR WIN?
                    // on click should get the tile coordinates from DOM;
                    // then mark the tile
                
                })
        }
        }
            

                //creating the tiles and adding querySelector to playerBoard
                // do we even need querySelector for playerBoard?
                // const playerBoard = document.querySelector('.player-board')
                // for (let i = 0; i < 8; i++) {
                //     let oneRow = document.createElement('div')
                //     oneRow.className = 'player-' + i
                //     for (let x = 0; x < 10; x++) {
                //         let oneTile = document.createElement('div')
                //         oneTile.className = 'player-' + i + x
                //         oneTile.classList.add('player-tile')
                //         oneTile.classList.add('tile')
                //         oneRow.appendChild(oneTile);
                //     }
                //     playerBoard.appendChild(oneRow)
                // }
                // end of tile creation and tiles event listeners
                //
                //SOMEWHERE HERE THE AI SHOULD ATTACK :#
                // //
                // this.enemy.colorTilesEnemy();
                // this.player.colorTilesPlayer();
                // This will color the tiles in proper color after any action has happened

            
        
            
    
    


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
        this.player.markTile(this.player.getRandomCoordinates())
        // later try to implement something for better AI
    }


}
