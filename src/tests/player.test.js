import gameboard from '../modules/gameboard'
import ship from '../modules/ship';
import player from '../modules/player';

describe('My player', () => {
    let newGameboard = gameboard();
    let board;
    let newShip = ship();
    let newPlayer = player();

    beforeEach(() => {
        newShip = ship(3);
        board = gameboard().createGameboard;
    });

    test('player attacks specific coordinates', () => {
        newGameboard.placeShipAt(board, newShip, 1, 1, true);
        newPlayer.attack(board, 1, 1);
        newPlayer.attack(board, 2, 1);
        newPlayer.attack(board, 3, 1);
        expect(newGameboard.isGameOver(board)).toBe(true);
    });

    test('player cannot attack a position that already has been hit', () => {
        expect(newPlayer.attack(board, 2, 1)).toBe(false);
    });

    test('random attack', () => {
        newGameboard.placeShipAt(board, newShip, 8, 4, false);
        for (let i = 0; i < 100; i++) {
            newPlayer.randomAttack(board);
        }
        expect(newGameboard.isGameOver(board)).toBe(true);
    });
});