import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTaskPlanner } from '../hooks/useTaskPlanner'
import { formatDuration, hoursToMinutes } from '../utils/formatDuration'
import './TaskPlannerPage.css'

const DEFAULT_WORK_HOURS = 3

function TodayTaskItem({
  id,
  title,
  durationMinutes,
  done,
  badge,
  onToggle,
}: {
  id: string
  title: string
  durationMinutes: number
  done: boolean
  badge?: string
  onToggle: (id: string) => void
}) {
  return (
    <li className={`today-item card${done ? ' is-done' : ''}`}>
      <label className="today-check">
        <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
        <span className="today-title-wrap">
          {badge && <span className="today-badge">{badge}</span>}
          <span className="today-title">{title}</span>
        </span>
      </label>
      <span className="today-duration">{formatDuration(durationMinutes)}</span>
    </li>
  )
}

export function TaskPlannerPage() {
  const {
    todos,
    dailyRoutines,
    workHours,
    todayPlan,
    todayPoolTodos,
    routineTotalMinutes,
    poolBudgetMinutes,
    todayTotalMinutes,
    isPlanStale,
    maxDailyRoutines,
    addTodo,
    removeTodo,
    addDailyRoutine,
    removeDailyRoutine,
    setWorkHours,
    generateTodayPlan,
    toggleComplete,
    clearTodayPlan,
  } = useTaskPlanner()

  const [title, setTitle] = useState('')
  const [durationHours, setDurationHours] = useState('1')
  const [formError, setFormError] = useState('')

  const [routineTitle, setRoutineTitle] = useState('')
  const [routineDurationHours, setRoutineDurationHours] = useState('1')
  const [routineError, setRoutineError] = useState('')

  const budgetMinutes = hoursToMinutes(workHours)
  const poolTotalMinutes = todos.reduce((sum, t) => sum + t.durationMinutes, 0)
  const routineSlotsLeft = maxDailyRoutines - dailyRoutines.length

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault()
    const hours = parseFloat(durationHours)
    if (!title.trim()) {
      setFormError('请填写事项名称')
      return
    }
    if (!Number.isFinite(hours) || hours <= 0) {
      setFormError('请填写有效的时长')
      return
    }

    const ok = addTodo(title, hoursToMinutes(hours))
    if (ok) {
      setTitle('')
      setDurationHours('1')
      setFormError('')
    }
  }

  const handleAddRoutine = (e: FormEvent) => {
    e.preventDefault()
    if (routineSlotsLeft <= 0) {
      setRoutineError(`最多添加 ${maxDailyRoutines} 项每日固定事项`)
      return
    }

    const hours = parseFloat(routineDurationHours)
    if (!routineTitle.trim()) {
      setRoutineError('请填写事项名称')
      return
    }
    if (!Number.isFinite(hours) || hours <= 0) {
      setRoutineError('请填写有效的时长')
      return
    }

    const ok = addDailyRoutine(routineTitle, hoursToMinutes(hours))
    if (ok) {
      setRoutineTitle('')
      setRoutineDurationHours('1')
      setRoutineError('')
    }
  }

  const handleGenerate = () => {
    generateTodayPlan()
  }

  const completedIds = todayPlan?.completedIds ?? []
  const hasTodayContent = dailyRoutines.length > 0 || todayPoolTodos.length > 0

  return (
    <div className="planner-page" id="main">
      <div className="container">
        <header className="planner-header">
          <Link to="/" className="planner-back">
            ← 返回首页
          </Link>
          <h1 className="planner-title">每日任务规划器</h1>
          <p className="planner-desc">
            设定每日固定事项与待办池，根据可用工时自动生成今日任务。数据保存在浏览器本地（localStorage）。
          </p>
        </header>

        <section className="planner-controls card">
          <div className="control-row">
            <label htmlFor="work-hours" className="control-label">
              今日可用工时
            </label>
            <div className="control-input-group">
              <input
                id="work-hours"
                type="number"
                min={0.5}
                max={24}
                step={0.5}
                value={workHours}
                onChange={(e) => setWorkHours(parseFloat(e.target.value) || DEFAULT_WORK_HOURS)}
              />
              <span className="control-unit">小时</span>
            </div>
            <p className="control-hint">
              默认 3 小时。每日固定占用 {formatDuration(routineTotalMinutes)}，事项池可用{' '}
              {formatDuration(poolBudgetMinutes)}
            </p>
          </div>

          <button
            className="btn btn-primary btn-generate"
            onClick={handleGenerate}
            disabled={todos.length === 0}
          >
            生成今日任务
          </button>

          {todos.length === 0 && (
            <p className="control-note">
              事项池为空时无法生成额外任务，但每日固定事项仍会显示在右侧。
            </p>
          )}
        </section>

        <section className="planner-section planner-section--routines">
          <div className="section-heading">
            <span className="section-label">Daily</span>
            <h2 className="section-title">每日固定事项</h2>
            <p className="section-desc muted">
              最多 {maxDailyRoutines} 项，每天都会出现在今日任务中（还可添加 {routineSlotsLeft} 项）
            </p>
          </div>

          <form className="todo-form card" onSubmit={handleAddRoutine}>
            <div className="todo-form-row">
              <div className="form-row">
                <label htmlFor="routine-title">固定事项</label>
                <input
                  id="routine-title"
                  type="text"
                  placeholder="例如：投递简历、每日学习……"
                  value={routineTitle}
                  onChange={(e) => setRoutineTitle(e.target.value)}
                  disabled={routineSlotsLeft <= 0}
                />
              </div>
              <div className="form-row form-row--narrow">
                <label htmlFor="routine-duration">时长（小时）</label>
                <input
                  id="routine-duration"
                  type="number"
                  min={0.25}
                  step={0.25}
                  value={routineDurationHours}
                  onChange={(e) => setRoutineDurationHours(e.target.value)}
                  disabled={routineSlotsLeft <= 0}
                />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={routineSlotsLeft <= 0}
              >
                添加
              </button>
            </div>
            {routineError && <p className="field-error">{routineError}</p>}
          </form>

          {dailyRoutines.length === 0 ? (
            <p className="empty-state card">还没有每日固定事项，添加第一项吧。</p>
          ) : (
            <ul className="todo-pool-list routine-list">
              {dailyRoutines.map((routine) => (
                <li key={routine.id} className="todo-pool-item card routine-item">
                  <div className="todo-pool-main">
                    <label className="routine-check" aria-label={`勾选完成「${routine.title}」`}>
                      <input
                        type="checkbox"
                        checked={completedIds.includes(routine.id)}
                        onChange={() => toggleComplete(routine.id)}
                      />
                    </label>
                    <div>
                      <span className="todo-pool-title">{routine.title}</span>
                      <span className="todo-pool-duration">
                        每天 · {formatDuration(routine.durationMinutes)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn-icon"
                    type="button"
                    onClick={() => removeDailyRoutine(routine.id)}
                    aria-label={`删除「${routine.title}」`}
                  >
                    删除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="planner-grid">
          <section className="planner-section">
            <div className="section-heading">
              <span className="section-label">Pool</span>
              <h2 className="section-title">待办事项池</h2>
              <p className="section-desc muted">
                共 {todos.length} 项，合计 {formatDuration(poolTotalMinutes)}
              </p>
            </div>

            <form className="todo-form card" onSubmit={handleAddTodo}>
              <div className="todo-form-row">
                <div className="form-row">
                  <label htmlFor="todo-title">事项</label>
                  <input
                    id="todo-title"
                    type="text"
                    placeholder="例如：写周报、复习算法……"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-row form-row--narrow">
                  <label htmlFor="todo-duration">时长（小时）</label>
                  <input
                    id="todo-duration"
                    type="number"
                    min={0.25}
                    step={0.25}
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  添加
                </button>
              </div>
              {formError && <p className="field-error">{formError}</p>}
            </form>

            {todos.length === 0 ? (
              <p className="empty-state card">还没有待办，添加第一条吧。</p>
            ) : (
              <ul className="todo-pool-list">
                {todos.map((todo) => (
                  <li key={todo.id} className="todo-pool-item card">
                    <div className="todo-pool-main">
                      <span className="todo-pool-title">{todo.title}</span>
                      <span className="todo-pool-duration">
                        {formatDuration(todo.durationMinutes)}
                      </span>
                    </div>
                    <button
                      className="btn-icon"
                      type="button"
                      onClick={() => removeTodo(todo.id)}
                      aria-label={`删除「${todo.title}」`}
                    >
                      删除
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="planner-section">
            <div className="section-heading">
              <span className="section-label">Today</span>
              <h2 className="section-title">今日任务</h2>
              {hasTodayContent && (
                <p className="section-desc muted">
                  合计 {formatDuration(todayTotalMinutes)} / {formatDuration(budgetMinutes)}
                </p>
              )}
            </div>

            {isPlanStale && (
              <div className="stale-banner card" role="status">
                这是昨天的计划，点击「生成今日任务」重新规划事项池部分。
              </div>
            )}

            {!hasTodayContent ? (
              <p className="empty-state card">
                添加每日固定事项，或从事项池生成今日任务。
              </p>
            ) : (
              <>
                {dailyRoutines.length > 0 && (
                  <div className="today-block">
                    <h3 className="today-block-title">每日固定</h3>
                    <ul className="today-list">
                      {dailyRoutines.map((routine) => (
                        <TodayTaskItem
                          key={routine.id}
                          id={routine.id}
                          title={routine.title}
                          durationMinutes={routine.durationMinutes}
                          done={completedIds.includes(routine.id)}
                          badge="固定"
                          onToggle={toggleComplete}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {todayPoolTodos.length > 0 && (
                  <div className="today-block">
                    <h3 className="today-block-title">从事项池安排</h3>
                    <ul className="today-list">
                      {todayPoolTodos.map((todo) => (
                        <TodayTaskItem
                          key={todo.id}
                          id={todo.id}
                          title={todo.title}
                          durationMinutes={todo.durationMinutes}
                          done={completedIds.includes(todo.id)}
                          onToggle={toggleComplete}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {dailyRoutines.length > 0 && todayPoolTodos.length === 0 && !isPlanStale && (
                  <p className="today-hint muted">
                    每日固定事项已就绪。点击「生成今日任务」从事项池补充更多任务。
                  </p>
                )}

                {todayPoolTodos.length > 0 && (
                  <button
                    className="btn btn-ghost btn-clear"
                    type="button"
                    onClick={clearTodayPlan}
                  >
                    清空事项池安排
                  </button>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
