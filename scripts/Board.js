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

    
}

