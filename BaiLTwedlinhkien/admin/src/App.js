import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header/Header";
import History from "./pages/History/History";
import Home from "./pages/Home/Home";
import Menu from "./layout/Menu/Menu";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import Categories from "./pages/categories/Categories";
import ProductType from "./pages/productType/productType";
import Brand from "./pages/brand/Brand";
import Size from "./pages/size/Size";
import Coupons from "./pages/coupons/Coupons";
import SignIn from "./pages/signIn/signIn";
import Revenue from "./pages/revenue/revenue";
import { HOST } from "./domain/host/host";
import axios from "axios";

function App() {
  useEffect(() => {
    var email = sessionStorage.getItem("mail");
    var user = sessionStorage.getItem("user");
    if (email === null && user === null) return;
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <div
          id="main-wrapper"
          data-theme="light"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-boxed-layout="full"
        >
          {!sessionStorage.getItem("mail") && !sessionStorage.getItem("user") ? (
            <SignIn />
          ) : (
            <>
              <Header />
              <Menu />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/history" element={<History />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/type" element={<ProductType />} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/size" element={<Size />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/doanh-thu" element={<Revenue />} />
              </Routes>
            </>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
