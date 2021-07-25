import React from 'react';

function ErrorMessage(props) {
  const { error } = props;
  const errorEmpty = !!error || 'login__form_error_empty';
  return <div className={`login__form_error ${errorEmpty}`}>{error}</div>;
}

export default ErrorMessage;
