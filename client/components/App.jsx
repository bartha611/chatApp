import { hot } from "react-hot-loader/root";
import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../state/store";
import PrivateRoute from "../lib/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../lib/history";
import waitComponent from "../lib/WaitComponent";
import "../../styles/globals.css";

// import Components
const Homepage = lazy(() =>
  import(/* webpackChunkName: "Homepage" */ "../components/Home")
);

const Login = lazy(() =>
  import(/* webpackChunkName: "Login" */ "../components/Login")
);
const Signup = lazy(() =>
  import(/* webpackChunkName: "Signup" */ "../components/Signup")
);
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ "../components/Dashboard")
);
const CreateTeam = lazy(() =>
  import(/* webpackChunkName: "CreateTeam" */ "../components/CreateTeam")
);
const Reroute = lazy(() =>
  import(/* webpackChunkName: "Reroute" */ "../components/Reroute")
);

const Home = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              {waitComponent(Homepage)}
            </Route>
            <Route path="/login">{waitComponent(Login)}</Route>
            <Route path="/signup">{waitComponent(Signup)}</Route>
            <PrivateRoute
              path="/createteam"
              component={waitComponent(CreateTeam)}
            />
            <PrivateRoute
              exact
              path="/:team"
              component={waitComponent(Reroute)}
            />
            <PrivateRoute
              path="/:team/:channel"
              component={waitComponent(Dashboard)}
            />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default hot(Home);
