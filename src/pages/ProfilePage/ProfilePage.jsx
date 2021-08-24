import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import autosize from 'autosize';
import * as Yup from 'yup';
import defaultAvatar from '../../images/defaultAvatar.png';
import {
  Post,
  UploadAvatarButton,
  ProfileStatus,
  Loader,
} from '../../components';
import {
  addPost,
  getProfileData,
  getStatus,
  setProfileData,
  updateStatus,
  uploadAvatar,
} from '../../redux/profileReducer';
import './ProfilePage.css';

function ProfilePage() {
  const postTextRef = useRef(null);
  useEffect(() => {
    autosize(postTextRef.current);
  }, []);

  const id = useSelector((state) => state.auth.id);
  let { userId } = useParams();
  userId = Number(userId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileData(userId));
    dispatch(getStatus(userId));

    return () => {
      // чтобы не мерцал профиль
      dispatch(setProfileData(null));
    };
  }, [userId]);

  const profile = useSelector((state) => state.profilePage.profile);
  const posts = useSelector((state) => state.profilePage.posts);
  const status = useSelector((state) => state.profilePage.status);

  if (!profile) {
    return <Loader />;
  }

  const isOwner = id === profile.userId;

  return (
    <div id="profile">
      <div id="avatar">
        <img src={profile.photos.large || defaultAvatar} alt="user avatar" />
        {isOwner && (
          <UploadAvatarButton
            uploadAvatar={(avatar) => dispatch(uploadAvatar(avatar))}
          />
        )}
      </div>
      <div id="profile__page">
        <div id="profile__page-bio">
          <p style={{ fontSize: '20pt' }}>{profile.fullName}</p>
          <ProfileStatus
            status={status}
            updateStatus={(statusText) => dispatch(updateStatus(statusText))}
            isOwner={isOwner}
          />
          <ul>
            <li>
              <strong>4</strong> публикации
            </li>
            <li>
              <strong>78</strong> отметок
            </li>
            <li>
              <strong>9</strong> упоминаний
            </li>
          </ul>
        </div>
        {isOwner && <AddPostForm postTextRef={postTextRef} />}
        <div id="posts">
          {posts.map((post) => (
            <Post key={post.id} title={post.title} text={post.text} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AddPostForm(props) {
  const { postTextRef } = props;
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        titleText: '',
        postText: '',
      }}
      validationSchema={Yup.object({
        titleText: Yup.string().trim().required(),
        postText: Yup.string().trim().required(),
      })}
      onSubmit={(values, { resetForm }) => {
        dispatch(addPost(values.titleText.trim(), values.postText.trim()));
        resetForm();
        autosize.update(postTextRef.current);
      }}
    >
      <Form>
        <div id="profile__page-post-text" className="wrapper">
          <Field name="titleText" type="text" placeholder="Заголовок" />
          <Field
            as="textarea"
            name="postText"
            innerRef={postTextRef}
            placeholder="Что у вас нового?"
          />
        </div>
        <div id="profile__page-button" className="wrapper">
          <button type="submit">Опубликовать</button>
        </div>
      </Form>
    </Formik>
  );
}

export default ProfilePage;
