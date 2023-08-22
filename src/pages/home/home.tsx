import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './home.modules.css'
import { useEffect, useState } from 'react'


interface CoinsProps {
  delta_24h: string,
  market_cap: string,
  name: string,
  price: string,
  rank: string,
  show_symbol: string,
  symbol: string,
  volume_24h: string
}

interface CoinsData {
  coins: CoinsProps
}

// o toke tem limite de requisição.
// criar um endpoint para prosseguir com os testes


export default function Home() {

  const [coins, setCoins] = useState<CoinsProps[]>([]);

  useEffect(() => {
    fetch('https://sujeitoprogramador.com/api-cripto/?key=ef4707e93f5f2a8d',
    )
    .then(response => response.json())
    .then((data: CoinsData) => {
      const coinsData = data.coins.slice(0, 15);

      // setCoins(coinsData);
    })
  }, []);

  return (
    <main>
      {/* form */}
      <section className="C-form">
        <form action="">
          <input type="text" name="code" id="code"
          placeholder='Ex: BTC' />
          <button type="submit">
            <BsSearch size={20} color="#fff" />
          </button>
        </form>
      </section>
    
    {/* table */}
    <section className='C-table'>
      <table className='table'>
        <thead>
          <tr>
            <th>moeda</th>
            <th>valor mercado</th>
            <th>preço</th>
            <th>variação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='C-table_link' data-label='moeda'>
              Bitcoin
              <Link to="/"> | BTC</Link>
            </td>
            <td data-label='mercado'>R$ 37.000,00</td>
            <td data-label='preço'>R$ 36.000,00</td>
            <td data-label='variação'>+5.3</td>
          </tr>
        </tbody>
      </table>
    </section>
    </main>
  )
}