class Board {
    constructor(params) {
        this.gamingTiles = []
    }

    generateBoard() {
        for (let i = 0; i < 10; i++) {
            const row = [];
            row.fill(0)
            this.gamingTiles.append(row)
        }
    }   
}