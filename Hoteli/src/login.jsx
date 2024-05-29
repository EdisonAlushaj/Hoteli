import React, { useState } from 'react';
import axios from 'axios';
import loginfoto from './loginfoto.jpg';
import MeGusta from './MeGusta-Horizontal-removebg-preview.png';
import { NavLink, useNavigate } from "react-router-dom";
import cookieUtils from './cookieUtils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const GetLoginDetails = async () => {
    try {
      const response = await axios.post('https://localhost:7189/api/Account/login', {
        email: email,
        password: password
      });
  
      const token = response.data.token;
      console.log("JWT Token:", token);
  
      const parsedToken = parseJwt(token);
      console.log("Parsed Token:", parsedToken);
  
      const role = parsedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("User Role:", role);
  
      cookieUtils.setUserRoleInCookies(role);
  
      // Set the refresh token in cookies
      const refreshToken = response.data.refreshToken;
      cookieUtils.setRefreshToken(refreshToken);
  
      if (role === 'Admin') {
        console.log("Navigating to admin dashboard...");
        navigate('/dashboard');
      } else {
        console.log("Navigating to home page...");
        navigate('/home');
      }
  
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error parsing JWT token:", e);
      return null;
    }
  };

  return (
    <section style={{ backgroundColor: '#b07256' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={loginfoto}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 0', maxHeight: '100%', maxWidth: '100%' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <div className="col-md-6 col-lg-5 d-none d-md-block"><img src={MeGusta} style={{ maxHeight: '100%', maxWidth: '100%' }} /></div>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Log into your account
                      </h5>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Email
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={email} onChange={(e) => { setEmail(e.target.value) }}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password} onChange={(e) => { setPassword(e.target.value) }}
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={GetLoginDetails}>
                          Login
                        </button>
                      </div>
                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        Don't have an account? <NavLink to="/register"><button className="btn btn-dark btn-sm btn-block">Register here</button></NavLink>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
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

export default Login;
