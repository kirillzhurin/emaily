import React from 'react';
import { Button } from 'semantic-ui-react';
import AuthLayout from './AuthLayout';

class SignupForm extends React.Component {
  render() {
    return (
      <AuthLayout activePage="register">
        <form>
            <input class="form-control" type="text" name="name" placeholder="Full Name" required />
            <input class="form-control" type="email" name="email" placeholder="E-mail Address" required />
            <input class="form-control" type="password" name="password" placeholder="Password" required />
            <div class="form-button">
              <button className="c-btn c-btn--info c-btn--fullwidth">Register</button>
            </div>
        </form>
      </AuthLayout>
    );
  }
};

export default SignupForm;