import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import Context from "../Context/Context";
function ProductsDetails() {
  const [productDet, srtProductDet] = useState({});
  const params = useParams();
  console.log(params);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/products/${params.producId}`)
      .then((respons) => {
        console.log(respons.data);
        srtProductDet(respons.data);
        console.log(productDet);
      });
  }, []);

  return (
    <section>
      <div className="card-Details">
        <img className="img-product" src={productDet.image} alt="" />
        <div className="ContentCardProduct">
          <h3>{productDet.name}</h3>
          <p>{productDet.brand}</p>
          <p>{productDet.description}</p>
          <span>
            {`$${productDet.price}`}
            <del>{`$${productDet.offer}`}</del>
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProductsDetails;
