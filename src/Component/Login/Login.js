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
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // Function to handle changes in the email input field
  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  // Function to handle changes in the password input field
  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  // Function to handle the form submission
  const handleForm = async (event) => {
    event.preventDefault();
    await getCurrentUser();
  };

  // Function to get the current user from the API
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9001/users/?email=${email}&password=${password}`
      ); // Update the URL to the correct API endpoint

      if (response.data[0]) {
        // If the response data is not empty
        if (
          response.data[0].email === email &&
          response.data[0].password === password
        ) {
          // If the email and password match
          setErrors("");
          Navigate(`/${response.data[0].id}`);
          // setCurentUser(response.data[0]);
        } else {
          // If the email or password is invalid
          setErrors("Email or password is invalid");
        }
      } else {
        // If the response data is empty
        setErrors("Email or password is invalid");
      }
    } catch (error) {
      console.error(error);
    }
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
        <div className="field-register showPassword">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handlePassword}
            name="password"
          />
          <i
            id="eyessReg"
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={toggleShowPassword}
          ></i>
        </div>
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
