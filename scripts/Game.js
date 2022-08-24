import { Board } from "./Board.js"
import { Bot } from "./Bot.js";
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
        this.message_board = document.querySelector('.message')
        const botAi = new Bot();
        this.botAI = botAi;
        this.botAI.positionsShot = ['{"row":3,"col":3}']
    }
    
    start() {

        
        this.enemy.generateBoard();
        this.player.generateBoard();
        // generate the playing boards
        this.enemy.placeFlotilia();
        //this.player.placeFlotilia();
        // COMMENT FOR NORMAL GAMEPLAY
        this.enemy.updateShipTiles();
        this.player.updateShipTiles();
        // place enemy ships and our ships :)
        
        this.message_board.innerText = 'POSITION YOUR FLEET!'

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
                selected_ship = this.player.ships[selected_ship_div_idx]
                this.message_board.innerText = `${selected_ship_div.innerText} - ${selected_ship.orientation.toUpperCase()}`
            })
        }

        const rotate_button = document.querySelector('.rotate-sign')
        rotate_button.addEventListener('click', event => {
            if (selected_ship.orientation === 'horizontal') {
                selected_ship.orientation = 'vertical'
                this.message_board.innerText = `${selected_ship_div.innerText} - ${selected_ship.orientation.toUpperCase()}`
            } else {
                selected_ship.orientation = 'horizontal'
                this.message_board.innerText = `${selected_ship_div.innerText} - ${selected_ship.orientation.toUpperCase()}`
            }
        })
        
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
                    let tile_coord = getTileCoordinates(event.target);
                    if (selected_ship.col === undefined) {
                        let ship_coord = this.player.placeShip(tile_coord, selected_ship);
                        if (ship_coord) {
                            selected_ship.col = ship_coord.col
                            selected_ship.row = ship_coord.row
                            selected_ship_div.classList.add('hidden')
                            this.message_board.innerText = 'PLACE YOUR SHIPS'
                        } else {
                            this.message_board.innerText = 'INVALID SHIP POSITION'
                        }
                    }
                    this.player.updateShipTiles();
                    this.player.colorTilesPlayer();
                    let ships_positions = this.player.ships.map(ship => ship.col)
                    if (ships_positions.every(ele => ele !== undefined)) {
                        rotate_button.classList.add('hidden')
                        this.shoot();
                    }
                    

                })
                oneRow.appendChild(oneTile);
            }
            playerBoard.appendChild(oneRow)
        



        }
    }

    shoot() {
        const enemy_msg = document.querySelector('.enemy-msg')
        const player_msg = document.querySelector('.player-msg')
        // REMOVE THE PLAYER TILES EVENTLISTENERS BY CLONING THEM
        // THIS FIXES THE MULTISHOT BUG
        const playerTiles = document.querySelectorAll('.player-tile')
        for (let i = 0; i < playerTiles.length; i++) {
            playerTiles[i].replaceWith(playerTiles[i].cloneNode(true))
        }
        ////

        this.message_board.innerText = 'DESTROY THE ENEMY FLEET!'
        // creating the tiles and adding querySelector to enemyBoard

        
        let enemy_tiles = document.querySelectorAll('.enemy-tile')
        for (let i = 0; i < enemy_tiles.length; i ++) {
            enemy_tiles[i].addEventListener('click', event => {
                let tile = getTileCoordinates(event.target)
                let player_shoot_result = this.enemy.markTile(tile);
                if (player_shoot_result === 1) {
                    player_msg.innerText = 'DIRECT HIT!'
                } else {
                    player_msg.innerText = 'CALIBRATE THE TURRETS!'
                }
                this.enemy.updateShipTiles()
                this.enemy.colorTilesEnemy();
                this.checkForWin();
                let enemy_shoot_result = this.botAI.shoot(this.player)
                // Timeout the coloring and checking of result
                setTimeout(() => {
                    this.player.updateShipTiles()
                    if (enemy_shoot_result === 1) {
                        enemy_msg.innerText = 'THEY HIT OUR SHIP!'
                    } else {
                        enemy_msg.innerText = 'THEY MISSED!'
                    }
                }, 900)
                setTimeout(() => this.player.colorTilesPlayer(), 1100)
                setTimeout(() => this.checkForWin(), 1300)
                // this.player.updateShipTiles();
                // this.player.colorTilesPlayer();
                // this.checkForWin();

            
            })
        }
    }

    checkForWin() {
        // check for win of player: 
        const final_msg = document.querySelector('.final-message')
        const game_container = document.querySelector('.game-container-wrapper')
        if (this.enemy.shipTiles === 0) {
            final_msg.innerText = 'YOU WIN !'
            final_msg.classList.remove('hidden')
            game_container.classList.add('hidden')
        }
        else if (this.player.shipTiles === 0) {
            final_msg.innerText = 'YOU LOSE !'
            final_msg.classList.remove('hidden')
            game_container.classList.add('hidden')
        }
    };
}
