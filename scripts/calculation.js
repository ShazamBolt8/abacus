import { themeSwitcher } from "./slider.js";

const display = document.querySelector('.display-calculation');
const buttons = document.querySelectorAll('.input-container button');

let calculation = '';

calculateAnswer();
themeSwitcher();

function calculateAnswer() {
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonHTML = button.innerHTML;
  
      switch (buttonHTML) {
        case 'del':
          calculation = calculation.slice(0, -1);
          break;
        case 'reset':
          calculation = '';
          break;
        case '=':
          const result = eval(calculation);
          calculation = result.toLocaleString();
          break;
        case '×':
          calculation += '*';
          break;
        default:
          calculation += buttonHTML;
          break;
      }
  
      display.innerHTML = calculation;
    });
  });
}