const Gameboard = (function () {
    let grid = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
    const displayBoard = () => {
        for (i = 0; i < grid.length; i++) {
            console.log(grid[i]);
        }
    }

    const placePiece = (row, column, piece) => {
        if (validLocation) {
            grid[row][column] = piece;
            return 0;
        }
        return -1;
    }

    const validLocation = (row, column) => {
        return (row >= 0 && row < 3 && column >= 0 && column < 3 && grid[row][column] === '_');
    }

    // Returns 'X' if 'X' won, 'O' if 'O' won or '_' if no one has won yet
    const checkForWinner = () => {
        for (let i = 0; i < grid.length; i++) {
            let winning = true;
            const horizontalOne = grid[i][0];
            const horizontalTwo = grid[i][1];
            const horizontalThree = grid[i][2];
            if (horizontalOne !== '_' && horizontalOne === horizontalTwo && horizontalOne === horizontalThree) {
                return horizontalOne;
            }
            const verticalOne = grid[0][i];
            const verticalTwo = grid[1][i];
            const verticalThree = grid[2][i];
            if (verticalOne !== '_' && verticalOne === verticalTwo && verticalOne === verticalThree) {
                return verticalOne;
            }
        }
        if (grid[0][0] !== '_' && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
            return grid[0][0];
        }
        if (grid[0][2] !== '_' && grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
            return grid[0][2];
        }
        return '_';
    }

    const isBoardFull = () => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === '_') {
                    return false;
                }
            }
        }
        console.log(`${grid[0][0]}`);
        return true;
    }

    // Returns 'X' if X won, 'O' if O won, 'tie' if neither player won, or 'ongoing' if the game is not over yet
    const getGameStatus = () => {
        const winner = checkForWinner();
        if (winner !== '_') {
            return winner;
        }
        if (isBoardFull()) {
            return 'tie';
        }
        return 'ongoing';
    }

    return { displayBoard, placePiece, checkForWinner, isBoardFull, getGameStatus };
})();

function createPlayer(number) {
    let name = ""
    const playerNumber = number;
    const setName = () => {
        name = prompt(`Player ${number} name:`);
    }
    const makeMove = () => {
        console.log(`${name}'s turn`);
        const row = parseInt(number(prompt('row: ')));
        const column = parseInt(number(prompt('column: ')));
        if (parseInt)
        return prompt()
    }
    return { setName };
}

const Game = (function () {
    let turn = null;
    let players = [];

    const getRandomInt = max => {
        return Math.floor(math.random() * max);
    }

    const playGame = () => {
        players = [createPlayer(1), createPlayer(2)];
        players[0].setName();
        players[1].setName();
        let state = Gameboard.getGameStatus();
        console.log(`${state}`);
        Gameboard.displayBoard();
        while (state === '_') {
            player
        }
    }

    const nextTurn = () => {
        if (turn === null) {
            return getRandomInt(2);
        }
        return (turn + 1) % 2;
    }

    return { playGame }
})();

Game.playGame();