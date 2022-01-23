/**
 * @async
 * @function taskQueue
 * @desc 队列处理函数（未开发完毕，待完善...）
 *
 * @param { Object } opt
 * @param { Array= }  [opt.taskQueueList = []] 事件处理队列
 * @param { Number=} [opt.largestNumber=10] 最多同时执行多少条
 * @param { Function= } [opt.process] {@returns {(number, any)}}  进度回调函数
 * @param { Function } opt.perFromTask {@returns {Promise}} 事件处理函数
 * @param { Function } opt.perFromEnd {@returns {Boolean}} 执行完毕回调
 *
 * @see /test/taskQueue.spec.js
 * @author Geng xiaojun
 *
 * @example
 *
 * const taskQuqen = []
 * for(let i = 0; i < 10; i++) {
 *   taskQuqen.push(i)
 * }
 * fn()
 * async function fn() {
 *   await taskQueue({
 *     taskQueueList: taskQuqen,
 *     largestNumber: 10,
 *     process(process, resultVal) {
 *       console.log(process,'进度值', resultVal,'事件处理返回值')
 *     },
 *     perFromTask(val){
 *       // 模拟事件处理
 *       return new Promise((resolve) => setTimeout(resolve, 0, val))
 *     },
 *     perFromEnd(val) {
 *       console.log(val,'==2==22cheng')
 *     }
 *   })
 * }
 */
export function taskQueue(opt) {
  if (opt.taskQueueList.length === 0) {
    opt.process(100, null)
    opt.perFromEnd(true)
    return
  }

  if (!opt.largestNumber) opt.largestNumber = 10

  const starIndex = 0
  const totalVariation = opt.taskQueueList.length

  return startPerformTask(opt, starIndex, totalVariation)
}

async function startPerformTask(opt, starIndex, totalVariation) {
  try {
    const largetNumberTaskQuqenList = opt.taskQueueList.slice(starIndex, opt.largestNumber)

    if (largetNumberTaskQuqenList.length === 0) {
      opt.perFromEnd(true)
      return
    }

    const result = await opt.perFromTask(largetNumberTaskQuqenList[0])

    if (opt.process) {
      // eslint-disable-next-line radix
      const calculatePercentage = parseInt(
        ((opt.taskQueueList.length - (totalVariation - 1)) / opt.taskQueueList.length) * 100
      )
      opt.process({
        process: calculatePercentage,
        result,
      })
    }

    starIndex++
    opt.largestNumber += starIndex

    return startPerformTask(opt, starIndex, totalVariation - 1)
  } catch (err) {
    throw new Error(err)
  }
}
