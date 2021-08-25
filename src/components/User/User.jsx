import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
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

User.defaultProps = {
  avatar: '',
  status: '',
};

User.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  followed: PropTypes.bool.isRequired,
  followingInProgress: PropTypes.arrayOf(PropTypes.number).isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
};

export default User;
