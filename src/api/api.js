import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  headers: {
    'API-KEY': '23b3d666-fd7f-4029-818d-4b0521827c03',
  },
});

export const usersAPI = {
  getUsers: (pageNumber, pageSize = 5) =>
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
  getAuthUserData: () =>
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
