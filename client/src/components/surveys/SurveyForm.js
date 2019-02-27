import React from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {

  renderFields() {
    return _.map(formFields, field => {
      return <Field key={field.name} {...field} type="text" component={SurveyField} />
    });
  }
  
  render() {
    
    return (
      <div className="c-card u-p-medium u-text-small u-mb-small">
        <form>
          {this.renderFields()}
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);