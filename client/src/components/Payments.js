import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from '../actions';

class Payments extends React.Component {

  render() {
    return (
      <StripeCheckout 
        name="Emaily" 
        description="$5 for 5 email credits"
        amount={500} 
        token={this.props.handleToken} 
        stripeKey={process.env.REACT_APP_STRIPE_KEY}>
        <button className="c-btn c-btn--info">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
};

export default connect(null, { handleToken })(Payments);
