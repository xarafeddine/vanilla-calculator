const $plus = document.getElementById("+");
const $one = document.getElementById("1");
const $two = document.getElementById("2");
const $yourInputs = document.getElementById("yourInputs");
const $results = document.getElementById("results");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
// const buttons = document.querySelectorAll("button");
const equals = document.querySelector(".equals");
const AC = document.querySelector("#AC");

let firstNumber = "";
let lastNumber = "";
let operation;
let result = "";

const handleNumberClick = (e) => {
  const number = e.target.innerText;

  if (number === "." && lastNumber.includes(".")) return;
  // console.log(value)
  lastNumber += number;
  result += number;
  showInputs(result);
};

const handleOperatorClick = (e) => {
  const op = e.target.innerText;

  if (lastNumber === "") return;
  if (firstNumber !== "") {
    compute();
  }
  operation = op;
  firstNumber = lastNumber;
  lastNumber = "";

  //   console.log(firstNumber, lastNumber);

  result += op;

  showInputs(result);
};

// function handleClick(e) {
//   const value = e.target.innerText;
//   console.log(value);
//   result += value;
// }

// buttons.forEach((number) => {
//   number.addEventListener("click", (e) => {
//     handleClick(e);
//     showValue();
//   });
// });

addEventListeners();

function showInputs(value) {
  console.log("firstNumber", firstNumber);
  console.log("lastNumber", lastNumber);
  console.log("operation", operation);
  $yourInputs.innerText = value;
}

function addEventListeners() {
  operators.forEach((op) => {
    op.addEventListener("click", (e) => {
      handleOperatorClick(e);
    });
  });

  numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
      handleNumberClick(e);
    });
  });

  equals.addEventListener("click", () => {
    showResults(compute());
  });

  AC.addEventListener("click", () => {
    clear();
  });
}

// function caluculate(result) {
//   const numbers = result.split(/[+\-\*%\/]/);
//   const ops = [...result.match(/[+\-\*%\/]/g)];
//   let rslt = 0;

//   for (let i = 0; i < numbers.length - 1; i += 2) {
//     numbers[i] + numbers[i + 1];
//   }

//   //   const ops = result.split(/\w+/);
//   console.log(numbers, ops);
// }

function compute() {
  let computation;
  const prev = parseFloat(firstNumber);
  const current = parseFloat(lastNumber);

  console.log(prev, current);
  const arr = [prev, current];
  if (isNaN(prev)) {
    if (isNaN(current)) return "Error";
    else return current;
  } else {
    if (isNaN(current)) return prev;
  }

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return "Error";
  }

  console.log(computation);
  lastNumber = computation;
  operation = undefined;
  firstNumber = "";
  result = computation;
  showInputs(result);

  return computation;
}

function showResults(value) {
  $results.innerText = value;
}

function clear() {
  firstNumber = "";
  lastNumber = "";
  operation = null;
  result = "";
  showResults("");

  showInputs(result);
}
