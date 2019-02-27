import React from 'react';
import _ from 'lodash';
import formFields from './formFields';

const SurveyFormReview = ({ formValues }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <dl key={name} className="u-flex u-pv-small u-border-bottom">
        <dt className="u-width-25">{label}:</dt>
        <dd>{formValues[name]}</dd>
      </dl>
    );
  });

  return (
    <div className="c-card u-p-medium u-text-small u-mb-small">
      <h6 className="u-text-bold">Please confirm your entries.</h6>
      {reviewFields}
    </div>
  );
};

export default SurveyFormReview;