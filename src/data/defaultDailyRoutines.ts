import type { DailyRoutine } from '../types/taskPlanner'

export function getDefaultDailyRoutines(): DailyRoutine[] {
  return [
    {
      id: 'routine-resume',
      title: '投递 5 份简历',
      durationMinutes: 60,
    },
    {
      id: 'routine-react',
      title: '学习一个 React 知识点并进行考核',
      durationMinutes: 90,
    },
  ]
}
