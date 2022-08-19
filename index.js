

// select the enemy board and create the table :)

const enemyBoard = document.querySelector('.enemy-board')

const enemyBoardTable = document.createElement('table')
enemyBoard.appendChild(enemyBoardTable)

for (let i = 0; i < 8; i++) {
    let oneRow = document.createElement('tr')
    oneRow.className = 'enemy-' + i
    for (let x = 0; x < 10; x++) {
        let tiles_letter = 'abcdefgh'
        let oneTile = document.createElement('td')
        oneTile.className = 'enemy-' + i + tiles_letter[x]
        oneTile.classList.add('enemy-tile')


        oneRow.appendChild(oneTile);
    }
    enemyBoardTable.appendChild(oneRow)
}

const playerBoard = document.querySelector('.player-board')
const playerBoardTable = document.createElement('table')
playerBoard.appendChild(playerBoardTable)

for (let i = 0; i < 8; i++) {
    let oneRow = document.createElement('tr')
    oneRow.className = 'player-' + i
    for (let x = 0; x < 10; x++) {
        let tiles_letter = 'abcdefgh'
        let oneTile = document.createElement('td')
        oneTile.className = 'player-' + i + tiles_letter[x]
        oneTile.classList.add('player-tile')


        oneRow.appendChild(oneTile);
    }
    playerBoardTable.appendChild(oneRow)
}
