import './auth.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Auth = ({ activePage, children }) => {
  return (
    <div style={{height: '100%'}}>
        <div className="website-logo">
          <div className="logo">
            <img className="logo-size" src="images/logo-light.svg" alt="" />
          </div>
        </div>
      <div className="ui grid" style={{height: '100%'}}>
        <div className="img-holder">
          <div className="bg"></div>
          <div className="info-holder">
            <img src="images/email.svg" alt="" />
          </div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Emaily</h3>
              <p>Collect feedback from your users.<br />Help you to improve your service and customer satisfaction.</p>
              <p>{activePage[0].toUpperCase() + activePage.slice(1)} for getting more things.</p>
              <div className="page-links">
                <Link to="/login" className={activePage === 'login' ? 'active' : ''}>Login</Link>
                <Link to="/register" className={activePage === 'register' ? 'active' : ''}>Register</Link>
              </div>
              {children}
              <div className="other-links">
                <span>Or {activePage} with</span><a href="/auth/facebook">Facebook</a><a href="/auth/google">Google</a>
              </div>
            </div>
          </div>
            </div>
      </div>
    </div>
    
  );
}

export default Auth;