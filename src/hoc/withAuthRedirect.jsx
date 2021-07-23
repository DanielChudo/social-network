/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

function withAuthRedirect(Component) {
  function RedirectComponent(props) {
    const { isAuth } = props;
    if (!isAuth) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  }

  return connect(mapStateToProps)(RedirectComponent);
}

export default withAuthRedirect;
