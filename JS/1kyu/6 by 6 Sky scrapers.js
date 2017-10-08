function solvePuzzle(clues) {

    // Getter and Setter
    function getRow(n) {
        let dict = {0: 5, 1: 4, 2: 3, 3: 2, 4: 1, 5: 0};
        if (n < 6) {
            return toSolve.map(x => x[n]);
        } else if (n < 12) {
            return toSolve[n-6].concat().reverse();
        } else if (n < 18) {
            return toSolve.map(x => x[dict[n-12]]).concat().reverse();
        } else {
            return toSolve[dict[n-18]];
        }
    }
    function setRow(n, arr) {
        let dict = {0: 5, 1: 4, 2: 3, 3: 2, 4: 1, 5: 0};
        if (n < 6) {
            toSolve.forEach((x,i) => toSolve[i][n] = arr[i]);
        } else if (n < 12) {
            toSolve[n-6] = arr.concat().reverse();
        } else if (n < 18) {
            toSolve.forEach((x,i) => toSolve[i][dict[n-12]] = arr[dict[i]]);
        } else {
            toSolve[dict[n-18]] = arr;
        }
        return true;
    }

    // Get alternate row for a row element
    // (there are always two rows for every element)
    function alternateRow(currentNRow, currentQ) {
        let next = (Math.floor(currentNRow / 6) + 1) * 6;
        if (next > 23) next = 0;
        return next + currentQ;
    }

    // Raid Row and Alternate row for an element
    function raidRows(currentNRow, currentQ, n) {
        let rowA = getRow(currentNRow),
            alternate = alternateRow(currentNRow, currentQ),
            rowB = getRow(alternate);
        setRow(alternate, rowB.map(x => x.filter(y => y !== n)));
        rowA = rowA.map(x => x.filter(y => y !== n));
        rowA[currentQ] = [n];
        setRow(currentNRow, rowA);
    }

    // Generate all possible distributions for each clue/peaks
    function genPermutesForPeaks() {
        function peaks(arr) {
            let acc = 1, peak = 1;
            arr.forEach((x,i) => {
                if (i === 0) {
                    peak = arr[i];
                }
                else if (arr[i] > peak) {
                    peak = arr[i];
                    acc++;
                }
            });
            return acc;
        }
        function genPermutes(valArr, times) {
            function permutes(arr, add) {
                let arr2 = [];
                arr.forEach(x => {
                    add.forEach(y => {
                        arr2.push([...x,y]);
                    });
                });
                return arr2;
            }
            let arr = valArr.map(x => [x]);
            for (let i = 0; i < times-1; i++) {
                arr = permutes(arr, valArr);
            }
            return arr;
        }
        let allPermutes = genPermutes([1,2,3,4,5,6], 6)
            .filter(x => x.concat().sort((a,b) => a-b)
                .join() === '1,2,3,4,5,6');
        return {
            0: allPermutes,
            1: allPermutes.filter(x => peaks(x) === 1),
            2: allPermutes.filter(x => peaks(x) === 2),
            3: allPermutes.filter(x => peaks(x) === 3),
            4: allPermutes.filter(x => peaks(x) === 4),
            5: allPermutes.filter(x => peaks(x) === 5),
            6: allPermutes.filter(x => peaks(x) === 6)
        }
    }

    // Solving
    function solveFirstPass() {
        for (let i = 0; i < clues.length; i++) {
            // Iterate over all 24 rows
            let clue = clues[i];
            if (clue !== 0) {
                let row = getRow(i);
                if (clue === 1) {
                    raidRows(i, 0, 6);
                }
                else if (clue === 6) {
                    raidRows(i, 0, 1);
                    raidRows(i, 1, 2);
                    raidRows(i, 2, 3);
                    raidRows(i, 3, 4);
                    raidRows(i, 4, 5);
                    raidRows(i, 5, 6);
                }
            }
        }
    }
    function checkOnlyChanceRow(rowN) {
        getRow(rowN).forEach((x,i,arr) => {
            if (x.length > 1) {
                let others = arr.filter((x,i2) => i2 !== i).join().split(',');
                x.forEach((x, i2) => {
                    if (others.indexOf(String(x)) === -1) {
                        raidRows(rowN, i, x);
                        checkOnlyChanceRow(rowN);
                        checkOnlyChanceRow(alternateRow(rowN, i));
                    }
                });
            }
        });
    }
    function runRowLogic(rowN) {
        function permutesForPeaksAndRow(rowArr, peaks) {
            let ans = [],
                thesePerms = permutesForPeaks[peaks].filter(x => (
                    rowArr[0].indexOf(x[0]) !== -1
                    && rowArr[1].indexOf(x[1]) !== -1
                    && rowArr[2].indexOf(x[2]) !== -1
                    && rowArr[3].indexOf(x[3]) !== -1
                    && rowArr[4].indexOf(x[4]) !== -1
                    && rowArr[5].indexOf(x[5]) !== -1
                ));
            for (let i = 0; i < 6; i++) {
                ans.push(thesePerms.map(x => x[i]).filter((x,i2,arr) => arr.indexOf(x) === i2));
            }
            return ans;
        }
        let clue = clues[rowN],
            row = getRow(rowN);
        row = permutesForPeaksAndRow(row, clue);
        setRow(rowN, row);
    }
    function runAllRows() {
        let prevSolve = JSON.stringify(toSolve);
        for (let rowN = 0; rowN < clues.length; rowN++) {
            checkOnlyChanceRow(rowN);
            runRowLogic(rowN);
        }
        if (prevSolve !== JSON.stringify(toSolve) && toSolve.join().split(',').length !== 24) runAllRows();
    }

    // Solving
    clues = [...clues,...Array(24-clues.length).fill(0)]; // Safety Check
    let t = [1,2,3,4,5,6],
        aOfT = [t.concat(), t.concat(), t.concat(), t.concat(), t.concat(), t.concat()],
        toSolve = [aOfT.concat(), aOfT.concat(), aOfT.concat(), aOfT.concat(), aOfT.concat(), aOfT.concat()],
        permutesForPeaks = genPermutesForPeaks();

    solveFirstPass();
    runAllRows();
    return toSolve.map(x => x.map(y => y[0]));
}