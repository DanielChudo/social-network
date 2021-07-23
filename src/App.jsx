import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Menu from './components/Menu/Menu';
import ProfileContainer from './components/Profile/ProfileContainer';
import Dialogs from './components/Dialogs/Dialogs';
import UsersContainer from './components/Users/UsersContainer';
import Preloader from './components/Preloader/Preloader';
import Login from './components/Login/Login';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  const initialized = useSelector((state) => state.app.initialized);
  if (!initialized) {
    return <Preloader />;
  }

  return (
    <>
      <Menu />
      <div style={{ padding: '8px' }}>
        <Switch>
          <Route path="/profile/:userId?">
            <ProfileContainer />
          </Route>
          <Route path="/dialogs">
            <Dialogs />
          </Route>
          <Route path="/users/:page">
            <UsersContainer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />;
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
