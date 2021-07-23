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

  const id = useSelector((state) => state.auth.id);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const initialized = useSelector((state) => state.app.initialized);
  if (!initialized) {
    return <Preloader />;
  }

  return (
    <>
      {isAuth && <Menu />}
      <div style={{ padding: '8px' }}>
        {isAuth ? (
          <Switch>
            <Route exact path="/profile/:userId">
              <ProfileContainer />
            </Route>
            <Route exact path="/dialogs/:userId">
              <Dialogs />
            </Route>
            <Route exact path="/users/:page">
              <UsersContainer />
            </Route>
            <Redirect to={`/profile/${id}`} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect to="/login" />
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
