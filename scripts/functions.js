export function getTileCoordinates(tileClicked) {
    const tileCoordinatesAndFaction = tileClicked.classList[0]
    const temp_array = tileCoordinatesAndFaction.split('-')
    const tileFaction = temp_array[0]
    const tileCoordinates = {'col': temp_array[1][0], 'row':temp_array[1][1]}
    console.log(tileFaction,tileCoordinates)
    return tileCoordinates
}

export function distributeToProperFaction() {
    
}