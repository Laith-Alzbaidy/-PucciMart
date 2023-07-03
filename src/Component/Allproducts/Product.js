import { useContext } from "react";
import Context from "../Context/Context";
import { Link } from "react-router-dom";

function Product() {
  const { allproducts } = useContext(Context);
  const { GetCurentId } = useContext(Context);

  const MapOfproduct = allproducts.map((product) => {
    return (
      <div className="card">
        <img className="img-product" src={product.image} alt="" />
        <div className="ContentCardProduct">
          <h3>{product.name}</h3>
          <p>{product.brand}</p>
          <span>
            {`$${product.price}`}
            <del>{`$${product.offer}`}</del>
          </span>
          <Link
            to={`ProductsDetails/${product.id}`}
            className="Details-product"
          >
            <button className="Details-product">Details</button>
          </Link>
        </div>
      </div>
    );
  });

  return <>{MapOfproduct}</>;
}

export default Product;
