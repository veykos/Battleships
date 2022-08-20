import { Ship } from "./Ship.js";

export class Board {
    constructor() {
        this.gamingTiles = [];
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
        
        this.gamingTiles[row][col] = 'X' // for now only changes tile to X
    }

    placeShip(tileCoordinatesObject) {
        let col = tileCoordinatesObject.col;
        let row = tileCoordinatesObject.row;
        let new_ship = new Ship(row,col)
        this.gamingTiles[row][col] = new_ship
    }
}

