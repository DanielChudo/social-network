import { profileAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const SET_PROFILE_DATA = 'SET_PROFILE_DATA';
const SET_STATUS = 'SET_STATUS';
const SET_AVATAR = 'SET_AVATAR';
const SET_UPLOAD_AVATAR_PERCENT = 'SET_UPLOAD_AVATAR_PERCENT';

const initialState = {
  posts: [
    {
      id: 0,
      title: 'Это заголовок поста!',
      text: 'Если вы сейчас находитесь в своем профиле, то можете попробовать добавить новый пост через форму.',
    },
  ],
  profile: null,
  status: '',
  uploadAvatarPercent: 0,
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length,
        title: action.titleText,
        text: action.postText,
      };
      return { ...state, posts: [...state.posts, newPost] };
    case SET_PROFILE_DATA:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_AVATAR:
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    case SET_UPLOAD_AVATAR_PERCENT:
      return { ...state, uploadAvatarPercent: action.uploadAvatarPercent };
    default:
      return state;
  }
}

export function addPost(titleText, postText) {
  return {
    type: ADD_POST,
    titleText,
    postText,
  };
}

export function setProfileData(profile) {
  return {
    type: SET_PROFILE_DATA,
    profile,
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    status,
  };
}

export function setAvatar(photos) {
  return {
    type: SET_AVATAR,
    photos,
  };
}

export function setUploadAvatarPercent(uploadAvatarPercent) {
  return {
    type: SET_UPLOAD_AVATAR_PERCENT,
    uploadAvatarPercent,
  };
}

export const getProfileData = (userId) => async (dispatch) => {
  const response = await profileAPI.getProfileData(userId);
  dispatch(setProfileData(response));
  document.title = response.fullName;
};

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response));
};

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const uploadAvatar = (avatar) => async (dispatch) => {
  const response = await profileAPI.uploadAvatar(
    avatar,
    dispatch,
    setUploadAvatarPercent
  );
  if (response.resultCode === 0) {
    dispatch(setAvatar(response.data.photos));
  }
};

export default profileReducer;
