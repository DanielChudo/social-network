import React from 'react';

function ErrorMessage({ error }) {
  const errorEmpty = !!error || 'login__form_error_empty';
  return <div className={`login__form_error ${errorEmpty}`}>{error}</div>;
}

export default ErrorMessage;
