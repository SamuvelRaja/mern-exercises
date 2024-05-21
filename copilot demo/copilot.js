function minstohours(minutes) {
  return Math.floor(minutes / 60) + 'h ' + minutes % 60 + 'm';
}
console.log(minstohours(120)); // 2h 0m
