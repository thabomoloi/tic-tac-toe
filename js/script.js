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
        // check if shape appears 3 times in a row
        for (let i in [0, 3, 6]) {
            if (gameboard[i] == shape && gameboard[i + 1] == shape && gameboard[i + 2] == shape)
                return true;
        }
        // check if shape appears 3 times in a column
        for (let i in [0, 1, 2]) {
            if (gameboard[i] == shape && gameboard[i + 3] == shape && gameboard[i + 6] == shape)
                return true;
        }
        // check if shape appears 3 times in a diagonal
        for (let i in [0, 2]) {
            if (gameboard[i] == shape && gameboard[4] == shape && gameboard[8 - i] == shape)
                return true;
        }
        return false;
    }
    const isTie = () => {
        for (let i = 0; i < 9; i++) {
            if (gameboard[i] == "")
                return false; // the board is not full
        }
        return (!(isWin("X") || isWin("O")));
    }
}