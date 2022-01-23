import { taskQueue } from '../packages/taskQueue'

describe('taskQueue.js', () => {
  it('taskqueue 是否传入', () => {
    fn()
    function fn() {
      taskQueue({
        taskQueueList: [],
        perFromTask(val) {
          // 模拟事件处理
          return new Promise((resolve) => setTimeout(resolve, 0, val))
        },
        process(process, result) {
          expect(process).toBe(100)
          expect(result).toBe(null)
        },
        perFromEnd(val) {
          expect(val).toBe(true)
        },
      })
    }
  })
})
