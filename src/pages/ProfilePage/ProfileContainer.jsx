import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components';
import ProfilePage from './ProfilePage';
import {
  addPost,
  getProfileData,
  setProfileData,
  getStatus,
  updateStatus,
  uploadAvatar,
} from '../../redux/profileReducer';

function ProfileContainer() {
  const dispatch = useDispatch();
  const { posts, profile, status } = useSelector((state) => state.profilePage);
  const id = useSelector((state) => state.auth.id);
  let { userId } = useParams();
  userId = Number(userId);

  useEffect(() => {
    dispatch(getProfileData(userId));
    dispatch(getStatus(userId));

    return () => {
      // чтобы не мерцал профиль
      dispatch(setProfileData(null));
    };
  }, [userId]);

  if (!profile) {
    return <Loader />;
  }

  return (
    <ProfilePage
      // если сравнивать с userId из url, то будет мерцание
      isOwner={id === profile.userId}
      posts={posts}
      profile={profile}
      addPost={(title, post) => dispatch(addPost(title, post))}
      status={status}
      updateStatus={(statusText) => dispatch(updateStatus(statusText))}
      uploadAvatar={(avatar) => dispatch(uploadAvatar(avatar))}
    />
  );
}

export default ProfileContainer;
