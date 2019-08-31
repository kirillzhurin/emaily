import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import AuthLayout from './AuthLayout';
import { loginUser } from '../../actions'
class LoginForm extends React.Component {
  
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
    const { authErrors, handleSubmit, loginUser, history } = this.props;
    let message;
    if (authErrors.login) {
      message = (<div className="c-alert c-alert--danger alert fade show">
                    <i className="c-alert__icon fa fa-times-circle"></i> Invalid email or password!
                  </div>)
    }                
    return (
      <AuthLayout activePage="login">
        {message}  
        <form onSubmit={handleSubmit(values =>  loginUser(values, history))}>
          <Field className="form-control" name="username" type="text" label="E-mail Address" component={this.renderField} />
          <Field className="form-control" name="password" type="password" label="Password" component={this.renderField} />
          <div className="form-button">
              <button type="submit" className="c-btn c-btn--info c-btn--fullwidth">Login</button>
          </div>
        </form>
      </AuthLayout>
    );
  }
};

const validate = ({ username }) => {
  const errors = {}

  if (!username) {
    errors.username = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)) {
    errors.username = 'Invalid email address'
  }
  return errors
}

function mapStateToProps({ authErrors }){
 return { authErrors };
}

export default reduxForm({ form: 'loginForm', validate })(connect(mapStateToProps, { loginUser })(withRouter(LoginForm)));