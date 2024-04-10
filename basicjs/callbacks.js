function sum(num1, num2, fcall) {
    let result = num1 + num2;
    fcall(result)
    return result;
}

function displayResult(data) {
    console.log("Result of the sum is : " + data);
}

function displayResultPassive(data) {
    console.log("Sum's result is : " + data);
}

// You are only allowed to call one function after this
// How will you displayResult of a sum
//this shows realworl application of callbacks
sum(1, 6, displayResultPassive)
