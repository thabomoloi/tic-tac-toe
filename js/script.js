const findMoves = (() => {
    /**
     * Gets the move in an easy mode.
     * Looks for an empty random space.
     * @param {string[]} gameboard 
     */
    const easyPlay = (gameboard) => {
        const empty = [];
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === "")
                empty.push(i);
        }
        return empty[Math.floor(Math.random() * empty.length)];
    }
    /**
     * 
     * @param {string[]} gameboard 
     * @param {string} letter
     */
    const mediumPlay = (gameboard, letter) => {

    }
    /**
     * Finds the move of a computer.
     * @param {string[]} gameboard
     * @param {string} letter 
     * @param {string} mode 
     */
    const findMove = (gameboard, letter, mode) => {
        if (mode === "easy")
            return easyPlay(gameboard);
        if (mode === "medium")
            return mediumPlay(gameboard, letter);
    }

    return { findMove };
})();

const TicTacToe = (gamemode, letter) => {
    const human = letter;
    const computer = letter === "X" ? "O" : "X";
    const mode = gamemode;
    const board = ["", "", "", "", "", "", "", "", ""];

    /**
     * Check if a board is full.
     */
    const isBoardFull = () => {
        for (let i = 0; i < board.length; i++)
            if (board[i] === "")
                return false;
        return true;
    }

}