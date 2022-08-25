export class Ship {
  constructor(row, col, orientation = "horizontal") {
    this.col = col;
    this.row = row;
    this.size = 1;
    this.orientation = orientation;
  }
}

export class Battlecruiser extends Ship {
  constructor(row, col, orientation = "horizontal") {
    super(orientation, row, col);
    this.size = 3;
  }
}

export class AircraftCarrier extends Ship {
  constructor(row, col, orientation = "horizontal") {
    super(orientation, row, col);
    this.size = 5;
  }
}
