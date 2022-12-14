export class Bonus {
  constructor() {
    this.uses = 1;
    this.inUse = false;
  }
}

export class Cluster extends Bonus {
  constructor(uses, inUse) {
    super(uses, inUse);
  }

  use(tileCoordinatesObject, board) {
    let col = tileCoordinatesObject.col;
    let row = tileCoordinatesObject.row;
    let resultsFromUse = [];
    let tilesHit = [];
    // check if proper coordinates
    if (col > 6 || col < 1 || row > 9 || row < 1) {
      return console.log("Incorrect tile for using bonus");
      //for now console log later just return
    }
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        let coordinates = { col: c, row: r };
        tilesHit.push(coordinates);
        let result = board.markTile(coordinates);
        resultsFromUse.push(result);
      }
    }
    this.uses -= 1;
    if (resultsFromUse.includes(1)) {
      return [1, tilesHit];
    } else {
      return [0, tilesHit];
    }
  }
}

export class Volley extends Bonus {
  constructor(uses, inUse) {
    super(uses, inUse);
  }
  use(tileCoordinatesObject, board) {
    let row = tileCoordinatesObject.row;
    let tilesHit = [];
    let resultsFromUse = [];
    for (let c = 0; c < 8; c++) {
      let coordinates = { col: c, row: row };
      tilesHit.push(coordinates);
      let result = board.markTile(coordinates);
      resultsFromUse.push(result);
    }
    this.uses -= 1;
    if (resultsFromUse.includes(1)) {
      return [1, tilesHit];
    } else {
      return [0, tilesHit];
    }
  }
}
