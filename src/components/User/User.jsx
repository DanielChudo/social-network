import React from 'react';
import { NavLink } from 'react-router-dom';
import defaultAvatar from '../../images/defaultAvatar.png';
import './User.css';

function User({
  id,
  avatar,
  name,
  status,
  followed,
  followingInProgress,
  follow,
  unfollow,
}) {
  const followingInProgressTrigger = followingInProgress.includes(id);

  return (
    <div className="user">
      <NavLink to={`/profile/${id}`}>
        <img src={avatar || defaultAvatar} alt="user avatar" />
      </NavLink>
      <div className="user__info">
        <NavLink to={`/profile/${id}`}>{name}</NavLink>
        {status && <span className="user__status">{status}</span>}
      </div>
      {followed ? (
        <button
          type="button"
          disabled={followingInProgressTrigger}
          className={`user__button-unfollow ${
            followingInProgressTrigger ? 'isFetching' : ''
          }`}
          onClick={() => {
            unfollow(id);
          }}
        >
          Отписаться
        </button>
      ) : (
        <button
          type="button"
          disabled={followingInProgressTrigger}
          className={followingInProgressTrigger ? 'isFetching' : null}
          onClick={() => {
            follow(id);
          }}
        >
          Добавить в друзья
        </button>
      )}
    </div>
  );
}

export default User;
