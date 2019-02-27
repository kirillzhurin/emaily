import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import { fetchUser } from '../actions';
import Dashboard from './Dashboard';
import LoginForm from './auth/LoginForm';
import RegisterFrom from './auth/RegisterForm';


const PrivateRoute = ({component: Component, auth, ...rest}) => {
  return (
    <Route {...rest} render={props =>  {
      switch (auth) {
        case null:
          return null;
        case false:
          return <Redirect to="/login" />          
        default:
          return <Component {...props} />
      }
    }
    } />
  );
}

class App extends React.Component {
  
  componentDidMount() {
    this.props.fetchUser();    
  }

  renderLoader() {
    if (this.props.auth === null) {
      return (
        <Dimmer active inverted>
          <Loader size='small'>Loading</Loader>
        </Dimmer>
      );
    }
  }

  render() {  
    return (
      <BrowserRouter>
        {this.renderLoader()}
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterFrom} />
        <PrivateRoute path="/" auth={this.props.auth} component={Dashboard} />
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(App);