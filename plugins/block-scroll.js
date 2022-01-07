import { checkMobileAgent } from "./partials/check-mobile";
import resizeWidthEventName from "./partials/width-resize-event";

let advancedElementsForScrollBlocking = () => document.getElementsByClassName('js-for-replace-scrollbar');

const bodyPaddingClass = 'js-body-padding-instead-of-scrollbar';
const paddingClass = 'js-padding-instead-of-scrollbar';

let firstInitiator = undefined;

export function blockScroll(initiator = undefined) {
  if (initiator && firstInitiator && firstInitiator !== initiator) return
  firstInitiator = initiator

  if (checkScrollbar()) {
    blockScrollBar();
  }
  document.documentElement.classList.add('block-scroll');
  document.body.classList.add('block-scroll');
}
export function unblockScroll(initiator = undefined) {
  if (initiator && firstInitiator && firstInitiator !== initiator) return
  firstInitiator = ''

  document.documentElement.classList.remove('block-scroll');
  document.body.classList.remove('block-scroll');
  unblockScrollBar();
}

export function checkBlockedScroll() {
  return document.documentElement.classList.contains('block-scroll');
}

export function blockScrollBar() {
  document.body.style.paddingRight = getScrollBarWidth() + 'px';
  document.body.classList.add(bodyPaddingClass);
  for (let i = 0; i < advancedElementsForScrollBlocking().length; i++) {
    const advancedElementForScrollBlocking = advancedElementsForScrollBlocking()[i];
    advancedElementForScrollBlocking.style.paddingRight = getScrollBarWidth() + 'px';
  }
}
function unblockScrollBar() {
  document.body.style.paddingRight = '';
  document.body.classList.remove(bodyPaddingClass);
  for (let i = 0; i < [...advancedElementsForScrollBlocking(), ...document.getElementsByClassName(paddingClass)].length; i++) {
    const advancedElementForScrollBlocking = [...advancedElementsForScrollBlocking(), ...document.getElementsByClassName(paddingClass)][i];
    if (advancedElementForScrollBlocking.style.paddingRight != '') {
      advancedElementForScrollBlocking.style.paddingRight = '';
    }
  }
}
export function blockScrollBarIn(element, cached = false) {
  if (cached) {
    element.style.paddingRight = getScrollBarWidth() + 'px';
  } else {
    element.style.paddingRight = getScrollBarWidthFrom(element) + 'px';
  }
  element.classList.add(paddingClass);
}
export function checkScrollbar() {
  return window.innerWidth > document.body.clientWidth;
}
function getScrollBarWidth() {
  const scrollBarWidth = window.innerWidth - document.body.clientWidth;
  return scrollBarWidth;
}
export function checkScrollbarIn(element) {
  return element.offsetWidth > element.clientWidth;
}
function getScrollBarWidthFrom(element) {
  return element.offsetWidth - element.clientWidth;
}

if (process.browser) {
  window.addEventListener(resizeWidthEventName, function() {
    if (checkBlockedScroll()) {
      if (checkMobileAgent()) {
        unblockScrollBar();
      } else {
        blockScrollBar()
      }
    }
  });
}