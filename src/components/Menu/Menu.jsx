import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authReducer';
import './Menu.css';

function Menu() {
  const id = useSelector((state) => state.auth.id);
  const login = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  return (
    <div id="menu">
      <NavLink to={`/profile/${id}`} className="menu__item">
        Профиль
      </NavLink>
      <NavLink to="/dialogs/1" className="menu__item">
        Сообщения
      </NavLink>
      <NavLink to="/users/1" className="menu__item">
        Друзья
      </NavLink>
      <div className="menu__item">{login}</div>
      <div className="menu__item" onClick={() => dispatch(logout())}>
        Выйти
      </div>
    </div>
  );
}

export default Menu;
