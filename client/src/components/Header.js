import React from 'react';
import { connect } from 'react-redux';
import Payments from './Payments';
import { Dropdown } from 'semantic-ui-react';

class Header extends React.Component {

  trigger = (
    <span className="c-avatar c-avatar--xsmall has-dropdown dropdown-toggle">
      <img className="c-avatar__img" src="/images/user.png" alt="User's Profile" />
    </span>
  );

  render() {
    const { auth: { firstName, lastName } } = this.props;
    return (
      <header className="c-navbar">
        <span className="c-navbar__brand u-mr-auto">
          <img src="/images/logo-dark.svg" alt="Emaily logo" />
        </span>
        <Payments />
        <div className="u-text-right u-mh-medium">
          Credits: {this.props.auth.credits}
        </div>
        <div>
          <Dropdown icon={null} trigger={this.trigger}  direction="left">
            <Dropdown.Menu>
              <Dropdown.Item disabled>Signed in as <strong>{firstName} {lastName}</strong></Dropdown.Item>
              <Dropdown.Item as="a" href="/api/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(Header);