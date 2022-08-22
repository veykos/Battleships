export class Ship {
    constructor(orientation = 'horizontal', row,col) {
        this.col = col;
        this.row = row;
        this.size = 1;
        this.orientation = orientation;
    }
}

export class Battlecruiser extends Ship {
    constructor(orientation = 'horizontal', row,col) {
        super(orientation, row,col)
        this.size = 3;
    }
}

export class AircraftCarrier extends Ship {
    constructor(orientation = 'horizontal', row,col) {
        super(orientation, row,col)
        this.size = 5;
    }
}