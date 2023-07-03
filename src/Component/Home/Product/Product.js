import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import Context from "../../Context/Context";

function Products() {
  const { allproducts } = useContext(Context);

  const { GetCurentId } = useContext(Context);

  const userId = GetCurentId();

  const OpenALLproduct = () => {
    if (userId >= 1) {
      return `/${userId}/Allproducts`;
    } else {
      return `Allproducts`;
    }
  };

  return (
    <section className="Products" id="Product">
      <div className="Title-section-product">
        <h1>All Pet</h1>
        <p>
          Shop the latest high-end designer products for your pups at our luxury
          dog boutique!
        </p>
      </div>
      <div className="cards">
        {allproducts.map((element) => {
          if (element.id <= 4) {
            return (
              <div className="card" key={element.id}>
                <img className="img-product" src={element.image} alt="" />
                <div className="ContentCardProduct">
                  <h3>{element.name}</h3>
                  <p>Male Young Tabby (mixed)</p>
                  <span>
                    $296<del>$350</del>
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="btn-All-Product">
        <Link to={OpenALLproduct()}>
          <button>All Products</button>
        </Link>
      </div>
    </section>
  );
}

export default Products;
