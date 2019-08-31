import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthLayout from './AuthLayout';
import { registerUser } from '../../actions'

class RegisterForm extends React.Component {

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div className="field">
        <input className="form-control" {...input} placeholder={label} type={type} />
        <small className="c-field__message u-color-danger">
          {touched && error}
        </small>
      </div>
    );
  }
  
  render() {
    const { history, handleSubmit, registerUser } = this.props;

    return (
      <AuthLayout activePage="register">
        <form onSubmit={handleSubmit(values => registerUser(values, history))}>
          <Field className="form-control" name="firstName" type="text" label="First Name" component={this.renderField} />
          <Field className="form-control" name="lastName" type="text" label="Last Name" component={this.renderField} />
          <Field className="form-control" name="email" type="text" label="E-mail Address" component={this.renderField} />
          <Field className="form-control" name="password" type="password" label="Password" component={this.renderField} />
          <div className="form-button">
            <button type="submit" className="c-btn c-btn--info c-btn--fullwidth">Register</button>
          </div>
        </form>
      </AuthLayout>
    );
  }
};

const validate = ({ firstName, lastName, email, password }) => {
  const errors = {}
  
  if (!firstName) {
    errors.firstName = 'Required'
  } else if (firstName && firstName.length < 2) {
    errors.firstName = 'Must be at least 3 chars';
  }

  if (!lastName) {
    errors.lastName = 'Required'
  } else if (lastName && lastName.length < 2) {
    errors.lastName = 'Must be at least 3 chars';
  }

  if (!email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address'
  }

  if (!password) {
    errors.password = 'Required'
  } else if (password && password.length < 5) {
    errors.password = 'Must be at least 5 chars';
  } else if (password && !/\d/i.test(password)) {
    errors.password = 'Must contain a number';
  }
  return errors
}

export default reduxForm({ form: 'registerForm', validate })(connect(null, { registerUser })(withRouter(RegisterForm)));