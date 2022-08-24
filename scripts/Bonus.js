export class Bonus {
    constructor() {
        this.uses;
        this.inUse = false
    }
}

export class Cluster extends Bonus {
    constructor() {
        super(uses)

    }

    use(tileCoordinatesObject,board) {
        if (this.uses > 0) {

            this.inUse = true;
            let col = tileCoordinatesObject.col;
            let row = tileCoordinatesObject.row;
            // check if proper coordinates
            if ((col > 6 || col < 1) || (row > 9 || row < 1)) {
                return console.log("Incorrect tile for using bonus")
                //for now console log later just return
            }
        for (let r = row - 1; i < 3; i++) {
            for (let c = col -1; c < 3; c++) {
                let coordinates = {'col':c, 'row':r}
                board.markTiles(coordinates)
                }
            }
        } else {
            return 'No more uses left'
        }
    } 
    
}