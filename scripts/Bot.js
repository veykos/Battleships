export class Bot {
    constructor() {
        this.positionsShot = [];
        this.lastShotCoord;
        this.lastShotHit;
    }
    
    checkCoordinates(tileCoordinatesObject,board) {
        let receivedCoordinates = tileCoordinatesObject
        while(this.positionsShot.includes(JSON.stringify(receivedCoordinates))) {
            receivedCoordinates = board.getRandomCoordinates();
        }
        return receivedCoordinates
    }

    addShotPosition(tileCoordinatesObject, hitOrMiss) {
        this.positionsShot.push(JSON.stringify(tileCoordinatesObject));
        this.lastShotCoord = tileCoordinatesObject;
        this.lastShotHit = hitOrMiss
    }

    useBonus(bonus, board) {
        const getRandomCoordBonus = () => {
            let col = Math.floor(Math.random()*6) + 1;
            let row = Math.floor(Math.random()*9);
            return {'col': col, 'row':row}
        }

        let coordinates = getRandomCoordBonus();
        let result = bonus.use(coordinates,board)
        for (let position of result[1]) {
            this.positionsShot.push(JSON.stringify(position))
        }
        return result[0]
    }

    shoot(board) {
        let coordinates;

        function checkIfProperRow(row) {
            if (row < 0 || row > 9) {
                return false;
            } 
            return true
        }

        function checkIfProperCol(col) {
            if (col < 0 || col > 7) {
                return false;
            }
            return true
        }
        

        if (this.lastShotCoord) {
            let col = this.lastShotCoord.col;
            let row = this.lastShotCoord.row
            if (this.lastShotHit === 1) {
                let randomDirection = Math.floor(Math.random() * 4)
                if (randomDirection === 0) {
                    if (checkIfProperRow(row-1)=== true) {   
                        row -= 1;
                    } else {
                        row += 1
                    }
                    
                } else if (randomDirection === 1) {
                    if (checkIfProperCol(col+1) === true) {   
                        col += 1;
                    } else {
                        col -= 1
                    }
                } else if (randomDirection === 2) {
                    if (checkIfProperRow(row+1)=== true)  {   
                        row += 1;
                    } else {
                        row -= 1
                    }
                } else {
                    if (checkIfProperCol(col-1)=== true) {   
                        col -= 1;
                    } else {
                        col += 1
                    }
                }
                coordinates = this.checkCoordinates({'col':col,'row':row},board)
            } else {
                coordinates = this.checkCoordinates(board.getRandomCoordinates(),board)
            }
        } else {
            coordinates = this.checkCoordinates(board.getRandomCoordinates(),board)
        }
            
            
            // shoot?
            let resultOfShoot = [board.markTile(coordinates)];
            this.addShotPosition(coordinates,resultOfShoot[0])

            return resultOfShoot;
    }

}

