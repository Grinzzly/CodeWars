function createMessage(str1) {
  return (str2) => {
    return (!str2) ? str1 : createMessage(str1 + ' ' + str2);
  }
}