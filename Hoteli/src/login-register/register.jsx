import React, { useState } from 'react';
import fotoRegister from './fotoRegister.jpg';
import MeGusta from './MeGusta-Horizontal-removebg-preview.png';
import { NavLink} from "react-router-dom";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setErrorMessage('Name is required.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Email is required.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Password is required.');
      return;
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    setErrorMessage('');
  };

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
                        <div className="col-md-6 col-lg-5 d-none d-md-block"><img src={MeGusta} style={{ maxHeight: '100%', maxWidth: '100%' }}/></div>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Create your account
                      </h5>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          value={name}
                          onChange={handleNameChange}
                        />
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleSubmit}>
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
