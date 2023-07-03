import Logo from "../../Imges/Logo.png";
import "./Navbar.css";
import { Link, useParams } from "react-router-dom";
import Context from "../Context/Context";
import { useContext } from "react";
import { HashLink } from "react-router-hash-link";
function Nav() {
  const { GetCurentId } = useContext(Context);
  const userId = GetCurentId();
  const params = useParams();

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
      return `/${userId}/#Product`;
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

  console.log(userId);
  return (
    <header>
      <Link to="/">
        <img className="Logo" src={Logo} alt="" />
      </Link>
      <nav>
        <ul className="list-nav">
          <HashLink to={getUserIdHome()}>
            <li>Home</li>
          </HashLink>
          <HashLink to={goToServices()}>
            <li>Services</li>
          </HashLink>
          <HashLink to={goToProduct()}>
            <li>Product</li>
          </HashLink>
          <HashLink to={goToAbout()}>
            <li>About Us</li>
          </HashLink>
          {userId >= 1 ? (
            <>
              <Link to={LocationCommunity()}>
                <li>Community</li>
              </Link>
              <Link to={`${userId}/Profile`}>
                <li>EditProfile</li>
              </Link>
            </>
          ) : null}
        </ul>
      </nav>
      <div>
        {userId >= 1 ? (
          <>
            <Link className="btn-Login" to="/">
              LogOut
            </Link>
          </>
        ) : (
          <Link className="btn-Login" to="/Login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Nav;
