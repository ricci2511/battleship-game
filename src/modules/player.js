import gameboard from "./gameboard";

const player = () => {
    let hitPositions = [];
    const myGameboard = gameboard();

    const positionHasBeenHit = (x, y) => {
        return hitPositions.map(position => position.toString()).includes([x, y].toString());
    };

    const attack = (board, x, y) => {
        if (positionHasBeenHit(x, y)) return false;
        hitPositions.push([x,y]);
        myGameboard.receiveAttack(board, x, y);
        return true;
    };

    const randomAttack = (board) => {
        // since our gameboard is a 10x10 grid there cannot be more than 100 hits
        if (hitPositions.length === 100) return;

        let xCoord = Math.floor(Math.random() * 10);
        let yCoord = Math.floor(Math.random() * 10);

        // calculate random coords until we get coords that have not yet been hit
        while(positionHasBeenHit(xCoord, yCoord)) {
            xCoord = Math.floor(Math.random() * 10);
            yCoord = Math.floor(Math.random() * 10);
        }

        hitPositions.push([xCoord, yCoord]);
        myGameboard.receiveAttack(board, xCoord, yCoord);
    };

    return {
        attack: (board, x, y) => attack(board, x, y),
        randomAttack: (board) => randomAttack(board),
        getHitPositions: hitPositions,
    }
};

export default player;
