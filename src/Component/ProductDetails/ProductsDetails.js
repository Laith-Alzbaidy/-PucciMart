import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import Context from "../Context/Context";
function ProductsDetails() {
  const { GetCurentId } = useContext(Context);
  // Getting the current user ID
  const userId = GetCurentId();
  const [productDet, setProductDet] = useState({});
  const [cart, setcart] = useState([]);
  const [user, setUser] = useState({});
  const [price, setPrice] = useState("");
  const params = useParams();
  // console.log(params);

  useEffect(() => {
    axios
      .get(`http://localhost:9001/products/${params.producId}`)
      .then((respons) => {
        console.log(respons.data);
        setProductDet(respons.data);
        setPrice(respons.data.price);
      });
    getUser();
  }, []);

  const getUser = () => {
    axios.get(`http://localhost:9001/users/${userId}`).then((respons) => {
      setUser(respons.data);
      setcart(respons.data.cart);
    });
  };

  return (
    <section>
      <div className="card-Details">
        <img className="img-product" src={productDet.image} alt="" />
        <div className="ContentCardProduct">
          <h3>{productDet.name}</h3>
          <p>{productDet.brand}</p>
          <p>{productDet.description}</p>
          <span>
            {`Price $${productDet.price}`}
            {/* <del>{`$${productDet.offer}`}</del> */}
          </span>
        </div>
        <Link className="AddtoCart" to="AddToCart">
          Continue to add cart{" "}
        </Link>
      </div>
    </section>
  );
}

export default ProductsDetails;
