import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/ReusableComponents/Navigation";
import Tasks from "./components/02-DailyTasks";
import Goals from "./components/03-Goals";
import Planner from "./components/01-Planner";
import SplashPage from "./components/00-SplashPage";
import WeeklyReview from "./components/04-WeeklyReview";
import Journal from "./components/05-Journal";

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
                  <Planner />
                </Route>
                <Route path="/tasks">
                  <Tasks />
                </Route>
                <Route path="/goals">
                  <Goals />
                </Route>
                <Route path="/reflections">
                  <WeeklyReview />
                </Route>
                <Route path="/journal">
                  <Journal />
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
