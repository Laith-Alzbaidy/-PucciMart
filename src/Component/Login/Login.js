import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";

function Login() {
  const Navigate = useNavigate();
  const { setCurentUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleForm = (event) => {
    event.preventDefault();
    getCurrentUser();
  };

  const getCurrentUser = () => {
    axios
      .get(`http://localhost:9000/users/?email=${email}&password=${password}`)
      .then((response) => {
        if (response.data[0]) {
          if (
            response.data[0].email === email &&
            response.data[0].password === password
          ) {
            setErrors("");
            Navigate(`/${response.data[0].id}`);
            // setCurentUser(response.data[0]);
          } else {
            setErrors("Email or password is invalid");
          }
        } else {
          setErrors("Email or password is invalid");
        }
      });
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleForm}>
        <h2>Login</h2>
        <input
          type="text"
          id="email"
          placeholder="Email"
          onChange={handleEmail}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handlePassword}
        />
        {errors && <span className="errors-color">{errors}</span>}
        <button type="submit">Login</button>
        <p>
          <Link to="/Register">Not registered? Click here to register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
