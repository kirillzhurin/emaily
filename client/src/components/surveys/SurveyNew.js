import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
  state = { showFormReview: false  };
  
  constructor(props) {
    super(props);
    
    this.state = { new: true };
  }

  renderContent() {
    if (this.state.showFormReview === true) {
      return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })}/>
    } 

    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true})} />
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);