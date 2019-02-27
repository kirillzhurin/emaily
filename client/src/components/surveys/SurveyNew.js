import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { submitSurvey } from '../../actions';

class SurveyNew extends React.Component {
  state = { showFormReview: false  };
  
  constructor(props) {
    super(props);
    this.state = { new: true };
  }

  renderButtons() {
    const { handleSubmit, submitSurvey, history } = this.props;
    
    if (this.state.showFormReview) {
      return (
        <div>
          <button onClick={() => this.setState({ showFormReview: false })} className="c-btn c-btn--secondary u-ml-small">Back</button>
          <button onClick={() => submitSurvey(this.formValues, history)} className="c-btn c-btn--success u-ml-xsmall" type="button ">
            Send Survey
          </button>
        </div>
      );
    }

    return (
      <div>
        <Link to="/" className="c-btn c-btn--secondary u-ml-small">Cancel</Link>
        <button onClick={handleSubmit(this.onSubmitSurveyForm)} className="c-btn c-btn--success u-ml-xsmall" type="button ">
          Next
        </button>
      </div>
    );
  }

  onSubmitSurveyForm = (values) => {
    this.setState({ showFormReview: true });
    this.formValues = values;
  }

  renderContent() {
    if (this.state.showFormReview === true) {
      return <SurveyFormReview formValues={this.formValues} />
    } 

    return <SurveyForm />
  }

  render() {
    return (
      <div>
        <div className="c-toolbar u-mb-medium">
          <h3 className="c-toolbar__title has-divider">New Survey</h3>
          <h5 className="c-toolbar__meta u-mr-auto">Dashboard</h5>
          {this.renderButtons()}
        </div>
        <div className="container">
          <div className="row u-mb-large">
            <div className="col-sm-12">
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default reduxForm({
  form: 'surveyForm'
})(connect(null, { submitSurvey })(withRouter(SurveyNew)));