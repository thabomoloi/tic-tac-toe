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
    _mode = "easy";
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
    /**
     * 
     * @param {string} mode 
     */
    changeMode(mode) {
        this._mode = mode;
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
    /**
     * 
     * @param {Mode} mode 
     */
    setMode(mode) {
        this.mode = mode;
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
 * 
 */
const GameController = (playerLetter, gamemode) => {
    const mode = new Mode(gamemode);
    const game = new TicTacToe(mode);

    game.setPlayerLetter(playerLetter);
    const setPlayerLetter = (letter) => {
        game.setPlayerLetter(letter);
    }
    const playerMove = (position) => {
        game.humanMove(position);
        if (!game.gameOver())
            game.computerMove();
    }
    const gameOver = () => {
        return game.gameOver();
    }
    const winner = () => {
        return game.isWin("X") ? "X" : (game.isWin("O") ? "O" : "T");
    }
    const setMode = (amode) => {
        mode.setMode(amode);
        game.setMode(mode);
    }
    return { setPlayerLetter, playerMove, gameOver, winner, setMode };
}



//=========================================================================

const modeDropdown = document.querySelector("select");
const xButton = document.querySelector("button.btn.btn-player.x");
const oButton = document.querySelector("button.btn.btn-player.o");
const gridCells = document.querySelectorAll("button.board-cell");
const svgs = document.querySelector("button.board-cell svg");
const restartButton = document.querySelector("button.btn-restart");

var mode = new Mode("easy");
const game = new TicTacToe(mode);
const gameController = new GameController("X", mode);

const clearBoard = () => {

}
modeDropdown.addEventListener("change", () => {
    mode = new Mode(modeDropdown.value.toLowerCase());
});
xButton.addEventListener("click", () => {
    game.setPlayerLetter("X");
    clearBoard();
});