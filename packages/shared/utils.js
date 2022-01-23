const isUndef = (v) => v === undefined || v === null
const isDef = (v) => v !== undefined && v !== null
const isTrue = (v) => v === true
const isFalse = (v) => v === false
const isObject = (obj) => obj !== null && typeof obj === 'object'

// eslint-disable-next-line no-underscore-dangle
const _toString = Object.prototype.toString

// 原始类型
const toRawType = (val) => _toString.call(val).slice(8, -1).toLocaleLowerCase()
// 严格检查
const isPlainObject = (obj) => _toString.call(obj) === '[object Object]'
const isRegExp = (v) => _toString.call(v) === '[object RegExp]'
const isPromise = (val) => isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function'
const isMap = (val) => _toString.call(val) === '[object Map]'
const isFunction = (val) => _toString.call(val) === '[object Function]'

const returnTrue = (v) => v.filter(isTrue)
const returnFlase = (v) => v.filter(isFalse)

// 创建一个映射并返回一个函数来检查是否为键
// 用来检测保留字
const markMap = (str, expectsLowerCase) => {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val]
}

// eslint-disable-next-line no-underscore-dangle
const _hasOwnProperty = Object.prototype.hasOwnProperty

// 查找自有属性
function hasOwn(obj, key) {
  return _hasOwnProperty.call(obj, key)
}

// 判断是否是一个合法的键值对数组
const is2DArray = (val) => {
  if (!Array.isArray(val)) throw new Error('Please pass in the array format')

  for (const key of val) {
    if (!Array.isArray(key)) throw new Error(`Check the array format, You need to pass in a two-dimensional array`)
    if (key.length !== 2) throw new Error('Check the array format, It is a key-value pair format')
  }

  return true
}

/**
 * 记录数组内元素出现的次数
 */
const elementsNum = (arr) => {
  return arr.reduce((pre, cur) => {
    if (!pre[cur]) {
      pre[cur] = 1
    } else {
      pre[cur]++
    }
    return pre
  }, {})
}

/**
 * 深拷贝
 * detection: 防止循环引用数据 溢出等
 * hasOwnProperty： 只拷贝自身属性，防止拷贝上原型的对象
 */
const deepClone = (obj, detection = new WeakMap()) => {
  if (typeof obj !== 'object' || obj == null) return obj

  if (detection.has(obj)) return detection.get(obj)

  const result = obj instanceof Array ? [] : {}
  detection.set(obj, result)

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], detection)
    }
  }
  return result
}

export {
  isUndef,
  isDef,
  isTrue,
  isFalse,
  isObject,
  toRawType,
  isPlainObject,
  isRegExp,
  isPromise,
  isMap,
  isFunction,
  markMap,
  hasOwn,
  is2DArray,
  elementsNum,
  deepClone,
  returnTrue,
  returnFlase,
}
