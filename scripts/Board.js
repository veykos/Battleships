
import { AircraftCarrier, Battlecruiser, Ship } from "./Ship.js";

export class Board {
    constructor(faction) {
        let aircraft1vert = new AircraftCarrier('vertical');
        let aircraft2 = new AircraftCarrier;
        let bc1vert = new Battlecruiser('vertical');
        let bc2 = new Battlecruiser;
        let ship1 = new Ship;
        let ship2 = new Ship;
        this.gamingTiles = [];
        this.ships = [aircraft1vert,aircraft2,bc1vert,bc2,ship1,ship2];
        this.faction = faction
        this.shipTiles;
    }

    updateShipTiles() {
        let temp_length = 0;
        for (let row of this.gamingTiles){
            let filtrd_arr = row.filter(tile => tile === 1)
            temp_length += filtrd_arr.length
        }
        this.shipTiles = temp_length
        let number_span = document.querySelector('#'+ this.faction + '-' + 'ships');
        number_span.innerText = temp_length;
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
            if (size === 1) {
                if (this.gamingTiles[row][col] === 1) {
                    return console.log('Invalid')
                }
            } else {
                for (let i = start_for_hor ; i < size + start_for_hor; i++) {
                    if (this.gamingTiles[row][i] === 1 || this.gamingTiles[row][i] === undefined) {
                        return console.log('Invalid')
                        // FOR NOW CONSOLE LOG LATER FIX
                    } 
                }
            }
            if (size === 1) {
                this.gamingTiles[row][col] = 1;
            } else {
                for (let i = start_for_hor ; i < size + start_for_hor; i++) {
                    this.gamingTiles[row][i] = 1;
                }

            }
            return tileCoordinatesObject; // not sure if works
            
            // ADD LOGIC FOR VERTICAL CHECKING
        } else if (orientation === 'vertical') {
            // check if row will be out of bound !! 
            if (start_for_ver < 0 || (row + ((size-1) / 2)) > 9) {
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

            return tileCoordinatesObject;
        }
    }
    
    arrayToTile(tileCoordinatesObject) {
        let row = tileCoordinatesObject.row;
        let col = tileCoordinatesObject.col;
        return  document.querySelector('.' + this.faction + '-' + col + row)
    }
    
    tileToArray(tileCoordinatesObject) {
        let row = tileCoordinatesObject.row;
        let col = tileCoordinatesObject.col;
        return this.gamingTiles[row][col];
    }
    
    markTile(tileCoordinatesObject) {
        // LOGIC IS IF IT WAS EMPTY NOW ITS 'X0' - X FOR MARKED 0 FOR EMPTY
        // IF IT WAS WITH A SHIP  ITS 'X1'- X FOR MARKER 1 FOR SHIP
        // function receives a coordinates object {col:,row:}
        let col = tileCoordinatesObject.col;
        let row = tileCoordinatesObject.row;
        if (this.gamingTiles[row][col] === 0) {
            this.gamingTiles[row][col] = 'X0'
            return 0 
        } else if (this.gamingTiles[row][col] === 1) {
            this.gamingTiles[row][col] = 'X1' 
            return 1 // these return values should later be used to make AI
        } else if (this.gamingTiles[row][col] === 'X1' || this.gamingTiles[row][col] === 'X0') {
            // IF ITS ALREADY MARKED DO NOTHING
            return
        }
    }


    colorTilesPlayer() {
        for (let row = 0; row < this.gamingTiles.length; row ++) {
            for (let col = 0; col < this.gamingTiles[row].length; col ++) {
                let coordinates_obj = {'col' : col, 'row' : row};
                let selected_tile = this.arrayToTile(coordinates_obj)
                if (this.gamingTiles[row][col] === 1) {
                    selected_tile.classList.add('occupied')}
                if (this.gamingTiles[row][col] === 'X1') 
                    selected_tile.classList.add('hit-empty')
                if (this.gamingTiles[row][col] === 'X0') {
                    selected_tile.classList.add('hit-with-ship')
                }
                
            }
        }
    }

    colorTilesEnemy() {
        for (let row = 0; row < this.gamingTiles.length; row ++) {
            for (let col = 0; col < this.gamingTiles[row].length; col ++) {
                let coordinates_obj = {'col' : col, 'row' : row};
                let selected_tile = this.arrayToTile(coordinates_obj)
                 if (this.gamingTiles[row][col] === 'X1') {
                    selected_tile.classList.add('hit-with-ship')
                } else if (this.gamingTiles[row][col] === 'X0') {
                    selected_tile.classList.add('hit-empty')
                }
            }
        }
        

    }

    getRandomCoordinates() {
        let row = Math.floor(Math.random() * this.gamingTiles.length)
        let col = Math.floor(Math.random() * this.gamingTiles[0].length)
        return {'col' : col, 'row' : row}
    }
    
    placeFlotilia() {
        for (let ship of this.ships) {
            while(ship.col === undefined || ship.row === undefined) {
                let ship_coord = this.placeShip(this.getRandomCoordinates(), ship)
                if (ship_coord) {
                    ship.col = ship_coord.col;
                    ship.row = ship_coord.row;
                }
            }
        }

    }



}