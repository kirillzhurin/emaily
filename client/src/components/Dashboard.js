import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Header from './Header';
import SurveyList from './surveys/SurveyList';
import SurveyNew from './surveys/SurveyNew';
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route path="/" exact component={SurveyList} />
        <Route path="/surveys/new" component={SurveyNew} />
      </div>
    );
  }
  
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);