import { usersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsers: 0,
  isFetching: false,
  followingInProgress: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_USERS:
      // зачаток ленты друзей, а не постраничной навигации
      // stateCopy.users = [...state.users, ...action.users];
      return { ...state, users: action.users };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsers: action.totalUsers };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.followingInProgress
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
}

export function followSuccess(userId) {
  return {
    type: FOLLOW,
    userId,
  };
}

export function unfollowSuccess(userId) {
  return {
    type: UNFOLLOW,
    userId,
  };
}

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function setTotalUsersCount(totalUsers) {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalUsers,
  };
}

export function toggleIsFetching(isFetching) {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
}

export function toggleFollowingInProgress(followingInProgress, userId) {
  return {
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    followingInProgress,
    userId,
  };
}

export const requestUsers =
  (pageNumber, pageSize, totalUsers) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const response = await usersAPI.requestUsers(pageNumber, pageSize);
    dispatch(setUsers(response.items));
    if (totalUsers === 0) {
      dispatch(setTotalUsersCount(response.totalCount));
    }
    dispatch(toggleIsFetching(false));
  };

export const follow = (id) => async (dispatch) => {
  dispatch(toggleFollowingInProgress(true, id));
  const response = await usersAPI.follow(id);
  if (response.resultCode === 0) {
    dispatch(followSuccess(id));
  }
  dispatch(toggleFollowingInProgress(false, id));
};

export const unfollow = (id) => async (dispatch) => {
  dispatch(toggleFollowingInProgress(true, id));
  const response = await usersAPI.unfollow(id);
  if (response.resultCode === 0) {
    dispatch(unfollowSuccess(id));
  }
  dispatch(toggleFollowingInProgress(false, id));
};

export default userReducer;
