import React from 'react';
import { NavLink } from 'react-router-dom';
import './Dialog.css';

function Dialog(props) {
  const { id, name, surname, emoji } = props;

  return (
    <NavLink
      to={`/dialogs/${id}`}
      className="dialogs__user"
      activeClassName="dialogs__user_active"
      exact
    >
      {`${name} ${surname} ${emoji || ''}`}
    </NavLink>
  );
}

export default Dialog;
