// import logo from "./logo.png";
// import "./App.css";
import Nav from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
// import About from "./Component/Home/About/About";
// import Products from "./Component/Home/Product/Product";
// import Qotes from "./Component/Home/Qots/Qouts";
// import Services from "./Component/Home/Services/Services";
// import Hero from "./Component/Home/Herosection/hero";
import Feedback from "./Component/Post/Post";
import Landingpage from "./Component/Home/Landing";
import Profile from "./Component/Profile/Profile";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import { Routes, Route } from "react-router-dom";
import Community from "./Component/Community/Community";
import Allproducts from "./Component/Allproducts/Allproducts";
import ProductsDetails from "./Component/ProductDetails/ProductsDetails";
function App() {
  console.log(Allproducts);
  return (
    <>
      <Nav />
      <Routes>
        {/* <Landingpage /> */}
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
          path="Allproducts/ProductsDetails/:producId"
          element={<Allproducts />}
        />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="/:UserId" element={<Landingpage />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Feedback" element={<Feedback />} />
        <Route path="/:UserId/Community" element={<Community />} />
        <Route path="Community" element={<Community />} />
        {/* <Route path="/:UserId/Community" element={<Community />} /> */}
        <Route path="/:UserId/Profile" element={<Profile />} />
        {/* <Profile /> */}
        {/* <Feedback /> */}
        {/* <Hero />
      <Services />

      <About />
      <Products />
      <Qotes /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
