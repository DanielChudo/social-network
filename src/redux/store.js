import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import profileReducer from './profileReducer';
import dialogReducer from './dialogReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import appReducer from './appReducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
