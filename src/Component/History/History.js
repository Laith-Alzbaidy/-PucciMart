import React, { useEffect, useState, useContext } from "react";
import Context from "../Context/Context";
import axios from "axios";

const History = () => {
  const [user, setUser] = useState({});
  const [history, setHistory] = useState([]);
  const { GetCurentId } = useContext(Context);
  const [total, setTotal] = useState([]);

  // Getting the current user ID
  const userId = GetCurentId();

  const getUser = () => {
    axios.get(`http://localhost:9001/users/${userId}`).then((response) => {
      setUser(response.data);
      setHistory(response.data.history);
    });
  };

  useEffect(() => {
    let totalCart = 0;
    history.forEach((cart) => {
      totalCart += cart.price;
    });
    setTotal(totalCart);
    getUser();
    console.log(totalCart);
  }, [history]);

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="card-header px-4 py-5">
                <h5 className="text-muted mb-0">
                  Thanks for your Order,{" "}
                  <span style={{ color: "rgb(10, 160, 130)" }}>
                    {user.username}
                  </span>
                  !
                </h5>
              </div>

              {history.map((cart) => {
                return (
                  <div className="card-body p-4" key={cart.id}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p
                        className="lead fw-normal mb-0"
                        style={{ color: "#a8729a" }}
                      >
                        Receipt
                      </p>
                      <p className="small text-muted mb-0">
                        Receipt Voucher : 1KAU9-84UIL
                      </p>
                    </div>
                    <div className="card shadow-0 border mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              src={cart.image}
                              className="img-fluid"
                              alt="Phone"
                            />
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">{cart.name}</p>
                          </div>

                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">{`quantity:${cart.quintity}`}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">{`$${cart.price}`}</p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">{`${cart.date}`}</p>
                          </div>
                        </div>
                        <hr
                          className="mb-4"
                          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                        />
                        <div className="row d-flex align-items-center"></div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div
                className="card-footer border-0 px-4 py-5"
                style={{
                  backgroundColor: "rgb(10, 160, 130)",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                  Total paid:{" "}
                  <span className="h2 mb-0 ms-2">{`$${total}`}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
