import { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import { Link } from "react-router-dom";
import axios from "axios";

function Product({ product }) {
  // const { allproducts } = useContext(Context);
  const { GetCurentId } = useContext(Context);

  return (
    <>
      <Link to={`ProductsDetails/${product.id}`} className="card">
        <img className="img-product" src={product.image} alt="" />
        <div className="ContentCardProduct">
          <h3>{product.name}</h3>
          <p>{product.brand}</p>
          <span>
            {`Price $${product.price}`}
            {/* <del>{`$${product.offer}`}</del> */}
          </span>
          <Link
            to={`ProductsDetails/${product.id}`}
            className="Details-product"
          >
            <button className="Details-product">Details</button>
          </Link>
        </div>
      </Link>
    </>
  );
}

export default Product;
