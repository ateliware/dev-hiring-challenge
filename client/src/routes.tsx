import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Likeds } from "./pages/Likeds"

export const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/likeds' element={<Likeds />} />
      </Routes>
    </BrowserRouter>
  )
}
