import _curry2 from "./internal/_curry2";

const add = _curry2(function add(a, b): number {
  return Number(a) + Number(b)
})

export default add