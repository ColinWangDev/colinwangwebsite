import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { TaskPlannerPage } from './pages/TaskPlannerPage'

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task-planner" element={<TaskPlannerPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
