import { setAuthUserData } from './authReducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
  initialized: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return { ...state, initialized: true };
    default:
      return state;
  }
}

export function initializedSuccess() {
  return {
    type: INITIALIZED_SUCCESS,
  };
}

export const initializeApp = () => async (dispatch) => {
  await dispatch(setAuthUserData());
  dispatch(initializedSuccess());
};

export default appReducer;
