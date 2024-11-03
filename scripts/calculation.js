import { themeSwitcher } from "./slider.js";

const display = document.querySelector(".display-calculation");
const buttons = document.querySelectorAll(".input-container button");

let calculation = "";

function gatherInput() {
    buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (calculation == 0) calculation = "";
      switch (button.innerHTML) {
        case "DEL":
          calculation = calculation.toString().slice(0, -1);
          break;
        case "÷":
          calculation += "/";
          break;
        case "×":
          calculation += "*";
          break;
        case "AC":
          calculation = 0;
          enableAllButtons();
          break;
        case "=":
          calculate();
          break;
        default:
          calculation += button.innerHTML;
      }
      displayText(calculation.toString().replaceAll("/", "÷").replaceAll("*","×"),);
    });
  });
}

function displayText(text=calculation) {
  display.innerHTML = text;
}

function calculate() {
  if (calculation.length == 0) calculation = "0";
  try {
    calculation = calculation.toString().replace(/\b0+(\d)/g, '$1');
    let result = eval(calculation);
    if (result == "Infinity") {
      calculation = "Math Error";
      disableAllButtons();
      return;
    }
    if (result == undefined) {
      calculation = "Syntax Error";
      disableAllButtons();
      return;
    }
    if (isNaN(result)) {
      calculation = "Invalid Type";
      disableAllButtons();
      return;
    }
    result = parseFloat(result.toPrecision(15)); 
    const falseResult = parseFloat(createFalseResult(result).toPrecision(15));
    calculation = randomNumber(0, 1) ? result : falseResult;
  } catch (e) {
    switch (e.name) {
      case "SyntaxError":
        calculation = "Syntax Error";
        break;
      case "ReferenceError":
        calculation = "Unknown Value";
        break;
      default:
        calculation = "Rare Error";
        console.log(e);
    }
    disableAllButtons();
  }
}

function disableAllButtons() {
  buttons.forEach(button => {
    if (button.innerText != "AC") {
      button.disabled = true;
    }
  });
}

function enableAllButtons() {
  buttons.forEach(button => {
    button.disabled = false;
  });
}

function createFalseResult(result) {
  if (result < 150 || result % 5 == 0) {
    return result;
  }
  
  if (result % 2 == 0) {
    const a = result + 2 * randomNumber();
    const b = result - 2 * randomNumber();
    return randomNumber(0, 1) < 0.5 ? a : b;
  }
  return result;
}

function randomNumber(min=1, max=10){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function main() {
  calculation = 0;
  displayText();
  themeSwitcher();
  gatherInput();
}

main();