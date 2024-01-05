const calculatorDispalyEl = document.querySelector("h1");
const inputBtnsEl = document.querySelectorAll("button");
const clearBtnEl = document.getElementById("clear-btn");

function sendNumberValue(number) {
  // If Value is 0, replace it, if not Add
  const displayValue = calculatorDispalyEl.textContent;
  calculatorDispalyEl.textContent =
    displayValue === "0" ? number : displayValue + number;
}

function addDecimal() {
  if (!calculatorDispalyEl.textContent.includes(".")) {
    calculatorDispalyEl.textContent = `${calculatorDispalyEl.textContent}.`;
  }
}

// Add EventListner for Numbers, Operators, decimal buttons
inputBtnsEl.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset Display
function resetAll() {
  calculatorDispalyEl.textContent = "0";
}

clearBtnEl.addEventListener("click", resetAll);
