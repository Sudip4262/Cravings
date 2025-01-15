import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from "./components/ui/provider"

import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import CartPage from './components/CartPage'
import Loginpage from './components/Loginpage'
import Menu from './components/Menu'
import AccountPage from './components/AccountPage'
import AccountSetupPage from './components/AccountSetupPage'
import OrdersShow from './components/OrdersShow'


export default function () {
  return (
    <Provider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<HomePage/>} />
          <Route exact path='/CartPage' element={<CartPage/>} />
          <Route exact path='/Loginpage' element={<Loginpage/>} />
          <Route exact path='/Menu' element={<Menu/>} />
          <Route exact path='/AccountPage' element={<AccountPage/>} />
          <Route exact path='/AccountSetupPage' element={<AccountSetupPage/>} />
          <Route exact path='/OrdersShow' element={<OrdersShow/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
