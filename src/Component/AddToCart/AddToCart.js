import axios from "axios";
import "./AddToCart.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "../Context/Context";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddToCart() {
  const navigate = useNavigate();
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
      .get(`http://localhost:9000/products/${params.producId}`)
      .then((respons) => {
        console.log(respons.data);
        setProductDet(respons.data);
        setPrice(respons.data.price);
      });
    getUser();
  }, []);
  // console.log(price);

  const getUser = () => {
    axios.get(`http://localhost:9000/users/${userId}`).then((respons) => {
      setUser(respons.data);
      setcart(respons.data.cart);
    });
  };

  const UpdateUser = () => {
    const find = cart.find((product) => {
      return product.id === productDet.id;
    });

    const date = new Date();
    const datenow = date.toISOString();
    if (find === undefined) {
      const AddCar = {
        id: productDet.id,
        price: productDet.price,
        quintity: productDet.quintity,
        name: productDet.name,
        image: productDet.image,
        date: datenow,
      };
      const newCart = [...cart, AddCar];
      setcart(newCart);
      axios
        .put(`http://localhost:9000/users/${userId}`, {
          ...user,
          cart: newCart,
        })
        .then((response) => {
          // console.log(response.data);
        });
    } else {
      const updatedCart = cart.map((product) => {
        if (product.id === productDet.id) {
          return {
            ...product,
            quintity: product.quintity + product.quintity,
            price: (productDet.price * product.quintity) / 2,
          };
        }
        return product;
      });

      setcart(updatedCart);
      axios
        .put(`http://localhost:9000/users/${userId}`, {
          ...user,
          cart: updatedCart,
        })
        .then((response) => {
          // console.log(response.data);
        });
    }
  };

  function addToCart() {
    UpdateUser();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        navigate(`/${userId}/cart`); // navigate(`/${userId}/AllProducts`);
      }
    });
  }

  const increase = () => {
    const newquintity = productDet.quintity + 1;
    const newPrice = productDet.price + price;
    setProductDet({
      ...productDet,
      quintity: newquintity,
      price: newPrice,
    });
  };
  const decrease = () => {
    const newquintity = productDet.quintity - 1;
    const newPrice = productDet.price - price;
    setProductDet({
      ...productDet,
      quintity: newquintity,
      price: newPrice,
    });
  };
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <hr className="my-4" />

                      {/* Product 1 */}
                      <div className="row mb-4 d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={productDet.image}
                            className="img-fluid rounded-3"
                            alt="Cotton T-shirt"
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <h6 className="text-muted">{productDet.name}</h6>
                          <h6 className="text-black mb-0">
                            {productDet.brand}
                          </h6>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          <button className="btn btn-link px-2">
                            <i onClick={decrease} className="fas fa-minus"></i>
                          </button>

                          <input
                            id="form1"
                            min="0"
                            name="quintity"
                            value={productDet.quintity}
                            type="number"
                            className="form-control form-control-sm"
                          />

                          <button className="btn btn-link px-2">
                            <i onClick={increase} className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 className="mb-0">{`$${price}`}</h6>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end"></div>
                      </div>

                      {/* Product 2 */}
                      <hr className="my-4" />

                      {/* Product 3 */}
                      <hr className="my-4" />

                      {/* Back to shop */}
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a href="#!" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />
                      {/* Summary content */}
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">
                          {`item : ${productDet.quintity}`}
                        </h5>
                      </div>
                      <h5 className="text-uppercase mb-3">Shipping</h5>
                      <hr className="my-4" />
                      {/* Total price */}
                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>{`$${productDet.price}`}</h5>
                      </div>
                      <button
                        onClick={addToCart}
                        type="button"
                        className="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddToCart;
