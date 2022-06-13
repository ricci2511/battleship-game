const gameboard = () => {
    // 10x10 grid
    const MAX_SIZE = 10;
    let board = [];
    let missedAttacks = [];

    const createGameboard = () => {
        for (let i = 0; i < MAX_SIZE; i++) {
            board[i] = [];
            missedAttacks[i] = [];
            for (let j = 0; j < MAX_SIZE; j++) {
                board[i][j] = '~';
                missedAttacks[i][j] = '~';
            }
        }
        return board;
    };

    /**
     * isShipPlaceable() makes sure the ship can be placed on the gameboard
     * checks if the x and y coords are valid (cannot be greater than 10 neither less than 0)
     * checks if the ship fits on the gameboard (axis position + ship length cannot be greather than 10)
     * checks if the ship doesnt collide with another ship already placed on the gameboard
     */
    const isShipPlaceable = (ship, x, y, vertical) => {
        if (x >= MAX_SIZE || y >= MAX_SIZE || x < 0 || y < 0) return false;

        if (vertical) {
            if ((x + ship.length) >= MAX_SIZE) return false;

            for (let i = 0; i < ship.length; i++) {
                if (board[x][y] !== '~') return false;
                x++;
            }
        } else {
            if ((y + ship.length) >= MAX_SIZE) return false;

            for (let i = 0; i < ship.length; i++) {
                if (board[x][y] !== '~') return false;
                y++;
            }
        }

        return true;
    };

    /** 
     * placeShipAt() spans the ship through multiple grid cells (depends on its length)
     * when vertical it will span through the x axis, when horizontal through the y axis
    */
    const placeShipAt = (board, ship, x, y, vertical) => {
        if (board[x][y] === ship) return;
        if (!isShipPlaceable(ship, x, y, vertical)) return;

        for (let i = 0; i < ship.length; i++) {
            (vertical) 
                ? board[x + i][y] = ship 
                : board[x][y + i] = ship;
        }
    };

    /**
     * receiveAttack() calls the ship takeHit() function in case the coordinates correspond to a ship 
     * every attack that doesnt hit a ship will be tracked in the missedAttacks array
     */
    const receiveAttack = (board, x, y) => {
        if (x >= MAX_SIZE || y >= MAX_SIZE || x < 0 || y < 0) return;
        if (board[x][y] !== '~') {
            const attackedShip = board[x][y];
            const isVertical = board[x + 1][y] !== '~' || board[x - 1][y] !== '~';
            const isHorizontal = board[x][y + 1] !== '~' || board[x][y - 1] !== '~';
            if (isHorizontal) attackedShip.takeHit(y);
            if (isVertical) attackedShip.takeHit(x);
        } else {
            missedAttacks[x][y] = true;
        }
    };

    /**
     * isGameOver() loops through the 2D gameboard checking if every ship has sunk
     * returns false if it finds at least one ship that has not sunk, otherwise it returns true
     */
    const isGameOver = (board) => {
        for (let i = 0; i < MAX_SIZE; i++) {
            for (let j = 0; j < MAX_SIZE; j++) {
                if (board[i][j] !== '~') {
                    if(!board[i][j].isSunk()) return false;
                }
            }
        }

        return true;
    };

    return {
        createGameboard: createGameboard(),
        board: board,
        missedAttacks: missedAttacks,
        isGameOver: (board) => isGameOver(board),
        placeShipAt: (board, ship, x, y, vertical) => placeShipAt(board, ship, x, y, vertical),
        receiveAttack: (board, x, y) => receiveAttack(board, x, y),
    }
};

export default gameboard;
