import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import React from "react"
import StoreProvider from "./redux/StoreProvider"
import { Toaster } from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
)

