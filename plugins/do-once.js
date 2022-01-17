const done = [];

function doOnce(name, action) {
  if (done.indexOf(name) === -1) {
    done.push(name);
    return action();
  }
  return undefined;
}

module.exports = {
  doOnce
}