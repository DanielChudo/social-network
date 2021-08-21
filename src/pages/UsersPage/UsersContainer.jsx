import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { follow, unfollow, requestUsers } from '../../redux/usersReducer';
import UsersPage from './UsersPage';

function UsersContainer() {
  // разбить на селекторы
  const { users, pageSize, totalUsers, isFetching, followingInProgress } =
    useSelector((state) => state.usersPage);
  let { page: curPage } = useParams();
  curPage = Number(curPage);

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = 'Друзья';
  }, []);

  useEffect(() => {
    if (curPage) {
      dispatch(requestUsers(curPage, pageSize, totalUsers));
    }
  }, [curPage]);

  // если NaN, например users/24lol
  if (!curPage) {
    return <Redirect to="/users/1" />;
  }

  return (
    <UsersPage
      users={users}
      curPage={curPage}
      totalUsers={totalUsers}
      pageSize={pageSize}
      isFetching={isFetching}
      followingInProgress={followingInProgress}
      unfollow={(id) => dispatch(unfollow(id))}
      follow={(id) => dispatch(follow(id))}
    />
  );
}

export default UsersContainer;
