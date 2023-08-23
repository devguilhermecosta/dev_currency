import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/home'
import Detail from './pages/detail'
import NotFound from './pages/notfound'
import Layout from './components/layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/details/:symbol",
        element: <Detail />
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
])

export { router };
