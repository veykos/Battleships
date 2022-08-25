export function getTileCoordinates(tileClicked) {
  const tileCoordinatesAndFaction = tileClicked.classList[0];
  const tempArray = tileCoordinatesAndFaction.split("-");
  const tileCoordinates = {
    col: parseInt(tempArray[1][0]),
    row: parseInt(tempArray[1][1]),
  };
  return tileCoordinates;
}
