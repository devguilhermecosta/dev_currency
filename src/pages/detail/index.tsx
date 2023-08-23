import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

interface CoinProps {
  delta_24h: string;
  high_24h: string;
  low_24h: string;
  market_cap: string;
  name: string;
  price: string;
  symbol: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLow24: string;
  formatedHight24: string;
  error?: string;
}

export default function Detail() {
  const { symbol } = useParams();

  useEffect(() => {
    function getData() {
      fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=ef4707e93f5f2a8d&symbol=${symbol}`)
      .then(response => response.json())
      .then((data: CoinProps) => {

        const price = Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const formated = {
          ...data,
          formatedPrice: price.format(Number(data.price)),
          formatedMarket: price.format(Number(data.market_cap)),
          formatedLow24: price.format(Number(data.low_24h)),
          formatedHight24: price.format(Number(data.high_24h))
        }

        return formated;
      })
    }

    getData();

  }, [symbol])

  // continuar daqui -> criar a renderização condicional com loading

  return (
    <div>
      <h1>Details of {symbol}</h1>
    </div>
  )
}
