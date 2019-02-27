import React from 'react';

import AuthLayout from './AuthLayout';

class LoginForm extends React.Component {
  render() {
    return (
      <AuthLayout activePage="login">
        <form>
          <input className="form-control" type="text" name="username" placeholder="E-mail Address" required />
          <input className="form-control" type="password" name="password" placeholder="Password" required />
          <div className="form-button">
              <button className="c-btn c-btn--info c-btn--fullwidth">Login</button>
          </div>
        </form>
      </AuthLayout>
    );
  }
};

export default LoginForm;