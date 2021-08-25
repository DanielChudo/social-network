import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Dialog.css';

function Dialog({ id, name, surname, emoji }) {
  return (
    <NavLink
      to={`/dialogs/${id}`}
      className="dialogs__user"
      activeClassName="dialogs__user_active"
      exact
    >
      {`${name} ${surname} ${emoji}`}
    </NavLink>
  );
}

Dialog.defaultProps = {
  emoji: '',
};

Dialog.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  emoji: PropTypes.string,
};

export default Dialog;
