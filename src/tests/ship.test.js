import ship from '../modules/ship'

describe('My Ship', () => {
    let newShip = ship();

    beforeEach(() => {
        newShip = ship(5);
    });

    test('create ship with length 5', () => {
        expect(newShip.length).toBe(5);
    });
    
    test('ship takes a hit at position 3', () => {
        newShip.takeHit(3);
        expect(newShip.getHits()).toContain(3);
    });

    test('ship cannot take a hit at position 3 again', () => {
        expect(newShip.takeHit(3)).toBeFalsy();
    });

    test('ship cannot take a hit at a position less than 0', () => {
        expect(newShip.takeHit(-1)).toBeFalsy();
    });

    test('ship cannot take a hit at a position greater than its length', () => {
        expect(newShip.takeHit(6)).toBeFalsy();
    });

    test('ship has sunk', () => {
        for (let i = 0; i < newShip.length; i++) {
            newShip.takeHit(i);
        }
        expect(newShip.isSunk()).toBe(true);
    });
});
