class Player {
    /** letter of the player */
    _letter = "";
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

class Mode {
    _mode = "";
    /**
     * Creates a new easy mode.
     */
    constructor() {
        this._mode = "easy";
    }
    /**
     * Creates a new mode.
     * @param {string} mode 
     */
    constructor(mode) {
        this._mode = mode;
    }
    /**
     * Get valid move depending on the mode.
     * @param {string[]} gameboard 
     */
    getMove(gameboard) {
        empty = this.findEmpty(gameboard);
        if (this._mode === "easy") {
            return empty[Math.floor(Math.random() * empty.length)];
        }
        if (this._mode === "medium") {

        }

    }
    /**
     * Finds empty positions in a gameboard.
     * @param {string[]} gameboard 
     * @returns An array of empty positions.
     */
    findEmpty(gameboard) {
        empty = []
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === "")
                empty.append(i);
        }
        return empty;
    }
}

class TicTacToe {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    mode = new Mode();
    human = new Player("X");
    computer = new Player("O");

    /**
     * Creates a new game with a new mode.
     * @param {Mode} mode 
     */
    constructor(mode) {
        this.mode = mode;
    }
    /**
     * Sets the letter of the player.
     * @param {string} letter 
     */
    setPlayerLetter(letter) {
        this.human.setLetter(letter);
        this.computer.setLetter((letter === "X") ? "O" : "X");
    }
    clearBoard() {
        this.gameboard = ["", "", "", "", "", "", "", "", ""];
    }
    restart() {
        clearBoard();
    }
    isBoardFull() {
        for (let i = 0; i < this.gameboard.length; i++) {
            if (this.gameboard[i] === "")
                return false;
        }
        return true;
    }
    isWin(shape) {
        // check if shape appears 3 times in a row
        for (let i in [0, 3, 6]) {
            if (this.gameboard[i] == shape && this.gameboard[i + 1] == shape && this.gameboard[i + 2] == shape)
                return true;
        }
        // check if shape appears 3 times in a column
        for (let i in [0, 1, 2]) {
            if (this.gameboard[i] == shape && this.gameboard[i + 3] == shape && this.gameboard[i + 6] == shape)
                return true;
        }
        // check if shape appears 3 times in a diagonal
        for (let i in [0, 2]) {
            if (this.gameboard[i] == shape && this.gameboard[4] == shape && this.gameboard[8 - i] == shape)
                return true;
        }
        return false;
    }
    isTie() {
        if (!this.isBoardFull)
            return false;
        return (!(this.isWin("X") || this.isWin("O")));
    }
    gameOver() {
        return (this.isWin("X") || this.isWin("O") || this.isTie());
    }
    /**
     * 
     * @param {number} position 
     */
    humanMove(position) {
        if (this.gameboard[position] === "") {
            this.human.play(this.gameboard, position);
            return true;
        }
        else {
            return false;
        }
    }
    computerMove() {
        if (this.gameboard[position] === "") {
            this.computer.play(this.gameboard, this.mode.getMove(this.gameboard));
            return true;
        }
        else {
            return false;
        }
    }

}

/**
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