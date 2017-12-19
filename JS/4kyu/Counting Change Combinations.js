const countChange = (money, coins) => {
  if(money < 0 || coins.length === 0) {
    return 0
  } else if(money === 0) {
    return 1
  } else {
    return countChange(money - coins[0], coins) + countChange(money, coins.slice(1))
  }
};