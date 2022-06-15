import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { AppHead } from '../components/Head'

interface Repositorie {
  html_url: string
}

const Home: NextPage = () => {
  const [ repositories, setRepositories ] = useState<Repositorie[]>()
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/github/repositories/?label=database&language=javascript&page=1`)
      .then((res) => res.json())
      .then((res) => res.items)
      .then(setRepositories)
  }, [])

  return (
    <div className="container mx-auto">
      <AppHead />
      <ul>
        { (repositories || []).map((repositorie: Repositorie, key) => (
            <li key={key}>{repositorie.html_url}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home
