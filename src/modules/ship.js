const ship = (length) => {
    const hits = [];

    return {
        length: length,
        takeHit: (position) => {
            if (hits.includes(position) || position < 0 || hits.length >= length) return;
            hits.push(position);
        },
        isSunk: () => length === hits.length,
        getHits: () => [...hits],
    }
};

export default ship;
