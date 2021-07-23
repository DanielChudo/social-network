import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import UsersPage from './UsersPage';
import { follow, unfollow, requestUsers } from '../../redux/usersReducer';

function UsersContainer() {
  const { users, pageSize, totalUsers, isFetching, followingInProgress } =
    useSelector((state) => state.usersPage);
  let { page: curPage } = useParams();
  curPage = Number(curPage);

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = 'Друзья';
  }, []);

  useEffect(() => {
    dispatch(requestUsers(curPage, pageSize, totalUsers));
  }, [curPage]);

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
