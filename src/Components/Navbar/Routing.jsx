import React from "react";
import { Route, Routes } from "react-router-dom";
import Techshop from "./Techshop";
import Login from "../Login/Login";
import Cart from "../Cart/Cart";
// import Search from "./Search";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/techshop" element={<Techshop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart/>} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </>
  );
};

export default Routing;
