import React, { useState } from 'react';
import fotoRegister from './fotoRegister.jpg';
import MeGusta from './MeGusta-Horizontal-removebg-preview.png';
import { NavLink } from "react-router-dom";
import axios from 'axios';

function Register() {
  const [errorMessage, setErrorMessage] = useState('');

  const [FullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [Password, setPassword] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    const url = 'https://localhost:7189/api/Userr';
    const data = {
      "UserFullName": FullName,
      "UserEmail": Email,
      "UserContactNumber": ContactNumber,
      "UserPassword": Password,
    }

    axios.post(url, data)
      .then((result) => {
        clear();
        alert('User has been registered.');
      })
      .catch((error) => {
        setErrorMessage('Failed to register user.');
      });
  }

  const clear = () => {
    setFullName('');
    setEmail('');
    setContactNumber('');
    setPassword('');
  }

  return (
    <section style={{ backgroundColor: '#b07256'}}>
      <div className="container py-5 h-100 w-75">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={fotoRegister}
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
                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                          <img src={MeGusta} style={{ maxHeight: '100%', maxWidth: '100%' }} alt="logo" />
                        </div>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Create your account
                      </h5>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          value={FullName}
                          onChange={handleFullNameChange}
                        />
                      </div>
                      <div className="form-outline mb-4">  
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          value={Email}
                          onChange={handleEmailChange}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="contactNumber">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          id="contactNumber"
                          className="form-control form-control-lg"
                          value={ContactNumber}
                          onChange={handleContactNumberChange}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          value={Password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleRegister}>
                          Register
                        </button>
                      </div>
                      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                        Already have an account? <NavLink to="/login" className="text-decoration-none"><button className="btn btn-dark btn-sm btn-block">Log in here</button></NavLink>
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

export default Register;