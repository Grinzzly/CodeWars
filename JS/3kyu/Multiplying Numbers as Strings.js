const multiply = (a, b) => {
    const aRev = Array.from(a.toString()).reverse(),
        bRev = Array.from(b.toString()).reverse(),
        res = [],
    reversedMultiply = (k, currM, currA) => {
        res[k] = currM + currA;
        if (res[k] > 9) {
            const prevD = Math.floor(res[k] / 10),
                prevA = k + 1 >= res.length ? 0 : res[k + 1];
            res[k + 1] = prevD + prevA;
            res[k] -= prevD * 10;
        }
    },
    prepareLoop = (currA, aI) => {
        bRev.map((currB, bI) => {
            const keyI = aI + bI,
                multiplyCurrent = currA * currB,
                additionCurrent = keyI >= res.length ? 0 : res[keyI];
            reversedMultiply(keyI, multiplyCurrent, additionCurrent)
        })
    };
    aRev.map(prepareLoop);
    return res.reverse().join('').replace(/^0+/, '') || '0';
};