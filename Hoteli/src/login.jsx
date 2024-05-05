import React, { useState } from 'react';
import loginfoto from './loginfoto.jpg';
import MeGusta from './MeGusta-Horizontal-removebg-preview.png';
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function GetLoginDetails() {
    let items = { email, password };
    console.warn(items);
    fetch('https://localhost:7189/api/Login', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(items)
    })
   .then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        if (resp.role === 'admin') {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      });
    })
   .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

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
                        <div className="col-md-6 col-lg-5 d-none d-md-block"><img src={MeGusta} style={{ maxHeight: '100%', maxWidth: '100%' }}/></div>
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
