import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Login() {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const handleOnChange = (e) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    console.log(userData);
    axios
      .post("http://localhost:9000/users/signin", userData)
      .then((response) => {
        console.log(response);
        
        if (response.data.success === true) {
          localStorage.setItem("token", response.data.token);
          console.log(response)

          Swal.fire({
            position: "top-end",
            title: "Login Successful",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate("/book");
          });
        } else {
          Swal.fire({
            position: "top-end",
            title: "Wrong Credentials",
            text: response.data.message,
            icon: "error",
          });
        }
      }).catch((error)=>{
        console.log(error.response.data)
        Swal.fire({
          text: error.response.data.message,
          icon: "error",
        });
      })
  };

  return (
    <div className="row login">
      <div className="col-md-8 login-section">
        <img
          className="logo"
          src={require("../assets/library-logo.png")}
          alt="Library"
        />
        <div className="login-form">
          <h1 className="title">Welcome Back</h1>
          <p className="text"> Login into your account</p>
          <input
            className="field"
            placeholder="User name"
            name="userName"
            onChange={(e) => handleOnChange(e)}
          ></input>
          <input
            className="field"
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => handleOnChange(e)}
          ></input>

          <button className="login-buttons" onClick={handleLogin}>
            Login
          </button>
          <p>Or</p>
          <button className="login-buttons">Sign-Up</button>
        </div>
      </div>
      <div className="col-md-4 image-section"></div>
    </div>
  );
}

export default Login;
