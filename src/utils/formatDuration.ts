export function minutesToHours(minutes: number): number {
  return Math.round((minutes / 60) * 100) / 100
}

export function hoursToMinutes(hours: number): number {
  return Math.round(hours * 60)
}

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return '0 分钟'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} 分钟`
  if (m === 0) return `${h} 小时`
  return `${h} 小时 ${m} 分钟`
}

export function todayDateString(): string {
  return new Date().toISOString().slice(0, 10)
}
