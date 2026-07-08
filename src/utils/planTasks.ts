import type { TodoItem } from '../types/taskPlanner'

/**
 * 0/1 背包：在时长预算内尽可能多地安排待办（优先填满可用时间）。
 * 同等收益时保留在池中更靠前的项（较早创建）。
 */
export function planTasks(todos: TodoItem[], budgetMinutes: number): TodoItem[] {
  if (todos.length === 0 || budgetMinutes <= 0) return []

  const n = todos.length
  const weights = todos.map((t) => t.durationMinutes)
  const capacity = budgetMinutes

  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(capacity + 1).fill(0),
  )

  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1]!
    for (let c = 0; c <= capacity; c++) {
      dp[i]![c] = dp[i - 1]![c]!
      if (w <= c) {
        dp[i]![c] = Math.max(dp[i]![c]!, dp[i - 1]![c - w]! + w)
      }
    }
  }

  let remaining = capacity
  const pickedIndices: number[] = []

  for (let i = n; i >= 1; i--) {
    if (dp[i]![remaining]! !== dp[i - 1]![remaining]!) {
      pickedIndices.push(i - 1)
      remaining -= weights[i - 1]!
    }
  }

  return pickedIndices.reverse().map((index) => todos[index]!)
}
