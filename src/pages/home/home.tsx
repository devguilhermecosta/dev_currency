import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './home.modules.css'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


interface CoinsProps {
  delta_24h: string;
  market_cap: string;
  name: string;
  price: string;
  rank: string;
  show_symbol: string;
  symbol: string;
  volume_24h: string;
  formatedPrice: string;
  formatedMarket: string
}

interface CoinsData {
  coins: CoinsProps[]
}


export default function Home() {

  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch('https://sujeitoprogramador.com/api-cripto/?key=ef4707e93f5f2a8d',
      )
      .then(response => response.json())
      .then((data: CoinsData) => {
        const coinsData = data.coins.slice(0, 3);
        const price = Intl.NumberFormat(
          'pt-br',
          {
            style: 'currency',
            currency: 'BRL',
          }
        );

        const formatedData = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.price)),
            formatedMarket: price.format(Number(item.market_cap))
          }
          return formated;
        })

        setCoins(formatedData);
      })
    }

    getData();

  }, []);

  function handleForm(e: FormEvent) {
    e.preventDefault();
    navigate(`/details/${inputValue}`);
  }

  return (
    <main>
      {/* search form */}
      <section className="C-form">
        <form onSubmit={handleForm}>
          <input
            type="text"
            name="code"
            id="code"
            placeholder='Ex: BTC'
            value={inputValue}
            onChange={(e) => {setInputValue(e.target.value)}}
            />
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
          {coins.map( coin => (
            <tr key={coin.name}>
              <td className='C-table_link' data-label='moeda'>
                {coin.name}
                <Link to={`/detail/${coin.symbol}`}> | {coin.symbol}</Link>
              </td>
              <td data-label='mercado'>{coin.formatedMarket}</td>
              <td data-label='preço'>{coin.formatedPrice}</td>
              <td
                data-label='variação'
                className={Number(coin.delta_24h) >= 0 ? 'C-profits' : 'C-loss'}>
                  {coin.delta_24h}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    </main>
  )
}