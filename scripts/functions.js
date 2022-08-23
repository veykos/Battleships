export function getTileCoordinates(tileClicked) {
    const tileCoordinatesAndFaction = tileClicked.classList[0]
    const temp_array = tileCoordinatesAndFaction.split('-')
    const tileFaction = temp_array[0]
    const tileCoordinates = {'col': parseInt(temp_array[1][0]), 'row': parseInt(temp_array[1][1])}
    return tileCoordinates
}