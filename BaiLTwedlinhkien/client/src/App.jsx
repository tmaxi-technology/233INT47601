import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import RootLayout from "./Layouts/RootLayout"
import HomePage from "./Pages/Home/HomePage"
import ErrorPage from "./Share/404/ErrorPage"
import AccountPage from "./Pages/AccountPage/AccountPage"
import FormLogin from "./Authentication/FormLogin"
import FormRegister from "./Authentication/FormRegister"
import AccountLayout from "./Layouts/AccountLayout"
import Shop from "./Pages/Shop/Shop"
import Detail from "./Pages/Detail/Detail"
import Cart from "./Pages/Cart/Cart"
import Checkout from "./Pages/Checkout/Checkout"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="collections" element={<Shop />} />
          <Route path="collections/:id" element={<Shop />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="cart" element={<Cart />} />
          <Route path='/account' element={<AccountLayout />}>
            <Route index element={<AccountPage />} />
            <Route path='login' element={<FormLogin />} />
            <Route path='register' element={<FormRegister />} />
          </Route>
        </Route>
        <Route path="checkout" element={<Checkout />} />
        <Route path='*' element={<ErrorPage />} />
      </>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App
