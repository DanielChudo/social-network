import React from 'react';
import { NavLink } from 'react-router-dom';
import './Dialog.css';

function Dialog({ id, name, surname, emoji }) {
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
