import { useCallback, useEffect, useState } from 'react'
import type { DailyRoutine, TaskPlannerState, TodoItem, TodayPlan } from '../types/taskPlanner'
import { MAX_DAILY_ROUTINES } from '../types/taskPlanner'
import { getDefaultDailyRoutines } from '../data/defaultDailyRoutines'
import { hoursToMinutes, todayDateString } from '../utils/formatDuration'
import { planTasks } from '../utils/planTasks'

const STORAGE_KEY = 'colinwang:task-planner'
const DEFAULT_WORK_HOURS = 3

function loadState(): TaskPlannerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        todos: [],
        dailyRoutines: getDefaultDailyRoutines(),
        workHours: DEFAULT_WORK_HOURS,
        todayPlan: null,
      }
    }
    const parsed = JSON.parse(raw) as TaskPlannerState
    return {
      todos: Array.isArray(parsed.todos) ? parsed.todos : [],
      dailyRoutines: Array.isArray(parsed.dailyRoutines)
        ? parsed.dailyRoutines.slice(0, MAX_DAILY_ROUTINES)
        : getDefaultDailyRoutines(),
      workHours:
        typeof parsed.workHours === 'number' && parsed.workHours > 0
          ? parsed.workHours
          : DEFAULT_WORK_HOURS,
      todayPlan: parsed.todayPlan ?? null,
    }
  } catch {
    return {
      todos: [],
      dailyRoutines: getDefaultDailyRoutines(),
      workHours: DEFAULT_WORK_HOURS,
      todayPlan: null,
    }
  }
}

function saveState(state: TaskPlannerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function createId(): string {
  return crypto.randomUUID()
}

function getOrCreateTodayPlan(plan: TodayPlan | null, today: string): TodayPlan {
  if (plan?.date === today) return plan
  return { date: today, todoIds: [], completedIds: [] }
}

function msUntilNextMidnight() {
  const now = new Date()
  const next = new Date(now)
  next.setHours(24, 0, 0, 0)
  return next.getTime() - now.getTime()
}

export function useTaskPlanner() {
  const [state, setState] = useState<TaskPlannerState>(loadState)
  const [today, setToday] = useState(todayDateString())

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextToday = todayDateString()
      setToday(nextToday)
      setState((prev) => {
        if (!prev.todayPlan || prev.todayPlan.date === nextToday) return prev
        return { ...prev, todayPlan: null }
      })
    }, msUntilNextMidnight())

    return () => window.clearTimeout(timeout)
  }, [today])

  const addTodo = useCallback((title: string, durationMinutes: number) => {
    const trimmed = title.trim()
    if (!trimmed || durationMinutes <= 0) return false

    const item: TodoItem = {
      id: createId(),
      title: trimmed,
      durationMinutes: Math.round(durationMinutes),
      createdAt: Date.now(),
    }

    setState((prev) => ({ ...prev, todos: [...prev.todos, item] }))
    return true
  }, [])

  const removeTodo = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      todos: prev.todos.filter((t) => t.id !== id),
      todayPlan: prev.todayPlan
        ? {
            ...prev.todayPlan,
            todoIds: prev.todayPlan.todoIds.filter((tid) => tid !== id),
            completedIds: prev.todayPlan.completedIds.filter((tid) => tid !== id),
          }
        : null,
    }))
  }, [])

  const addDailyRoutine = useCallback((title: string, durationMinutes: number) => {
    const trimmed = title.trim()
    if (!trimmed || durationMinutes <= 0) return false

    let added = false
    setState((prev) => {
      if (prev.dailyRoutines.length >= MAX_DAILY_ROUTINES) return prev

      const routine: DailyRoutine = {
        id: createId(),
        title: trimmed,
        durationMinutes: Math.round(durationMinutes),
      }
      added = true
      return { ...prev, dailyRoutines: [...prev.dailyRoutines, routine] }
    })
    return added
  }, [])

  const removeDailyRoutine = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      dailyRoutines: prev.dailyRoutines.filter((r) => r.id !== id),
      todayPlan: prev.todayPlan
        ? {
            ...prev.todayPlan,
            completedIds: prev.todayPlan.completedIds.filter((cid) => cid !== id),
          }
        : null,
    }))
  }, [])

  const setWorkHours = useCallback((hours: number) => {
    if (hours <= 0) return
    setState((prev) => ({ ...prev, workHours: hours }))
  }, [])

  const generateTodayPlan = useCallback(() => {
    setState((prev) => {
      const routineMinutes = prev.dailyRoutines.reduce(
        (sum, r) => sum + r.durationMinutes,
        0,
      )
      const budget = Math.max(0, hoursToMinutes(prev.workHours) - routineMinutes)
      const selected = planTasks(prev.todos, budget)
      const existing = getOrCreateTodayPlan(prev.todayPlan, today)
      const routineCompleted = existing.completedIds.filter((id) =>
        prev.dailyRoutines.some((r) => r.id === id),
      )

      const todayPlan: TodayPlan = {
        date: today,
        todoIds: selected.map((t) => t.id),
        completedIds: routineCompleted,
      }
      return { ...prev, todayPlan }
    })
  }, [today])

  const toggleComplete = useCallback((id: string) => {
    setState((prev) => {
      const todayPlan = getOrCreateTodayPlan(prev.todayPlan, today)
      const isDone = todayPlan.completedIds.includes(id)
      const completedIds = isDone
        ? todayPlan.completedIds.filter((cid) => cid !== id)
        : [...todayPlan.completedIds, id]

      return {
        ...prev,
        todayPlan: { ...todayPlan, completedIds },
      }
    })
  }, [today])

  const clearTodayPlan = useCallback(() => {
    setState((prev) => {
      if (!prev.todayPlan) return prev
      const routineCompleted = prev.todayPlan.completedIds.filter((id) =>
        prev.dailyRoutines.some((r) => r.id === id),
      )
      return {
        ...prev,
        todayPlan: {
          ...getOrCreateTodayPlan(prev.todayPlan, today),
          todoIds: [],
          completedIds: routineCompleted,
        },
      }
    })
  }, [today])

  const activeTodayPlan = state.todayPlan?.date === today ? state.todayPlan : null

  const todayPoolTodos = activeTodayPlan
    ? activeTodayPlan.todoIds
        .map((id) => state.todos.find((t) => t.id === id))
        .filter((t): t is TodoItem => !!t)
    : []

  const routineTotalMinutes = state.dailyRoutines.reduce(
    (sum, r) => sum + r.durationMinutes,
    0,
  )
  const poolTotalMinutes = todayPoolTodos.reduce((sum, t) => sum + t.durationMinutes, 0)
  const todayTotalMinutes = routineTotalMinutes + poolTotalMinutes
  const budgetMinutes = hoursToMinutes(state.workHours)
  const poolBudgetMinutes = Math.max(0, budgetMinutes - routineTotalMinutes)
  const isPlanStale = state.todayPlan !== null && state.todayPlan.date !== today

  return {
    todos: state.todos,
    dailyRoutines: state.dailyRoutines,
    workHours: state.workHours,
    todayPlan: activeTodayPlan,
    todayPoolTodos,
    routineTotalMinutes,
    poolBudgetMinutes,
    todayTotalMinutes,
    isPlanStale,
    maxDailyRoutines: MAX_DAILY_ROUTINES,
    addTodo,
    removeTodo,
    addDailyRoutine,
    removeDailyRoutine,
    setWorkHours,
    generateTodayPlan,
    toggleComplete,
    clearTodayPlan,
  }
}
