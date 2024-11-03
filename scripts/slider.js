const slider = document.querySelector('.slider');

const body = document.body;

export function themeSwitcher() {
  body.classList.add('theme1');

  slider.addEventListener('input', () => {
    
    clearTheme();
  
    switch (Number(slider.value)) {
      case 1:
        body.classList.add('theme1');
        break;
  
      case 2:
        body.classList.add('theme2');
        break;
  
      case 3:
        body.classList.add('theme3');
        break;
    }
  });
}

function clearTheme() {
  body.classList.remove('theme1');
  body.classList.remove('theme2');
  body.classList.remove('theme3');
}