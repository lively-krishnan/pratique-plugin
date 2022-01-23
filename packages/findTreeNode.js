/* Automatically generated by '../scripts/bin/new.js' */

import { isFunction, isPlainObject, hasOwn } from './shared/utils.js'
/**
 * @function findTreeNode
 * @desc 查找包含自身节点的父级节点 （参考例子可自行扩展）
 *
 * @param { Array } tree 需要查找的树
 * @param { Function } func 判断是否节点是否相等的函数
 * @param { (String | Array ) } keyList 自定义 key 字段
 * @param { Object } customOptions 提供自定义键值,  键必须是存在的，在此基础上可以修改内置数据
 *
 * @see /test/findTreeNode.spec.js
 * @author Geng xiaojun
 *
 * @example
 * findTreeNode(tree, (data) => data.value === val, 'value')
 */

export function findTreeNode(tree, fn, keyList, customOptions = null) {
  if (!Array.isArray(tree)) return []

  if (!isFunction(fn)) throw new TypeError('Expected a function')

  const path = []
  return treeNode(tree, fn, keyList, customOptions, path)
}

function treeNode(tree, fn, keyList, customOptions, path) {
  for (const data of tree) {
    // 传入字符串，并且这个属性存在于data内，则走一维数组模式
    if (typeof keyList === 'string' && hasOwn(data, keyList)) {
      path.push(data[keyList])
      // 传入数组， 则走 object 模式，键根据 keyList 定义
    } else if (Array.isArray(keyList) && keyList.length > 0) {
      path.push(pathArrayHandle(data, keyList))
    } else {
      // 否则 整段数据返回
      path.push(data)
    }

    if (fn(data)) {
      if (!isPlainObject(customOptions) || customOptions == null) return path

      // 满足条件后 根据自定义键值，改变 data 数据
      for (const customKey in customOptions) {
        hasOwn(data, customKey) && (data[customKey] = customOptions[customKey])
      }
      return path
    }

    if (data.children && data.children.length) {
      const list = treeNode(data.children, fn, keyList, customOptions, path)
      if (list.length) return list
    }

    path.pop()
  }

  return []
}

function pathArrayHandle(data, keyList) {
  const obj = {}
  for (const key of keyList) {
    if (hasOwn(data, key)) obj[key] = data[key]
  }

  if (Object.keys(obj).length === 0) {
    throw new Error('keyList: Attribute does not exist')
  }

  return obj
}
