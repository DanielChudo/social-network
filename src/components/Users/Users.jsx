import React from 'react';
import User from './User/User';
import Preloader from '../Preloader/Preloader';
import './Users.css';
import Paginator from './Paginator';

function Users(props) {
  const {
    curPage,
    totalUsers,
    pageSize,
    isFetching,
    followingInProgress,
    follow,
    unfollow,
  } = props;
  let { users } = props;
  users = users.map((user) => (
    <User
      key={user.id}
      id={user.id}
      avatar={user.photos.small}
      name={user.name}
      status={user.status}
      followed={user.followed}
      follow={follow}
      unfollow={unfollow}
      followingInProgress={followingInProgress}
    />
  ));

  return (
    <div id="users">
      {/* TODO: заменить на isFetching && <Preloader /> все конструкции. 
      Также просто надо пониже опустить, а не ставить z-index=1 */}
      {isFetching ? <Preloader /> : null}
      {/* TODO: заменить undefined на '' */}
      <div className={`wrapper ${isFetching ? 'isFetching' : undefined}`}>
        {users}
        <Paginator
          curPage={curPage}
          totalUsers={totalUsers}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}

export default Users;
