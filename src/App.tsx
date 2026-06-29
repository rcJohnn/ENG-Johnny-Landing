import { NavBar } from './components/NavBar'
import { Cursor } from './components/Cursor'
import { Hero } from './sections/Hero'
import { Manifiesto } from './sections/Manifiesto'
import { Sobre } from './sections/Sobre'
import { Capacidades } from './sections/Capacidades'
import { Proyectos } from './sections/Proyectos'
import { Arsenal } from './sections/Arsenal'
import { Trayectoria } from './sections/Trayectoria'
import { Referencias } from './sections/Referencias'
import { Contacto } from './sections/Contacto'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <div className="pf-wrap">
      <Cursor />
      <NavBar links={['About', 'Capabilities', 'Projects', 'Experience', 'Contact']} cta="Let's talk" onDark />
      <main>
        <Hero />
        <Manifiesto />
        <Sobre />
        <Capacidades />
        <Proyectos />
        <Arsenal />
        <Trayectoria />
        <Referencias />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
