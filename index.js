const $plus = document.getElementById("+");
const $one = document.getElementById("1");
const $two = document.getElementById("2");
const $yourInputs = document.getElementById("yourInputs");
const $results = document.getElementById("results");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const AC = document.querySelector("#AC");
const arrow = document.querySelector("#arrow");

let firstNumber = "";
let lastNumber = "";
let operation;
let result = "";

const handleNumberClick = (e) => {
  const number = e.target.innerText;

  if (number === "." && lastNumber.includes(".")) return;
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

  result += op;

  showInputs(result);
};

addEventListeners();

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
  arrow.addEventListener("click", () => {
    deleteLastElement();
  });
}

function compute() {
  let computation;
  const prev = parseFloat(firstNumber);
  const current = parseFloat(lastNumber);

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
    case "%":
      computation = prev % current;
      break;
    default:
      return "Error";
  }

  console.log(computation);
  lastNumber = computation.toString();
  operation = undefined;
  firstNumber = "";
  result = computation.toString();
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

function showInputs(value) {
  //   console.log("firstNumber", firstNumber);
  //   console.log("lastNumber", lastNumber);
  //   console.log("operation", operation);
  $yourInputs.innerText = value;
}

function deleteLastElement() {
  if (firstNumber === "") {
    if (lastNumber === "") return;
    else lastNumber = lastNumber.slice(0, lastNumber.length - 1);
  } else {
    if (lastNumber === "") {
      lastNumber = firstNumber;
      firstNumber = "";
      operation = null;
    } else lastNumber = lastNumber.slice(0, lastNumber.length - 1);
  }
  console.log("firstNumber", firstNumber);
  console.log("lastNumber", lastNumber);
  console.log("operation", operation);
  result = result.slice(0, result.length - 1);
  showInputs(result);
}
