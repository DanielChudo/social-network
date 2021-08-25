import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage({ error }) {
  const errorEmpty = error || 'login__form_error_empty';
  return <div className={`login__form_error ${errorEmpty}`}>{error}</div>;
}

ErrorMessage.defaultProps = {
  error: '',
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
