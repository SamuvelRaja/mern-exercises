function sumTo100() {
  let sum = 0;
  for (let i = 1; i <= 10000000000; i++) {
    sum += i;
  }
  console.log("The sum of numbers from 1 to 100 is:", sum);
}
// sumTo100()

// Example usage:
setTimeout(sumTo100, 0)
console.log("init")
