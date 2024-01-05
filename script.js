const calculatorDispalyEl = document.querySelector("h1");
const inputBtnsEl = document.querySelectorAll("button");
const clearBtnEl = document.getElementById("clear-btn");

// Calculate Values depending on Operators
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //   Replace display value if first value is entered
  if (awaitingNextValue) {
    calculatorDispalyEl.textContent = number;
    awaitingNextValue = false;
  } else {
    // If Value is 0, replace it, if not Add
    const displayValue = calculatorDispalyEl.textContent;
    calculatorDispalyEl.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator prfessed don't add decimal
  if (awaitingNextValue) return;
  // If no Decimal, Add one
  if (!calculatorDispalyEl.textContent.includes(".")) {
    calculatorDispalyEl.textContent = `${calculatorDispalyEl.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDispalyEl.textContent);
  //   To prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //   Assign first if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDispalyEl.textContent = calculation;
    firstValue = calculation;
  }
  //   Ready to store next Value
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset all Values &  Display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDispalyEl.textContent = "0";
}

// Add EventListner for Numbers, Operators, decimal buttons
inputBtnsEl.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

clearBtnEl.addEventListener("click", resetAll);
