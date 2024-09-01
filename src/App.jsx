import React, { useEffect } from "react";
import "./App.css";

import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import Footer from "./components/layouts/Footer";
import Menu from "./components/layouts/Menu";
import Login from "./components/users/Login"
import Register from "./components/users/Register"
import Cart from "./components/cart/Cart"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import store from "./store"
import { loadUser } from "./actions/userAction";
import Profile from "./components/users/Profile"
import UpdateProfile from "./components/users/UpdateProfile"
import ForgotPassword from "./components/users/ForgotPassword"
import NewPassword from "./components/users/NewPassword"
import { fetchCartItems } from "./actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

import OrderSuccess from "./components/cart/OrderSuccess"
import ListOrders from "./components/order/ListOrders"
import OrderDetails from "./components/order/OrderDetails"

export default function App() {
  /* 
  loadUser()  in userAction.js
    use to remember user, Not logout after reload
      done via cookies
        [Search bar -- (i) button  --  Cookies & stie data -- Manage on-device site data]

  store
    it is an obj
    it contain func dispatch()`
      use to call any Action

  dispatch exactly once when the component is 1st rendered
    and check if user is authenticated or not
  */

 
 useEffect(()=>{
   store.dispatch(loadUser())
  }, [])
  
  // const dispatch = useDispatch()
  
  // const {user} = useSelector((state)=>state.auth)
  // if(user) {
  //   dispatch(fetchCartItems())
  // }




  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="container container-fluid">
          <Routes>
            
            <Route path="/" element={<Home />}> </Route>
              {/* "/" = default home page,  here localhost:3000 */}
            
            <Route path={`/eats/stores/:id/menus`} element={<Menu/>}> </Route>   
              {/* :id   : means dynamic   any int value element */}
            
            <Route path={`/users/login`} element={<Login />} />
            <Route path={`/users/register`} element={<Register />} />
            <Route path="/users/me" element={<Profile />} /> 
            <Route path="/users/me/update" element={<UpdateProfile />} /> 
            <Route path="/users/forgotPassword" element={<ForgotPassword />} />
            <Route path="/users/resetPassword/:token" element={<NewPassword />} />

            <Route path="/cart" element={<Cart />} /> 

            <Route path="/success" element={<OrderSuccess />} /> 
            <Route path="/eats/orders/me/myOrders" element={<ListOrders />} /> 
            <Route path="/eats/orders/:id" element={<OrderDetails />} /> 
            
            <Route path="*" element={<h1> The page does Not exist </h1>} /> 
            
          </Routes>
        </div>
              
        <Footer />
      </div>

    </BrowserRouter>
  );
}
