const initialBoard = (lawn) => {
  return lawn.map(string => string.split('')
    .map((char) => {
      if (char === 'S') {
        return { type: 'plant', value: 'S' };
      } else if (char === ' ') {
        return null;
      }

      return { type: 'plant', value: parseInt(char, 10) };
    })
  );
};

const calculateDamageArea = (board) => {
  return board.map(row =>
    row
      .filter(slot => slot && slot.type === 'plant' && slot.value !== 'S')
      .reduce((accumulator, current) => accumulator + current.value, 0)
  );
};

const plantsAndZombies = (lawn, zombies) => {
  const gameBoard = initialBoard(lawn);
  const rows = gameBoard.length;
  const spots = gameBoard[0].length;
  let gameFinished = false;
  let damageArea = calculateDamageArea(gameBoard);
  let round = 0;
  let zombiesInBoard = Array(rows).fill([]);
  let deadZombies = 0;

  while (deadZombies < zombies.length) {
    const comingZombies = zombies.filter(z => z[0] === round);

    comingZombies.forEach((zombie) => {
      zombiesInBoard[zombie[1]] = [...zombiesInBoard[zombie[1]], { y: spots, life: zombie[2] }];
    });
    zombiesInBoard = zombiesInBoard
      .map(row => row.map(zombie => Object.assign({}, zombie, { y: zombie.y - 1 })));
    zombiesInBoard.forEach((row) => {
      if (row.some(zombie => zombie.y === -1)) {
        gameFinished = true;
      }
    });

    if (gameFinished) {
      return round;
    }

    zombiesInBoard.forEach((row, index) => {
      row.forEach((zombie) => {
        if (gameBoard[index][zombie.y]) {
          gameBoard[index][zombie.y] = null;
          damageArea = calculateDamageArea(gameBoard);
        }
      });
    });

    damageArea.forEach((damage, index) => {
      let lifeLeft = -1;

      if (zombiesInBoard[index][0]) {
        while (lifeLeft < 0 && zombiesInBoard[index].length > 0) {
          lifeLeft = zombiesInBoard[index][0] ? zombiesInBoard[index][0].life - damage : null;

          if (lifeLeft === null) {
            break;
          }

          if (lifeLeft <= 0) {
            deadZombies++;
            zombiesInBoard[index].splice(0, 1);
            damage = Math.abs(lifeLeft);
          } else {
            zombiesInBoard[index][0] =
              Object.assign({}, zombiesInBoard[index][0], { life: lifeLeft });
          }
        }
      }
    });

    for (let y = spots - 1; y >= 0; y--) {
      for (let x = 0; x < rows; x++) {

        if (gameBoard[x][y] && gameBoard[x][y].value === 'S') {
          const lifeLeft = zombiesInBoard[x][0] ? zombiesInBoard[x][0].life - 1 : null;

          if (lifeLeft !== null) {

            if (lifeLeft === 0) {
              deadZombies++;
              zombiesInBoard[x].splice(0, 1)
            } else {
              zombiesInBoard[x][0] = Object.assign({}, zombiesInBoard[x][0], { life: lifeLeft });
            }
          }

          for (let i = 1, hit = false; (x - i >= 0) && (y + i < spots) && !hit; i++) {
            const zomInd = zombiesInBoard[x - i].findIndex(zom => zom.y === y + i);

            if (zomInd !== -1) {
              const life = zombiesInBoard[x - i][zomInd].life - 1;

              hit = true;

              if (!life) {
                deadZombies++;
                zombiesInBoard[x - i].splice(zomInd, 1);
              } else {
                zombiesInBoard[x - i][zomInd] =
                  Object.assign({}, zombiesInBoard[x - i][zomInd], { life });
              }
            }
          }

          for (let i = 1, hit = false; (x + i < zombiesInBoard.length)
            && (y + i < spots) && !hit; i++) {
            const zomInd = zombiesInBoard[x + i].findIndex(zom => zom.y === y + i);

            if (zomInd !== -1) {
              const life = zombiesInBoard[x + i][zomInd].life - 1;

              hit = true;

              if (life === 0) {
                deadZombies++;
                zombiesInBoard[x + i].splice(zomInd, 1);
              } else {
                zombiesInBoard[x + i][zomInd] =
                  Object.assign({}, zombiesInBoard[x + i][zomInd], { life });
              }
            }
          }
        }
      }
    }

    round++;
  }

  return null;
};
