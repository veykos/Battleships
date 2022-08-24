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
        this.inUse = true;
        let col = tileCoordinatesObject.col;
        let row = tileCoordinatesObject.row;

    } 
}