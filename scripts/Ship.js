export class Ship {
    constructor(row,col) {
        this.col = col;
        this.row = row;
        this.size = 1;
        this.orientation = 'horizontal';
    }
}

export class Battlecruiser extends Ship {
    constructor(row,col) {
        super(row,col)
        this.size = 3;
        this.orientation = 'horizontal'
    }
}

export class AircraftCarrier extends Ship {
    constructor(row,col) {
        super(row,col)
        this.size = 5;
        this.orientation = 'horizontal'
    }
}