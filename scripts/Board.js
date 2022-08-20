
import { Ship } from "./Ship.js";

export class Board {
    constructor() {
        this.gamingTiles = [];
        this.ships = [];
    }

    generateBoard() {
        for (let i = 0; i < 10; i++) {
            const row = [];
            row.length = 8
            row.fill(0,0,8)
            this.gamingTiles.push(row)
        }
    }   

    retrieveTileFromArray(tileCoordinatesObject) {
        // function receives a coordinates object {col:,row:}
        let col = tileCoordinatesObject.col;
        let row = tileCoordinatesObject.row;
        return this.gamingTiles[row][col]
    }

    markTile(tileCoordinatesObject) {
        // function receives a coordinates object {col:,row:}
        let col = tileCoordinatesObject.col;
        let row = tileCoordinatesObject.row;
        if (this.gamingTiles[row][col] === 0) {
            this.gamingTiles[row][col] = 'X' // for now only changes tile to X
            // HERE FOR NOW IS .PLAYER FOR TESTING PURPOSES LATER SHOULD BE REPLACED WITH FACTION 
            document.querySelector('.player'+ + col + row).classList.add('hit-empty')
        } else if (this.gamingTiles[row][col] === 1) {
            this.gamingTiles[row][col] = 'X' // for now only changes tile to X
            document.querySelector('.player-'+ col + row).classList.add('hit-with-ship')
        }
    }

    placeShip(tileCoordinatesObject, ship) {
        let col = tileCoordinatesObject.col;
        let row = tileCoordinatesObject.row;
        let size = ship.size;
        let orientation = ship.orientation;
        let start_for_hor;
        if (size === 1) {
            start_for_hor = col - 1;
        } else {
            start_for_hor = col - ((size-1)/2) // start checking the row from (size -1) / 2
        }
        let start_for_ver;
        if (size === 1) {
            start_for_ver = row - 1;
        } else {
            start_for_ver = row - ((size-1)/2) //start the vertical check from (size -1) / 2
        }
        // make the logic for placing the ship and checking if position is valid 
        if (orientation === 'horizontal') {
            // check if any position is already occupied or out of bounds
            for (let i = start_for_hor ; i < size + start_for_hor; i++) {
                if (this.gamingTiles[row][i] === 1 || this.gamingTiles[row][i] === undefined) {
                    return console.log('Invalid')
                    // FOR NOW CONSOLE LOG LATER FIX
                } 
            }
            for (let i = start_for_hor ; i < size + start_for_hor; i++) {
                this.gamingTiles[row][i] = 1;
            }

            // ADD LOGIC FOR VERTICAL CHECKING
        } else if (orientation === 'vertical') {
            // check if row will be out of bound !! 
            if (start_for_ver < 0 || row + (size-1) / 2 > 9) {
                return console.log('Invalid')
            }
            for (let i = start_for_ver ; i < size + start_for_ver; i++) {
                if (this.gamingTiles[i][col] === 1 || this.gamingTiles[i][col] === undefined) {
                    return console.log('Invalid')
                    // FOR NOW LOG LATER FIX
                }
            }
            for (let i = start_for_ver ; i < size + start_for_ver; i++) {
                this.gamingTiles[i][col] = 1;
            }
        }
    }



}

