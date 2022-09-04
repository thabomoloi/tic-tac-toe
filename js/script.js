class Player {
    /** letter of the player */
    _letter;
    /**
     * Creates a new player.
     * @param {string} letter letter of the player.
     */
    constructor(letter) {
        this.setLetter(letter);
    }
    /**
     * Sets the letter of the player.
     * @param {string} letter 
     */
    setLetter(letter) {
        this._letter = letter;
    }
    /***
     * Retrieves the letter of the player.
     * @returns Letter of the player.
     */
    getLetter() {
        return this._letter;
    }
    /**
     * 
     * @param {string[]} gameboard 
     * @param {number} position 
     */
    play(gameboard, position) {
        gameboard[position] = this._letter;
    }

}


/**
 * const Player1 = (aShape) => {
    const shape = aShape;
    const play = (positon, gameboard) => {
        if (gameboard[positon] == "") {
            gameboard[positon] = shape;
            return true;
        }
        else
            return false;
    }
    return { shape, play };
}
class Player {

}
const RandomAI = (aLetter) => {

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
    const clear = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    return { gameboard, isWin, isTie, clear };
}

const Game = () => {
    const player = Player("X");
    const computer = Player("O");
    const mode = "Easy";
    const gameboard = GameBoard();

    const setPlayerShape = (aShape) => {
        player.shape = aShape;
        computer.shape = (aShape == "X") ? "O" : "X";
    }
    const playerMove = (position) => {
        player.play(position, gameboard.gameboard);
    }
    const computerMove = (position) => {
        computer.play(position, gameboard.gameboard);
    }
}
*/