import Logo from "../../Imges/Logo.png";
import "./Navbar.css";
import { Link, useParams } from "react-router-dom";
import Context from "../Context/Context";
import { useContext, useState } from "react";
import { HashLink } from "react-router-hash-link";
function Nav() {
  const { GetCurentId } = useContext(Context);
  const [toggle, setToggle] = useState(false);
  const userId = GetCurentId();
  const params = useParams();

  const toogleBurger = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  const LocationCommunity = () => {
    if (userId == "Community") {
      return `/Community`;
    } else {
      return `${userId}/Community`;
    }
  };
  function getUserIdHome() {
    if (userId >= 1) {
      return `/${userId}`;
    } else {
      return "/";
    }
  }

  function goToAbout() {
    if (userId >= 1) {
      return `/${userId}/#About`;
    } else {
      return "/#About";
    }
  }
  function goToProduct() {
    if (userId >= 1) {
      return `/${userId}/Allproducts`;
    } else {
      return "/#Product";
    }
  }
  function goToServices() {
    if (userId >= 1) {
      return `/${userId}/#Services`;
    } else {
      return "/#Services";
    }
  }
  // function goToProduct() {
  //   if (userId >= 1) {
  //     return `/${userId}/#Product`;
  //   } else {
  //     return "/#product";
  //   }
  // }

  console.log(userId);
  return (
    <header>
      <Link to="/">
        <img className="Logo" src={Logo} alt="" />
      </Link>
      <nav className={toggle ? "active" : ""}>
        <ul className="list-nav">
          <HashLink onClick={() => setToggle(false)} to={getUserIdHome()}>
            <li>Home</li>
          </HashLink>
          <HashLink onClick={() => setToggle(false)} to={goToServices()}>
            <li>Services</li>
          </HashLink>
          <HashLink onClick={() => setToggle(false)} to={goToProduct()}>
            <li>Product</li>
          </HashLink>
          <HashLink onClick={() => setToggle(false)} to={goToAbout()}>
            <li>About Us</li>
          </HashLink>
          {userId >= 1 ? (
            <>
              <Link onClick={() => setToggle(false)} to={LocationCommunity()}>
                <li>Community</li>
              </Link>
              <Link onClick={() => setToggle(false)} to={`${userId}/Profile`}>
                <li>EditProfile</li>
              </Link>
              <Link onClick={() => setToggle(false)} to={`${userId}/Cart`}>
                <li>Cart</li>
              </Link>
              <Link onClick={() => setToggle(false)} to={`${userId}/History`}>
                <li>History</li>
              </Link>
              <div></div>
            </>
          ) : null}
        </ul>
      </nav>

      <div onClick={toogleBurger} className="togle-nav">
        <i className={toggle ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>
      {userId >= 1 ? (
        <>
          <Link onClick={() => setToggle(false)} className="btn-Login" to="/">
            LogOut
          </Link>
        </>
      ) : (
        <Link className="btn-Login" to="/Login" style={{ display: "block" }}>
          Login
        </Link>
      )}
    </header>
  );
}

export default Nav;
