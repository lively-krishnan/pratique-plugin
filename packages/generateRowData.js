import { isMap, is2DArray } from './shared/utils'

/**
 * @function generateRowData
 * @description 指定几行几列动态插入数据
 *
 * @param { (Array | Map) } newData 键值对数据
 * @param { Object= } [raw={}] 插入的原始数据
 * @param { Object= } [val={}] 接口返回参数
 * @param { Object= } options
 * @param { Number= } [options.row=0] 从第几行开始
 * @param { Number= } [options.column=0] 从第几列开始
 * @param { Number= } [options.severalColumns=4] 一行几列
 * @param { string= } [labelName='label_'] table label
 * @param { string= } [valName='value_'] table name
 *
 * @see /test/rowData.spec.js
 * @author Geng xiaojun
 *
 * @example
 *
 * const newData = [['测试1', 'ceshi1'], ['测试2', 'ceshi2'],['测试3','ceshi3']]
 * const raw = [
 *  {label_1: '', value_1: '', label_2: '', value_2: '', label_3: '', value_3: '',label_4: '', value_4: ''}
 * ]
 * const val = {ceshi1: 'lalalala', ceshi2: 'lalal22112121', ceshi3: 'lalalla'}
 *
 * generateRowData(newData, raw, val)
 *
 * // [{label_1: '测试1', value_1: 'lalalala', label_2: '测试2', value_2: 'lalal22112121', label_3: '测试3', value_3: 'lalalla',label_4: '', value_4: ''}]
 */
export function generateRowData(
  newData,
  raw,
  val,
  options = {
    row: 0,
    column: 0,
    severalColumns: 4,
  },
  labelName = 'label_',
  valName = 'value_'
) {
  // 不规范调用检测
  if (arguments.length === 0) throw new Error('Incorrect call, please consult documentation')
  if (!Number(options.row) && !Number(options.column) && !Number(options.severalColumns))
    throw new Error('The options type was passed incorrectly')

  // 如果是 map 格式传入进来的话， 转为普通二维数组， 继续处理
  if (isMap(newData)) newData = [...newData]

  // 检测 newData 数据格式
  is2DArray(newData)

  if (val == null || val === undefined) val = {}

  // 判断接口输入的参数格式正确
  if (Array.isArray(val)) throw new Error('Please check the interface data format. You need to pass in an object')

  // 判断原始数据是否为空
  if (raw.length === 0) throw new Error('Raw data cannot be empty')

  // severalColumns 一定是比 column 大的
  if (options.severalColumns < options.column) throw new Error('`severalColumns` Is larger than `column`')

  // 当前指定行 如果大于 原始数据 length ， 这里设定 row 必须是要和原始数据对等的， 原始数据有2行，那么row 的最大值只有2 ，这里超过后不自动生成数据
  if (options.row > raw.length)
    throw new Error('The original data has 2 rows, so the maximum value of options.row can only be 2')

  // 检测数据 当前 labelName 或者 valName 是否和 原始数据不一致
  for (const key of raw) {
    if (Object.keys(key)[0].indexOf(labelName) < 0 || Object.keys(key)[1].indexOf(valName) < 0) {
      throw new Error('The current labelName or valName is inconsistent with the original data')
    }
  }

  // 开始处理数据
  return processingData(newData, raw, val, options, labelName, valName)
}

// 处理数据
function processingData(newData, raw, val, options, labelName, valName) {
  // copy 一份新的数据
  const data = newData.slice(0)

  // 声明参数
  const entriesObj = {}
  let index = options.column === 0 ? 1 : options.column

  const curColumn = options.severalColumns - (options.column - 1)
  const defaultRowColumns = options.column !== 0 ? curColumn : options.severalColumns

  // 每次取 defaultRowColumns 个
  const opt = data.splice(0, defaultRowColumns)

  for (const [key, value] of opt) entriesObj[key] = value

  // 拼接 key - value
  for (const key in entriesObj) {
    raw[options.row][`${labelName}${index}`] = key
    raw[options.row][`${valName}${index}`] = val[entriesObj[key]] || ''
    index++
  }

  // 结束条件
  if (data.length === 0) return raw

  // 换行 从0开始，原始数据在当前row 后面新增一行 递归继续执行
  options.row++
  options.column = 0
  raw.splice(options.row, 0, {})
  return processingData(data, raw, val, options, labelName, valName)
}
