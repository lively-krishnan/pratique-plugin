import { requestWithTimeout } from '../packages/requestWithTimeout'

describe('requestWithTimeout 测试', () => {
  it('验证: 传入的是否为 函数', () => {
    expect(() => requestWithTimeout(1, 20)).toThrowError(new Error('This parameter requires passing a function'))
  })

  it('验证: 传入的是否为 promise', () => {
    function fn() {}
    expect(() => requestWithTimeout(fn, 1000)).toThrowError(new Error('Inside should be a promise'))
  })

  it('验证: time 假值超时返回结果', () => {
    // 创建一个1秒后返回的函数
    const funs = () => new Promise((resolve, reject) => setTimeout(reject, 1000, 'Error: timeout'))
    return requestWithTimeout(funs, false).catch((err) => {
      expect(err).toBe('Error: timeout')
    })
  })

  it('验证: 超时返回结果', () => {
    // 创建一个1秒后返回的函数
    const funs = () => new Promise((resolve, reject) => setTimeout(reject, 1000, 'Error: timeout'))
    return requestWithTimeout(funs, 100).catch((err) => {
      expect(err).toBe('Error: timeout')
    })
  })

  it('验证: 正常返回', () => {
    // 创建一个1秒后返回的函数
    const funs = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, '成功返回'))
    return requestWithTimeout(funs, 2000).then((res) => {
      expect(res).toBe('成功返回')
    })
  })
})
