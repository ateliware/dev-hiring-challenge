import type { NextPage } from 'next'
import { AppHead } from '../components/Head'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <AppHead />
      <h1>Olá</h1>
    </div>
  )
}

export default Home
