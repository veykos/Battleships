

// select the enemy board and create the table :)

const enemyBoard = document.querySelector('.enemy-board')


for (let i = 0; i < 8; i++) {
    let oneRow = document.createElement('div')
    oneRow.className = 'enemy-' + i
    for (let x = 0; x < 10; x++) {
        let tiles_letter = 'abcdefgh'
        let oneTile = document.createElement('div')
        oneTile.className = 'enemy-' + i + tiles_letter[x]
        oneTile.classList.add('enemy-tile')
        oneTile.classList.add('tile')


        oneRow.appendChild(oneTile);
    }
    enemyBoard.appendChild(oneRow)
}

const playerBoard = document.querySelector('.player-board')


for (let i = 0; i < 8; i++) {
    let oneRow = document.createElement('div')
    oneRow.className = 'player-' + i
    for (let x = 0; x < 10; x++) {
        let tiles_letter = 'abcdefgh'
        let oneTile = document.createElement('div')
        oneTile.className = 'player-' + i + tiles_letter[x]
        oneTile.classList.add('player-tile')
        oneTile.classList.add('tile')


        oneRow.appendChild(oneTile);
    }
    playerBoard.appendChild(oneRow)
}
