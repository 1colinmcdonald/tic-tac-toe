const Gameboard = (function () {
    let grid = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

    const getGrid = () => {
        return grid;
    }

    const placePiece = (row, column, piece) => {
        if (validLocation(row, column)) {
            grid[row][column] = piece;
            return 0;
        }
        return -1;
    }

    const validLocation = (row, column) => {
        return (row >= 0 && row < 3 && column >= 0 && column < 3 && grid[row][column] === ' ');
    }

    // Returns 'X' if 'X' won, 'O' if 'O' won or ' ' if no one has won yet
    const checkForWinner = () => {
        for (let i = 0; i < grid.length; i++) {
            let winning = true;
            const horizontalOne = grid[i][0];
            const horizontalTwo = grid[i][1];
            const horizontalThree = grid[i][2];
            if (horizontalOne !== ' ' && horizontalOne === horizontalTwo && horizontalOne === horizontalThree) {
                return horizontalOne;
            }
            const verticalOne = grid[0][i];
            const verticalTwo = grid[1][i];
            const verticalThree = grid[2][i];
            if (verticalOne !== ' ' && verticalOne === verticalTwo && verticalOne === verticalThree) {
                return verticalOne;
            }
        }
        if (grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
            return grid[0][0];
        }
        if (grid[0][2] !== ' ' && grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
            return grid[0][2];
        }
        return ' ';
    }

    const isBoardFull = () => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === ' ') {
                    return false;
                }
            }
        }
        return true;
    }

    // Returns 'X' if X won, 'O' if O won, 'tie' if neither player won, or 'ongoing' if the game is not over yet
    const getGameStatus = () => {
        const winner = checkForWinner();
        if (winner !== ' ') {
            return winner;
        }
        if (isBoardFull()) {
            return 'tie';
        }
        return 'ongoing';
    }

    function clearGrid() {
        grid = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    }

    return { getGrid, placePiece, checkForWinner, isBoardFull, getGameStatus, clearGrid };
})();

const displayController = (function () {
    const board = document.querySelector('#board');
    const turn = document.querySelector(".game-state");

    const renderBoard = () => {
        const grid = Gameboard.getGrid();
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                board.querySelector(`:nth-child(${i * grid[0].length + j + 1})>.piece`).textContent = grid[i][j];
            }
        }
    }

    const initializeDisplay = () => {
        const startButton = document.querySelector(".start");
        const startForm = document.querySelector("form");
        const resetButton = document.querySelector(".reset");

        function clickSquare(e) {
            const index = Array.prototype.indexOf.call(board.children, e.target);
            Game.attemptMove(Math.trunc(index / 3), index % 3);
        }
        
        startForm.onsubmit = (e) => {
            e.preventDefault();
            Game.startGame(document.querySelector("#player1").value, document.querySelector('#player2').value);
            startForm.style.visibility = "hidden";
            renderBoard();
            board.style.visibility = 'visible';
            board.addEventListener('click', clickSquare);
            resetButton.style.visibility = 'visible';
        }

        resetButton.addEventListener('click', () => {
            startForm.style.visibility = 'visible';
            board.removeEventListener('click', clickSquare);
            Gameboard.clearGrid();
            board.style.visibility = 'hidden';
            clearTurn();
            resetButton.style.visibility = 'hidden';
        });
    }

    function displayWhoseTurn(name) {
        turn.textContent = name + "\'s turn";
    }

    function clearTurn() {
        turn.textContent = '';
    }

    return { renderBoard, initializeDisplay, displayWhoseTurn };
})();

function createPlayer(number) {
    let name = "";
    let piece = "";
    const playerNumber = number;
    const setName = (playerName) => {
        name = playerName;
    }
    const getName = () => {
        return name;
    }
    const makeMove = (row, column) => {
        if (Object.is(row, NaN) || Object.is(column, NaN)) {
            return -1;
        }
        return Gameboard.placePiece(row, column, piece);
    }
    const setPiece = (symbol) => {
        piece = symbol;
    }
    return { setName, getName, makeMove, setPiece };
}

const Game = (function () {
    let turn = 1;
    let players = [];

    const attemptMove = (row, column) => {
        let state = Gameboard.getGameStatus();
        if (state === 'ongoing') {
            if (players[nextTurn()].makeMove(row, column) === 0) {
                turn = nextTurn();
                displayController.renderBoard();
                state = Gameboard.getGameStatus();
                if (state === 'tie') {
                    console.log("It's a tie!");
                }
                else if (state === 'X') {
                    console.log(`${players[0].getName()} won!`);
                }
                else if (state === 'O') {
                    console.log(`${players[1].getName()} won!`);
                }
                else {
                    displayController.displayWhoseTurn(players[nextTurn()].getName());
                }
            }
        }
    }

    const startGame = (player1Name, player2Name) => {
        players = [createPlayer(1), createPlayer(2)];
        players[0].setPiece("X");
        players[0].setName(player1Name);
        players[1].setPiece("O");
        players[1].setName(player2Name);
        displayController.renderBoard();
        displayController.displayWhoseTurn(players[nextTurn()].getName());
    }

    const nextTurn = () => {
        return (turn + 1) % 2;
    }

    return { startGame, attemptMove }
})();

displayController.initializeDisplay();

displayController.renderBoard();