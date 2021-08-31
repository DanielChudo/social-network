import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { User, Paginator, Loader } from '../../components';
import { follow, getUsers, unfollow } from '../../redux/usersReducer';
import './UsersPage.css';

function UsersPage() {
  const users = useSelector((state) => state.usersPage.users);
  const pageSize = useSelector((state) => state.usersPage.pageSize);
  const totalUsers = useSelector((state) => state.usersPage.totalUsers);
  const isFetching = useSelector((state) => state.usersPage.isFetching);
  const followingInProgress = useSelector(
    (state) => state.usersPage.followingInProgress
  );

  useEffect(() => {
    document.title = 'Друзья';
  }, []);

  const dispatch = useDispatch();
  const curPage = Number(useParams().page);
  useEffect(() => {
    if (curPage) {
      dispatch(getUsers(curPage, pageSize, totalUsers));
    }
  }, [curPage]);

  // если NaN, например url был users/24lol
  if (!curPage) {
    return <Redirect to="/users/1" />;
  }

  return (
    <div id="users">
      <div className={`wrapper ${isFetching ? 'isFetching' : ''}`}>
        {users.map((user) => (
          <User
            key={user.id}
            id={user.id}
            avatar={user.photos.small}
            name={user.name}
            status={user.status}
            followed={user.followed}
            follow={(id) => dispatch(follow(id))}
            unfollow={(id) => dispatch(unfollow(id))}
            followingInProgress={followingInProgress}
          />
        ))}
        <Paginator
          curPage={curPage}
          totalUsers={totalUsers}
          pageSize={pageSize}
        />
      </div>
      {isFetching && <Loader />}
    </div>
  );
}

export default UsersPage;
