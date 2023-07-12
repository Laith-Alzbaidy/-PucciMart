import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Feedback from "./Component/Post/Post";
import Landingpage from "./Component/Home/Landing";
import Profile from "./Component/Profile/Profile";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import Community from "./Component/Community/Community";
import Allproducts from "./Component/Allproducts/Allproducts";
import ProductsDetails from "./Component/ProductDetails/ProductsDetails";
import AddToCart from "./Component/AddToCart/AddToCart";
import Cart from "./Component/Cart/Cart";
import History from "./Component/History/History";
import "./App.css";

function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   setIsTransitioning(true);
  //   const timeout = setTimeout(() => {
  //     setIsTransitioning(false);
  //   }, 1000); // Adjust the duration to match the animation duration in CSS

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [location]);

  return (
    <>
      <Nav />
      {/* <div className={isTransitioning ? "flash-screen" : ""}></div> */}
      <Routes>
        <Route
          path="/Allproducts/ProductsDetails/:producId"
          element={<ProductsDetails />}
        />
        <Route
          path="/:UserId/Allproducts/ProductsDetails/:producId"
          element={<ProductsDetails />}
        />
        <Route path="/Allproducts" element={<Allproducts />} />
        <Route path="/:UserId/Allproducts" element={<Allproducts />} />
        <Route
          path="/Allproducts/ProductsDetails/:producId/AddToCart"
          element={<AddToCart />}
        />
        <Route path="/:UserId/Cart" element={<Cart />} />
        <Route path="/:UserId/History" element={<History />} />
        <Route path="/:UserId/Community" element={<Community />} />
        <Route path="/:UserId/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/:UserId" element={<Landingpage />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="/Feedback" element={<Feedback />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
