import { generateRowData } from '../packages/generateRowData'
import { isMap } from '../packages/shared/utils'

describe('-> generateRowData.js', () => {
  describe('不规范检测', () => {
    it('检测是否有值传入', () => {
      expect(() => generateRowData()).toThrow()
    })

    it('检测是否 不规范值', () => {
      const newData = [
        ['测试数据', 'ceshi1'],
        ['测试数据2', 'ceshi2'],
      ]
      const raw = [
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
      ]
      const val = { ceshi1: 'lalalala', ceshi2: 'lalal22112121', ceshi3: 'lalalla' }
      expect(() => generateRowData(newData, raw, val, { row: false, column: false, severalColumns: null })).toThrow()
    })
  })

  describe('检测： generateRowData函数 newData 入参', () => {
    it('是否为数组, 是否为键值对数组', () => {
      expect(() => generateRowData({})).toThrow()
      expect(() => generateRowData(null)).toThrow()
      expect(() => generateRowData(undefined)).toThrow()
      expect(() => generateRowData(1)).toThrow()
    })

    it('是否符合键值对数据规范', () => {
      const test1 = [
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
      ]
      const test2 = [[1], [2]]
      const test3 = [{ 1: 2 }, { 3: 4 }]
      expect(() => generateRowData(test1)).toThrow()
      expect(() => generateRowData(test2)).toThrow()
      expect(() => generateRowData(test3)).toThrow()
    })

    it('数据是否转换', () => {
      let test4 = new Map([
        [1, 2],
        [2, 3],
      ])
      expect(isMap(test4)).toBe(true)

      if (isMap(test4)) {
        test4 = [...test4]
        expect(test4).toEqual([
          [1, 2],
          [2, 3],
        ])
      }
    })
  })

  describe('检测：generateRowData函数 raw 入参 ', () => {
    const newData = [
      ['测试数据', 'ceshi1'],
      ['测试数据2', 'ceshi2'],
    ]

    it('是否为空', () => {
      const raw = []
      const val = { ceshi1: 'lalalala', ceshi2: 'lalal22112121' }
      expect(() => generateRowData(newData, raw, val)).toThrow()
    })
  })

  describe('检测：generateRowData函数 val 入参 ', () => {
    const newData = [
      ['测试数据', 'ceshi1'],
      ['测试数据2', 'ceshi2'],
    ]
    const raw = [
      { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
    ]
    const resultRow = {
      label_1: '测试数据',
      value_1: '',
      label_2: '测试数据2',
      value_2: '',
      label_3: '',
      value_3: '',
      label_4: '',
      value_4: '',
    }
    it('数据是否规范', () => {
      const val2 = []
      expect(() => generateRowData(newData, raw, val2)).toThrow()
    })

    it('当 val 值 传了了一个空，最后赋值value_  必须也是空字符 ', () => {
      const val = {}
      const result = generateRowData(newData, raw, val)
      expect(result[0]).toEqual(resultRow)
    })

    it('当 val 值 传了了一个null，最后赋值value_  必须也是空字符 ', () => {
      const val = null
      const result = generateRowData(newData, raw, val)
      expect(result[0]).toEqual(resultRow)
    })
  })

  describe('检测: generateRowData函数 options 入参 | labelname..', () => {
    it('模拟 options.severalColumns 小于 options.column 数据', () => {
      const newData = [
        ['测试数据', 'ceshi1'],
        ['测试数据2', 'ceshi2'],
      ]
      const raw = [
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
      ]
      const val = { ceshi1: 'lalalala', ceshi2: 'lalal22112121', ceshi3: 'lalalla' }
      expect(() => generateRowData(newData, raw, val, { row: 1, column: 3, severalColumns: 1 })).toThrow()
    })

    const newData = [['测试1', 'ceshi1']]
    const raw = [{ label_1: '', value_1: '' }]

    it('修改labelName -> label_ 更改为 prop_ 是否一致 ', () => {
      const val = { ceshi1: 'lalalala' }
      expect(() => generateRowData(newData, raw, val, { row: 0, column: 0, severalColumns: 4 }, 'prop_')[0]).toThrow()
    })

    it('修改valName -> value_ 更改为 name_ 是否一致 ', () => {
      const val = { ceshi1: 'lalalala' }
      expect(
        () => generateRowData(newData, raw, val, { row: 0, column: 0, severalColumns: 4 }, 'label_', 'name_')[0]
      ).toThrow()
    })
  })

  describe('检测: 数据插入操作', () => {
    it('模拟 键值对数组转对象 ', () => {
      const test = [
        ['测试1', 'ceshi1'],
        ['测试2', 'ceshi2'],
      ]
      const entriesObj = {}
      for (const [key, value] of test) entriesObj[key] = value
      expect(entriesObj).toEqual({ 测试1: 'ceshi1', 测试2: 'ceshi2' })
    })

    it('模拟 map 对象插入 ', () => {
      const newData = new Map([
        ['测试1', 'ceshi1'],
        ['测试2', 'ceshi2'],
        ['测试3', 'ceshi3'],
      ])
      const raw = [
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
      ]
      const val = { ceshi1: 'lalalala', ceshi2: 'lalal22112121', ceshi3: 'lalalla' }
      const result = [
        {
          label_1: '测试1',
          value_1: 'lalalala',
          label_2: '测试2',
          value_2: 'lalal22112121',
          label_3: '测试3',
          value_3: 'lalalla',
          label_4: '',
          value_4: '',
        },
      ]

      expect(generateRowData(newData, raw, val)[0]).toEqual(result[0])
    })

    it('模拟默认数据插入是否规范 ', () => {
      const newData = [
        ['测试1', 'ceshi1'],
        ['测试2', 'ceshi2'],
        ['测试3', 'ceshi3'],
      ]
      const raw = [
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
      ]
      const val = { ceshi1: 'lalalala', ceshi2: 'lalal22112121', ceshi3: 'lalalla' }
      const result = [
        {
          label_1: '测试1',
          value_1: 'lalalala',
          label_2: '测试2',
          value_2: 'lalal22112121',
          label_3: '测试3',
          value_3: 'lalalla',
          label_4: '',
          value_4: '',
        },
      ]

      expect(generateRowData(newData, raw, val)[0]).toEqual(result[0])
    })

    it('模拟3行12列数据，从第2行插入到第3列的位置, 一行4列', () => {
      const newData = [
        ['测试1', 'ceshi1'],
        ['测试2', 'ceshi2'],
        ['测试3', 'ceshi3'],
      ]
      // 3行12列
      const raw = [
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
      ]
      const val = { ceshi1: 'lalalala', ceshi2: 'lalal22112121', ceshi3: 'lalalla' }
      const result = [
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
        {
          label_1: '',
          value_1: '',
          label_2: '',
          value_2: '',
          label_3: '测试1',
          value_3: 'lalalala',
          label_4: '测试2',
          value_4: 'lalal22112121',
        },
        { label_1: '测试3', value_1: 'lalalla' },
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
      ]

      expect(generateRowData(newData, raw, val, { row: 1, column: 3, severalColumns: 4 })[0]).toEqual(result[0])
    })

    it('模拟边界换行，是否在当前插入行后新增一行，列数随指定列渲染数据', () => {
      const newData = [
        ['测试1', 'ceshi1'],
        ['测试2', 'ceshi2'],
        ['测试3', 'ceshi3'],
      ]
      const raw = [
        { label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '', label_4: '', value_4: '' },
      ]
      const val = { ceshi1: 'lalalala', ceshi2: 'lalal22112121', ceshi3: 'lalalla' }
      const result = [
        {
          label_1: '',
          value_1: '',
          label_2: '',
          value_2: '',
          label_3: '',
          value_3: '',
          label_4: '测试1',
          value_4: 'lalalala',
        },
        { label_1: '测试2', value_1: 'lalal22112121', label_2: '测试3', value_2: 'lalalla' },
      ]

      expect(generateRowData(newData, raw, val, { row: 0, column: 4, severalColumns: 4 })[0]).toEqual(result[0])
    })

    it('当原始数据只有一行，指定第二行开始插入, 不可以渲染, 原始数据有2行，那么 options.row 的最大值只能是 2 ', () => {
      const newData = [['测试1', 'ceshi1']]
      const raw = [{ label_1: '', value_1: '' }]
      const val = { ceshi1: 'lalalala' }
      expect(() => generateRowData(newData, raw, val, { row: 2, column: 4, severalColumns: 4 })[0]).toThrow()
    })
  })
})
