export interface TodoItem {
  id: string
  title: string
  durationMinutes: number
  createdAt: number
}

export interface DailyRoutine {
  id: string
  title: string
  durationMinutes: number
}

export interface TodayPlan {
  date: string
  todoIds: string[]
  completedIds: string[]
}

export interface TaskPlannerState {
  todos: TodoItem[]
  dailyRoutines: DailyRoutine[]
  workHours: number
  todayPlan: TodayPlan | null
}

export const MAX_DAILY_ROUTINES = 3
