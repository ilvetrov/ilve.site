import { blockScroll } from "./block-scroll";

export function showPopUp(popUp) {
  popUp = detectPopUpInVariable(popUp);
  if (!popUp || popUp.classList.contains('process')) return false;

  popUp.classList.remove('disabled');
  blockScroll(popUp.getAttribute('data-pop-up'));
  setTimeout(() => {
    popUp.classList.remove('hidden');
  }, 100);
  
  const closeAnywhere = popUp.hasAttribute('data-pop-up-close-anywhere');
  if (closeAnywhere) {
    setTimeout(() => {
      popUp.classList.add('ready-to-close');
    }, 1500);
  }
}

function detectPopUpInVariable(popUp) {
  if (typeof popUp === 'string' || typeof popUp === 'number') {
    popUp = document.querySelector(`[data-pop-up="${popUp}"]`);
  }
  return popUp;
}