import { ChakraProvider } from "@chakra-ui/react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
)
