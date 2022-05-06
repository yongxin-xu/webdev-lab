/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/

const togglePressed = ev => {
  let pressed = ev.currentTarget.getAttribute('aria-pressed') === 'true';

  ev.currentTarget.setAttribute('aria-pressed', String(!pressed));
  
  document.body.classList.toggle('dyslexia-mode');

  window.localStorage.setItem('dyslexia', String(!pressed));
};

const initPage = () => {
  const dyslexia = window.localStorage.getItem('dyslexia') === 'true';
  if (dyslexia) {
    document.body.classList.add('dyslexia-mode');
  }

  const toggle = document.querySelector('#dyslexia-toggle');
  if (dyslexia) {
    toggle.setAttribute('aria-pressed', 'true');
  }

  toggle.addEventListener('click', togglePressed);
};

initPage();
