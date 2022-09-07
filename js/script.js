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
     * @param {string[]} board 
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
        if (isWin("X", board) || isWin("O", board))
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
    var human = "X";
    var computer = "O";
    var mode = "easy"
    var board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    /**
     * Sets the letter of the player
     * @param {string} letter 
     */
    const setPlayer = (letter) => {
        human = letter;
        computer = letter === "X" ? "O" : "X";
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
            board[position] = human;
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

const openGameOverModal = (winner) => {
    const modal = document.querySelector("#gameovermodal");
    const close = document.querySelector(".close");

    modal.style.display = "block";
    close.addEventListener("click", () => {
        modal.style.display = "none";
        gameController.clearGame();
        setTimeout(() => gameController.clearGame(), 500);
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            setTimeout(() => gameController.clearGame(), 500);
        }
    })
}
const gameController = (() => {
    const ttt_check = game();
    const ttt = TicTacToe();
    const buttons = document.querySelectorAll("button.board-cell");

    const setPlayer = (letter) => {
        ttt.setPlayer(letter);
    }
    const display = (position, letter) => {
        const cell = document.querySelector(`#cell-${position}`);
        const cellSeletor = `#${cell.id} svg:${(letter == "X") ? "first-child" : "last-child"}`;
        const svg = document.querySelector(cellSeletor);
        svg.style.display = "block";
        cell.disabled = true;
    }
    const cantChange = () => {
        if ((ttt.getBoard().indexOf("X") != -1 && ttt.getBoard().indexOf("O") != -1) ||
            ttt_check.isGameOver(ttt.getBoard()))
            return true;
        return false;
    }
    const setMode = (mode) => ttt.setMode(mode);
    const play = (move, letter) => {
        if (move.moved)
            setTimeout(() => display(move.position, letter), 250);
        if (ttt_check.isGameOver(ttt.getBoard())) {
            endGame();
            if (ttt_check.isTie(ttt.getBoard()))
                openGameOverModal("T");
            else if (ttt_check.isWin("X", ttt.getBoard())) {
                openGameOverModal("X");
            }
            else {
                openGameOverModal("O");
            }
        }
    }
    const playerMove = (position) => {
        if (!ttt_check.isGameOver(ttt.getBoard())) {
            const move = ttt.humanMove(position);
            play(move, ttt.getPlayer());
            computerMove();
        }
    };
    const computerMove = () => {
        if (!ttt_check.isGameOver(ttt.getBoard())) {
            const move = ttt.computerMove();
            play(move, ttt.getAI());
        }
    }
    const endGame = () => {
        buttons.forEach((item) => {
            item.disabled = true;
        });
    }
    const clearGame = () => {
        ttt.clearBoard();
        buttons.forEach((cell) => {
            const cellSeletor = `#${cell.id} svg`;
            const svgs = document.querySelectorAll(cellSeletor);
            svgs.forEach((svg) => { svg.style.display = ""; });
            cell.disabled = false;
        });
    }

    return { setPlayer, setMode, playerMove, computerMove, clearGame, cantChange };
})();
const GAME = (() => {
    const selectMode = document.querySelector("select");
    var mode = selectMode.value.toLowerCase();
    gameController.setMode(mode);

    const xBtn = document.querySelector(".btn.btn-player.x");
    xBtn.classList.toggle("not-active");
    const oBtn = document.querySelector(".btn.btn-player.o");
    oBtn.classList.toggle("active");

    const boardBtns = document.querySelectorAll(".board-cell");
    const restartBtn = document.querySelector(".btn-restart");
    const addGameEventListeners = () => {
        //======== select event listeners ===========
        selectMode.addEventListener("change", () => {
            mode = selectMode.value.toLowerCase();
            gameController.setMode(mode);
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
            if (xBtn.classList.contains("not-active") && !gameController.cantChange()) {
                switchLetter();
                gameController.setPlayer("X");
            }
        });
        oBtn.addEventListener("click", () => {
            if (oBtn.classList.contains("not-active") && !gameController.cantChange()) {
                switchLetter();
                gameController.setPlayer("O");
                gameController.computerMove();
            }
        });

        boardBtns.forEach((item) => {
            item.addEventListener("click", () => {
                let position = parseInt(item.id.charAt(item.id.length - 1));
                gameController.playerMove(position);
            });
        });

        restartBtn.addEventListener("click", () => {
            gameController.clearGame();
        });
    }

    return { addGameEventListeners }
})();

GAME.addGameEventListeners();