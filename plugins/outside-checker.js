export default function checkOutside(insideElement, currentElement) {
  let currentElementInInsideElement,
      childrenOfInsideElement = Array.from(insideElement.getElementsByTagName('*')),
      childrenOfInsideElementLength = childrenOfInsideElement.length;
  for (let i = 0; i < childrenOfInsideElementLength; i++) {
    const childElementOfInsideElement = childrenOfInsideElement[i];
    if (childElementOfInsideElement == currentElement) {
      currentElementInInsideElement = true;
      break;
    } else {
      currentElementInInsideElement = false;
    }
  }
  return (
    insideElement != currentElement &&
    !currentElementInInsideElement
  )
}