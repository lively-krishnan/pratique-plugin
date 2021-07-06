import _isPlaceholder from "./_isPlaceholder";

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments)
    }
  }
}

export default _curry1