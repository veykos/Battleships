
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
        // make the logic for placing the ship and checking if position is valid 
        if (orientation === 'horizontal') {
            // check if any position is already occupied or out of bounds
            for (let i = col - ((size-1)/2) ; i < size; i++) {
                if (this.gamingTiles[row][i] === 1 || this.gamingTiles[row][i] === undefined) {
                    return console.log('Invalid')
                    // FOR NOW CONSOLE LOG LATER FIX
                } 
            }
            for (let i = col - ((size-1)/2) ; i < size; i++) {
                this.gamingTiles[row][i] = 1;
            }
        } else if (orientation === 'vertical') {
            for (let i = row - ((size-1)/2) ; i < size; i++) {
                if (this.gamingTiles[i][col] === 1 || this.gamingTiles[i][col] === undefined) {
                    return console.log('Invalid')
                    // FOR NOW LOG LATER FIX
                }
            }
            for (let i = row - ((size-1)/2) ; i < size; i++) {
                this.gamingTiles[i][col] = 1;
            }
        }
    }



}

