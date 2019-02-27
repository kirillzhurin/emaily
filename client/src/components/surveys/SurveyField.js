import React from 'react';

export default ({ input, label, meta: {error, touched} }) => {
  return (
    <div className="c-field">
      <label className="c-field__label">{label}</label>
      <input className="c-input" {...input} />
      <small className="c-field__message u-color-danger">
        {touched && error}                    
      </small>
    </div>
  );
}