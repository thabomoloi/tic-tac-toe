/**
 * Contains methods for finding move of a computer
 */
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

/**
 * contains methods for checking whether the game is over and the winner.
 */
const game = (() => {
    /**
     * Check if a board is full.
     * @param {string[]} board 
     * @returns true if the board is full, else false.
     */
    const isBoardFull = (board) => {
        for (let i = 0; i < board.length; i++)
            if (board[i] === "")
                return false;
        return true;
    }
    /**
     * Check if a player has won.
     * @param {string} letter 
     * @param {string} board 
     */
    const isWin = (letter, board) => {
        // Rows
        if ((board[0] == letter && board[1] == letter && board[2] == letter) ||
            (board[3] == letter && board[4] == letter && board[5] == letter) ||
            (board[6] == letter && board[7] == letter && board[8] == letter)) {
            return true;
        }
        // Columns
        if ((board[0] == letter && board[3] == letter && board[6] == letter) ||
            (board[1] == letter && board[4] == letter && board[7] == letter) ||
            (board[2] == letter && board[5] == letter && board[8] == letter)) {
            return true;
        }
        // Diagonals 
        if ((board[0] == letter && board[4] == letter && board[8] == letter) ||
            (board[2] == letter && board[4] == letter && board[6] == letter)) {
            return true;
        }
        return false;
    }
    /**
     * checks if there is a tie.
     * @param {string[]} board 
     */
    const isTie = (board) => {
        if (isWin("X") || isWin("O"))
            return false;
        if (!isBoardFull(board))
            return false;
        return true;
    }
    /**
     * Check if the game is over.
     * @param {string[]} board 
     */
    const isGameOver = (board) => {
        return (isWin("X", board) || isWin("O", board) || isTie(board));
    }
    return { isWin, isTie, isGameOver };
});

const TicTacToe = () => {
    const human = "X";
    const computer = "O";
    const mode = "easy"
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    /**
     * Sets the letter of the player
     * @param {string} letter 
     */
    const setPlayer = (letter) => {
        human = letter;
        const computer = letter === "X" ? "O" : "X";
    }
    /**
     * 
     * @param {string} aMode 
     */
    const setMode = (aMode) => {
        mode = aMode;
    }
    const getPlayer = () => human;
    const getAI = () => computer;
    /**
     * Clears the board.
     */
    const clearBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }
    /**
     * Places the letter of playerin board.
     * @param {number} position 
     * @returns 
     */
    const humanMove = (position) => {
        if (board[position] == "") {
            board[position] == human;
            return { "moved": true, "position": position };
        }
        return { "moved": false, "position": position };
    }
    const computerMove = () => {
        let position = findMoves.findMove(board, computer, mode);
        if (board[position] == "") {
            board[position] = computer;
            return { "moved": true, "position": position };
        }
        return { "moved": false, "position": position };
    }
    return { getBoard, setPlayer, setMode, getPlayer, getAI, clearBoard, humanMove, computerMove };
}

const GAME = (() => {
    const selectMode = document.querySelector("select");
    var mode = "easy";

    const xBtn = document.querySelector(".btn.btn-player.x");
    xBtn.classList.toggle("not-active");
    const oBtn = document.querySelector(".btn.btn-player.o");
    oBtn.classList.toggle("active");

    const display = (position) => {

    }

    const addGameEventListeners = () => {
        //======== select event listeners ===========
        selectMode.addEventListener("change", () => {
            mode = selectMode.value.toLowerCase();
            console.log(mode);
        });

        //=============================================
        //============ SWITCH PLAYER ==================
        const switchLetter = () => {
            xBtn.classList.toggle("not-active");
            xBtn.classList.toggle("active");
            oBtn.classList.toggle("not-active");
            oBtn.classList.toggle("active");
        };
        xBtn.addEventListener("click", () => {
            if (xBtn.classList.contains("not-active"))
                switchLetter();
        });
        oBtn.addEventListener("click", () => {
            if (oBtn.classList.contains("not-active"))
                switchLetter();
        });
    }

    return { addGameEventListeners }
})();

GAME.addGameEventListeners();