import './notfound.modules.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="C-notfound">
      <h1>Ooops! Página não encontrada...</h1>
      <Link to="/">Ver todas as criptomoedas</Link>
    </div>
  )
}
