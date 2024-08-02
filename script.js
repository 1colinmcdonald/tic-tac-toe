const Gameboard = (function () {
    let grid = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];
    const displayBoard = () => {
        for (i = 0; i < grid.length; i++) {
            console.log(grid[i]);
        }
    }
    const placePiece = (row, column, piece) => {
        if (row >= 0 && row < 3 && column >= 0 && column < 3 && grid[row][column] === '_') {
            grid[row][column] = piece;
            return 0;
        }
        return -1;
    }
    const validateLocation = (row, column) => {

    }
    return { displayBoard };
})();

function createPlayer(number) {
    let name = ""
    const playerNumber = number;
    const setName = () => {
        name = prompt(`Player ${number} name:`);
    }
    return { setName };
}

const Game = (function () {
    let player1 = null;
    let player2 = null;
    let turn = null;
    let players = [];
    const getRandomInt = max => {
        return Math.floor(math.random() * max);
    }

    const startGame = () => {
        players = [createPlayer(1), createPlayer(2)];
        players[0].setName()
        player[1].setName()
    }
    const nextTurn = () => {
        if (turn === null) {
            return getRandomInt(2);
        }
    }

    return { startGame }
})();

Game.startGame();