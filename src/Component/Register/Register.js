import React, { useContext, useState } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import axios from "axios";

function Register() {
  // Access the register function from the context
  const { SetRegister } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const { users } = useContext(Context);
  const navigation = useNavigate();

  // errors with registration validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-={}[\]:;'"<>,.?/~]).{8,}$/;

  // State to store form data
  const [formData, setFormData] = useState({
    image:
      "https://img.freepik.com/premium-vector/businessman-profile-cartoon_18591-58479.jpg?w=2000",
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
    gender: "",
    phone: "",
    firstname: "",
    lastname: "",
    address: "",
    cart: [],
    posts: [
      {
        comments: [],
      },
    ],
    history: [],
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  function validationRegister() {
    if (
      formData.email !== "" &&
      formData.username !== "" &&
      formData.password !== "" &&
      formData.confirmpassword !== "" &&
      formData.gender !== "" &&
      formData.email.match(emailRegex) &&
      formData.password.match(passwordRegex) &&
      !formData.password.includes("&") &&
      formData.password === formData.confirmpassword
    ) {
      SetRegister(formData);
      navigation("/Login");
    }
  }

  const validemail = users.find((element) => {
    return element.email === formData.email;
  });

  // Function to handle form submission
  const handleForm = (event) => {
    event.preventDefault();
    if (validateForm()) {
      validationRegister();
    }
  };

  // Function to handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateForm();
  };

  const [errors, setErrors] = useState({}); // State to store form errors

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (formData.email === "") {
      formErrors.email = "Email is required*";
      isValid = false;
    } else if (!formData.email.match(emailRegex)) {
      formErrors.email = "Invalid email address example xxx@xxx.com*";
      isValid = false;
    } else if (validemail) {
      formErrors.email = "Email already exists*";
      isValid = false;
    } else {
      formErrors.email = ""; // Clear the error if valid
    }

    if (formData.password === "") {
      formErrors.password = "Password is required*";
      isValid = false;
    } else if (!formData.password.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
      formErrors.password =
        "Password must contain at least one lowercase letter and one uppercase letter*";
      isValid = false;
    } else if (!formData.password.match(/^.{8,}$/)) {
      formErrors.password = "Password must be at least 8 characters long*";
      isValid = false;
    } else if (
      !formData.password.match(/^(?=.*[!@#$%^&*()_+\-={}[\]:;'"<>,.?/~]).+$/)
    ) {
      formErrors.password = "The password must contain at least one symbol*";
      isValid = false;
    } else if (formData.password.includes("&")) {
      formErrors.password = "Password contains an invalid character (&)";
      isValid = false;
    } else if (formData.password !== formData.confirmpassword) {
      formErrors.password = "Passwords do not match*";
      isValid = false;
    } else {
      formErrors.password = ""; // Clear the error if valid
    }

    if (formData.confirmpassword === "") {
      formErrors.confirmpassword = "Confirm Password is required*";
      isValid = false;
    } else if (formData.confirmpassword !== formData.password) {
      formErrors.confirmpassword = "Passwords do not match*";
      isValid = false;
    } else {
      formErrors.confirmpassword = ""; // Clear the error if valid
    }

    if (formData.username === "") {
      formErrors.username = "Username is required*";
      isValid = false;
    } else if (formData.username.length < 4) {
      formErrors.username = "Username must be at least 4 characters*";
      isValid = false;
    } else {
      formErrors.username = ""; // Clear the error if valid
    }

    if (formData.lastname === "") {
      formErrors.lastname = "Last name is required*";
      isValid = false;
    } else if (formData.lastname.length < 4) {
      formErrors.lastname = "Last name must be at least 4 characters*";
      isValid = false;
    } else {
      formErrors.lastname = ""; // Clear the error if valid
    }

    if (formData.firstname === "") {
      formErrors.firstname = "First name is required*";
      isValid = false;
    } else if (formData.firstname.length < 4) {
      formErrors.firstname = "First name must be at least 4 characters*";
      isValid = false;
    } else {
      formErrors.firstname = ""; // Clear the error if valid
    }

    if (formData.gender === "") {
      formErrors.gender = "Gender is required*";
      isValid = false;
    } else {
      formErrors.gender = ""; // Clear the error if valid
    }

    setErrors(formErrors); // Store the errors in state
    return isValid;
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleForm}>
        <h2>Register</h2>

        <div className="field-register">
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            onChange={handleChange}
            name="firstname"
            value={formData.firstname}
          />
          {errors.firstname && (
            <span className="errors-color">{errors.firstname}</span>
          )}
        </div>
        <div className="field-register">
          <input
            type="text"
            id="confirmpassword"
            placeholder="Last Name"
            onChange={handleChange}
            name="lastname"
            value={formData.lastname}
          />
          {errors.lastname && (
            <span className="errors-color">{errors.lastname}</span>
          )}
        </div>
        <div className="field-register">
          <input
            type="text"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
          {errors.email && <span className="errors-color">{errors.email}</span>}
        </div>
        <div className="field-register">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
          {errors.username && (
            <span className="errors-color">{errors.username}</span>
          )}
        </div>
        {/* 
        <div className="container-Password">
            <i
              id="eyes"
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={toggleShowPassword}
            ></i>
            <input
              type={showPassword ? "text" : "password"}
              value={currentUser.password}
            />
          </div> */}

        <div className="field-register showPassword">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            name="password"
          />
          {errors.password && (
            <span className="errors-color">{errors.password}</span>
          )}
          <i
            id="eyessReg"
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            onClick={toggleShowPassword}
          ></i>
        </div>
        <div className="field-register">
          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            name="confirmpassword"
            value={formData.confirmpassword}
          />
          {errors.confirmpassword && (
            <span className="errors-color">{errors.confirmpassword}</span>
          )}
        </div>
        <div className="field-register">
          <select name="gender" id="gender" onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <span className="errors-color">{errors.gender}</span>
          )}
        </div>
        <button type="submit">Register</button>
        <Link to="/Login">Click here to Login</Link>
      </form>
    </div>
  );
}

export default Register;
