import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './styles.modules.css'


export default function Header() {
  return (
    <header>
      <section className="C-logo">
        <Link to="/">
          <img src={logo} alt="logo"/>
        </Link>
      </section>
    </header>
  )
}