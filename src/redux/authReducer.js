import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
  id: 0,
  email: '',
  login: '',
  isAuth: false,
  captchaURL: '',
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        id: action.id,
        email: action.email,
        login: action.login,
        isAuth: action.isAuth,
      };
    case SET_CAPTCHA_URL:
      return { ...state, captchaURL: action.captchaURL };
    default:
      return state;
  }
}

export function setUserData(id, email, login, isAuth) {
  return {
    type: SET_USER_DATA,
    id,
    email,
    login,
    isAuth,
  };
}

export function setCaptchaURL(captchaURL) {
  return {
    type: SET_CAPTCHA_URL,
    captchaURL,
  };
}

export const requestAuthUserData = (setReady) => async (dispatch) => {
  const response = await authAPI.requestAuthUserData();
  if (response.resultCode === 0) {
    const { id, email, login } = response.data;
    dispatch(setUserData(id, email, login, true));
  }
  if (setReady) {
    setReady(true);
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaURL();
  dispatch(setCaptchaURL(response.url));
};

export const login =
  (email, password, rememberMe, captcha, setStatus) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
      dispatch(requestAuthUserData());
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      setStatus({ serverError: response.messages[0] });
    }
  };

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
    dispatch(setCaptchaURL(null));
  }
};

export default authReducer;
