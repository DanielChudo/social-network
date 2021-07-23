import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { Loader, NavBar } from './components';
import './App.css';
import { AuthPage, DialogsPage, ProfilePage, UsersPage } from './pages';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  const id = useSelector((state) => state.auth.id);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const initialized = useSelector((state) => state.app.initialized);
  if (!initialized) {
    return <Loader />;
  }

  return (
    <>
      {isAuth && <NavBar />}
      <div style={{ padding: '8px' }}>
        {isAuth ? (
          <Switch>
            <Route exact path="/profile/:userId">
              <ProfilePage />
            </Route>
            <Route exact path="/dialogs/:userId">
              <DialogsPage />
            </Route>
            <Route exact path="/users/:page">
              <UsersPage />
            </Route>
            <Redirect to={`/profile/${id}`} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/auth">
              <AuthPage />
            </Route>
            <Redirect to="/auth" />
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
