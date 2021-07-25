import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  headers: {
    'API-KEY': '5bbb3927-48d0-4456-8ba8-fc7442808642',
  },
});

export const usersAPI = {
  requestUsers: (pageNumber, pageSize = 5) =>
    instance
      .get(`/users?page=${pageNumber}&count=${pageSize}`)
      .then((response) => response.data),

  follow: (id) =>
    instance.post(`/follow/${id}`).then((response) => response.data),
  unfollow: (id) =>
    instance.delete(`/follow/${id}`).then((response) => response.data),
};

export const profileAPI = {
  getProfileData: (userId) =>
    instance.get(`/profile/${userId}`).then((response) => response.data),
  getStatus: (userId) =>
    instance.get(`/profile/status/${userId}`).then((response) => response.data),
  updateStatus: (status) =>
    instance
      .put('/profile/status', { status })
      .then((response) => response.data),
  uploadAvatar: (avatar, dispatch, setUploadAvatarPercent) => {
    const formData = new FormData();
    formData.append('image', avatar);
    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.min(
          Math.round((progressEvent.loaded * 100) / progressEvent.total),
          99
        );
        dispatch(setUploadAvatarPercent(percentCompleted));
      },
    };
    return instance.put('/profile/photo', formData, config).then((response) => {
      dispatch(setUploadAvatarPercent(0));
      return response.data;
    });
  },
};

export const authAPI = {
  requestAuthUserData: () =>
    instance.get('/auth/me').then((response) => response.data),
  login: (email, password, rememberMe, captcha) =>
    instance
      .post('/auth/login', { email, password, rememberMe, captcha })
      .then((response) => response.data),
  logout: () =>
    instance.delete('/auth/login').then((response) => response.data),
};

export const securityAPI = {
  getCaptchaURL: () =>
    instance.get('/security/get-captcha-url').then((response) => response.data),
};
