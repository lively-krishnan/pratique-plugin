
(function (global, factory) {

})(this, function (exports: any) {
  'use strict';

  /**
 * 创建一个数组，数组中的元素被分成长度为' size '的组。
 * 如果' array '不能被平均分割，最后的块将是剩余的
 * 
 * @category Array
 * @param {Array} array 
 * @param {number} [size = 1]
 * @returns {Array}
 * @example
 * 
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
  const chunk = (array: any[], size: number = 1): any[] => {
    size = Math.max(toInterger(size), 0)
    const len = array == null ? 0 : array.length
    if (!len || size < 1) return []

    const result = new Array(Math.ceil(len / size))

    let index = 0
    let resIndex = 0

    while (index < len) {
      result[resIndex++] = array.slice(index, (index += size))
    }

    return result
  }

  const toInterger = (value: number): number => {
    const remainder = value % 1
    return remainder ? value - remainder : value
  }

  exports.chunk = chunk
  exports.toInterger = toInterger
  Object.defineProperty(exports, '__esModule', { value: true })
})