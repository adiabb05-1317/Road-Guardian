/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import axios from "axios";
import { useState } from "react";
import "./UserLogin.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_Decode from "jwt-decode";
export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const hist = useNavigate();
  const token = localStorage.getItem("token");
  const validateToken = () => {
    if (token) {
      const decodedToken = jwt_Decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (validateToken()) {
        alert("Login Successful");

        hist("/detection");
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="login-box">
    //   <h1 style={{color:'white'}}>Welcome Back!</h1>
    //          <form className="login-form" onSubmit={HandleLogin}>
    //          <input className="user-login" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   <input className="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <button type="submit">Log in</button>
    //   <Link to="/signup">Don't have an account? Sign up here.</Link>
    //          </form>
    // </div>
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h2 style={{ font: "bolder", fontSize: "0.3", color: "" }}>
              Login Here
            </h2>
            <form>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="form1Example13"
                  className="form-control form-control-lg"
                />
                <label className="form-label" for="form1Example13">
                  Username
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                />
                <label className="form-label" for="form1Example23">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    checked
                  />
                  <label className="form-check-label" for="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              <button
                type="submit"
                onClick={HandleLogin}
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
              </a>

              <Link to="/signup">Dont have an account!Register Here</Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
