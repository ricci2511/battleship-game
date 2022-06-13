import gameboard from '../modules/gameboard'
import ship from '../modules/ship';

describe('My gameboard', () => {
    let newGameboard = gameboard();
    let board;
    let newShip = ship();

    beforeEach(() => {
        newShip = ship(5);
        board = gameboard().createGameboard;
        newGameboard.placeShipAt(board, newShip, 1, 1, true);
    });
    
    test('create and initialize gameboard', () => {
        const gameboardArrExample = [
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
            ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~']
        ]
        expect(newGameboard.createGameboard).toEqual(gameboardArrExample);
    });

    test('place ship of length 5 at second column second row', () => {
        expect(board[1][1]).toEqual(newShip);
        expect(board[5][1]).toEqual(newShip);
    });

    test('ship cannot be placed at the same coordinates again', () => {
        expect(newGameboard.placeShipAt(board, newShip, 1, 1, true)).toBeUndefined();
    });

    test('ship cannot be placed if it doesnt fit in the board', () => {
        const anotherShip = ship(4)
        expect(newGameboard.placeShipAt(board, anotherShip, 8, 8, true)).toBeUndefined();
    });

    test('ship cannot be placed if its length colides with another ship', () => {
        const anotherShip = ship(4)
        expect(newGameboard.placeShipAt(board, anotherShip, 1, 0, false)).toBeUndefined();
    });

    test('ship can be placed if its inside the board and it does not colide with another ship', () => {
        const anotherShip = ship(4)
        newGameboard.placeShipAt(board, anotherShip, 7, 2, false);
        expect(board[7][2]).toEqual(anotherShip);
    });

    test('ship receives attack and verify that the correct ship position got hit', () => {
        newGameboard.receiveAttack(board, 5, 1);
        expect(newShip.getHits().includes(5)).toBe(true);
    });

    test('ship sinks after hitting all of its positions', () => {
        for (let i = 1; i <= 5; i++) {
            newGameboard.receiveAttack(board, i, 1);
        }
        expect(newShip.isSunk()).toBe(true);
    });

    test('track missed attacks', () => {
        newGameboard.receiveAttack(board, 4, 5);
        expect(newGameboard.missedAttacks[4][5]).toBe(true);
    });

    test('gameboard is empty, all ships have been sunk', () => {
        for (let i = 1; i <= 5; i++) {
            newGameboard.receiveAttack(board, i, 1);
        }
        expect(newGameboard.isGameOver(board)).toBe(true);
    });
});
