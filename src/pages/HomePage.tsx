import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Projects } from '../components/Projects'
import { Contact } from '../components/Contact'

export function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}
