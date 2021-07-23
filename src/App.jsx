import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, NavBar } from './components';
import './App.css';
import { AuthPage, DialogsPage, ProfilePage, UsersPage } from './pages';
import { requestAuthUserData } from './redux/authReducer';

function App() {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(requestAuthUserData(setReady));
  }, [dispatch]);

  const id = useSelector((state) => state.auth.id);
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!ready) {
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
