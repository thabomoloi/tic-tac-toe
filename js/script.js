const Player = (aName, aShape) => {
    const name = aName;
    const shape = aShape;
    const play = (positon, gameboard) => {
        gameboard[positon] = shape;
    }
    return { name, shape, play };
}

const GameBoard = () => {
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    const isWin = (shape) => {
        for (let i = 0; i < 9; i++) {

        }
    }
}