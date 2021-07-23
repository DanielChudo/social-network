import React, { useEffect, useRef } from 'react';
import autosize from 'autosize';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Post from './Post/Post';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import UploadAvatarButton from './UploadAvatarButton/UploadAvatarButton';
import defaultAvatar from '../../images/defaultAvatar.png';
import './Profile.css';

function Profile(props) {
  const postTextRef = useRef(null);
  useEffect(() => {
    autosize(postTextRef.current);
  }, []);

  const addPost = (values, { resetForm }) => {
    props.addPost(values.titleText.trim(), values.postText.trim());
    resetForm();
    autosize.update(postTextRef.current);
  };

  let { posts } = props;
  posts = posts.map((post) => (
    <Post key={post.id} title={post.title} text={post.text} />
  ));

  const { profile, status, updateStatus, isOwner, uploadAvatar } = props;
  return (
    <div id="profile">
      <div id="avatar">
        <img src={profile.photos.large || defaultAvatar} alt="user avatar" />
        {isOwner && <UploadAvatarButton uploadAvatar={uploadAvatar} />}
      </div>
      <div id="profile__page">
        <div id="profile__page-bio">
          <p style={{ fontSize: '20pt' }}>{profile.fullName}</p>
          <ProfileStatus
            status={status}
            updateStatus={updateStatus}
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
        <AddPostForm postTextRef={postTextRef} addPost={addPost} />
        <div id="posts">{posts}</div>
      </div>
    </div>
  );
}

function AddPostForm(props) {
  const { postTextRef, addPost } = props;

  const initialValues = {
    titleText: '',
    postText: '',
  };
  const validationSchema = Yup.object({
    titleText: Yup.string().trim().required(),
    postText: Yup.string().trim().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={addPost}
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

export default Profile;
