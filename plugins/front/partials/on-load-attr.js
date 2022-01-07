window.addEventListener('load', function() {
  const elements = document.querySelectorAll('[data-on-load-attr]');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const tagName = element.getAttribute('data-on-load-attr');
    const value = element.getAttribute(`data-on-load-${tagName}`);
    element.setAttribute(tagName, value);

    if (modes.hasOwnProperty(tagName)) modes[tagName](element);
  }
});

const modes = {
  src(source) {
    const video = source.parentElement;
    video.load();
  }
}