import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Reflections from "./components/Reflections";
import Tasks from "./components/Tasks";
import Goals from "./components/Goals";
import HomePage from "./components/HomePage";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {!currentUser && <SplashPage />}
      {currentUser && currentUser.id && (
        <>
          <Navigation isLoaded={isLoaded} />
          <div className="body-container-nav-right">
            {isLoaded && (
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/login">
                  <LoginFormPage />
                </Route>
                <Route path="/signup">
                  <SignupFormPage />
                </Route>
                <Route path="/tasks">
                  <Tasks />
                </Route>
                <Route path="/goals">
                  <Goals />
                </Route>
                <Route path="/reflections">
                  <Reflections />
                </Route>
              </Switch>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
