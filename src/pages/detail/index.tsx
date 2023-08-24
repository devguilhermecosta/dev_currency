import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './detail.modules.css'

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
}

export default function Detail() {
  const { symbol } = useParams();
  const [detail, setDetail] = useState<CoinProps>();
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

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

        setDetail(formated);
        setLoading(false);

        return formated;
      })
      .catch(() => { navigate("/") })
    }

    getData();

  }, [symbol, navigate])

  if (loading) {
    return (
      <div>
        <section className="C-detail">
          <h2>Carregando informações</h2>
        </section>
      </div>
    )
  }

  return (
    <div>
      <section className="C-detail">
        <h1>{detail?.name}</h1>
        <h2>{detail?.symbol}</h2>

        <section className="C-detail_data">
          <p>
            Preço:
            <span>{detail?.formatedPrice}</span>
          </p>
          <p>
            Maior preço 24h:
            <span>{detail?.formatedHight24}</span>
          </p>
          <p>
            Menor preço 24h
            <span>{detail?.formatedLow24}</span>
          </p>
          <p>
            Delta 24h:
            <span
              className={Number(detail?.delta_24h) >= 0 ? 'profits' : 'loss'}
              >
              {detail?.delta_24h}
            </span>
          </p>
          <p>
            Valor mercado:
            <span>{detail?.formatedMarket}</span>
          </p>
        </section>
      </section>
    </div>
  )
}
