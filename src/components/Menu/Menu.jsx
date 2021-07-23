import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authReducer';
import './Menu.css';

function Menu() {
  const { isAuth, login, id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div id="menu">
      {isAuth ? (
        <>
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
        </>
      ) : (
        <NavLink to="/login" className="menu__item">
          Войти
        </NavLink>
      )}
    </div>
  );
}

export default Menu;
