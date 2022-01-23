/**
 * @function requestWithTimeout
 * @desc 请求超时函数
 *
 * @param { Promise } fn 传入一个 promise
 * @param { number=} [timeout=0] 设置超时
 *
 * @see /test/requestWithTimeout.spec.js
 * @author Geng xiaojun
 *
 * @example
 * fn 函数在 timeout 时间内完成则返回 request 结果 否则抛出 Error:timeout
 * requestWithTimeout(fn<Promise>, timeout).then(res => {}, reason => {})
 */
const waitTimeout = (ms) => new Promise((resolve, reject) => setTimeout(reject, ms, 'Error: timeout'))

export const requestWithTimeout = (fn, timeout) => {
  if (typeof fn !== 'function') throw new Error('This parameter requires passing a function')
  if (typeof timeout !== 'number') timeout = 0

  const performFn = fn()
  if (!(performFn instanceof Promise)) throw new Error('Inside should be a promise')

  const performArr = [performFn, waitTimeout(timeout)]

  return Promise.race(performArr)
}
