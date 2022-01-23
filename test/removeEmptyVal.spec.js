import { removeEmptyVal } from '../packages/removeEmptyVal'

describe('remove empty value', () => {
  const obj = {
    a: 1,
    b: '',
    c: false,
    d: null,
    f: [],
    e: undefined,
    g: {},
    h: {},
  }

  it('传入是否是对象类型', () => {
    expect(removeEmptyVal(false)).toBe(false)
    expect(removeEmptyVal(1)).toBe(1)
    expect(removeEmptyVal('')).toBe('')
  })

  it('传入是否为空', () => {
    expect(removeEmptyVal({})).toEqual({})
  })

  it('keepType 不为array 类型的时候', () => {
    const obj1 = {
      a: 1,
    }
    expect(removeEmptyVal(obj1, false)).toEqual({ a: 1 })
  })

  it('出现 保留类型的时候，跳过清空', () => {
    expect(removeEmptyVal(obj, ['boolean', 'null'])).toEqual({ a: 1, c: false, d: null, f: [], g: {}, h: {} })
  })

  it('深度递归清除内容', () => {
    obj.g = {
      a: 1,
      b: '',
      c: false,
      d: null,
      f: [],
      e: undefined,
    }
    expect(removeEmptyVal(obj)).toEqual({ a: 1, f: [], g: { a: 1, f: [] }, h: {} })
  })

  it('深度递归清除内容, 保留 boolean 类型', () => {
    obj.g = {}
    obj.h = {
      a1: 1,
      b1: '',
      c1: false,
      d1: null,
      f1: [],
      e1: undefined,
    }
    expect(removeEmptyVal(obj, ['boolean'])).toEqual({ a: 1, c: false, f: [], g: {}, h: { a1: 1, c1: false, f1: [] } })
  })
})
