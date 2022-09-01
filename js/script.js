const Player = (aName, aShape) => {
    const name = aName;
    const shape = aShape;
    const play = (positon, gameboard) => {
        gameboard.gameboard[positon] = shape;
    }
    return { name, shape, play };
}