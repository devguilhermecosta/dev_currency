import { useParams } from 'react-router-dom'

export default function Detail() {
  const { symbol } = useParams();

  return (
    <div>
      <h1>Details of {symbol}</h1>
    </div>
  )
}
