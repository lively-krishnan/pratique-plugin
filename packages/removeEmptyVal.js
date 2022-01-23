import { isPlainObject, toRawType } from './shared/utils'
/**
 * @function removeEmptyVal
 * @desc 深度清除空元素
 *
 * @param { object } obj 原始数据
 * @param { string[] } [keepType=[]] 需要保留的类型
 *
 * @see /test/removeEmptyVal.spec.js
 * @author Geng xiaojun
 *
 * @example
 * const obj = {a: 1, b: [], c: {}, d: boolean, e:null, f: undefined}
 * removeEmptyVal(obj,['boolean'])
 * // {a: 1, b: [], c: {}}
 *
 */
export function removeEmptyVal(obj, keepType = []) {
  if (typeof obj !== 'object' || Object.keys(obj).length === 0) return obj

  if (!Array.isArray(keepType)) keepType = []

  const newObj = {}

  for (const key in obj) {
    if (!isPlainObject(obj[key])) {
      if ((keepType && keepType.indexOf(toRawType(obj[key])) >= 0) || obj[key]) {
        newObj[key] = obj[key]
      }
    } else {
      newObj[key] = removeEmptyVal(obj[key], keepType)
    }
  }

  return newObj
}
