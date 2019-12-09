import { render } from "react-dom";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./reducers";
import PrivateRoute from "./configuration/router";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "./configuration/history";

// import Components

const Homepage = lazy(() => 
  import(/* webpackChunkName: "Homepage" */ "./components/Home/Home")
)

const Login = lazy(() =>
  import(/* webpackChunkName: "Login" */ "./components/Login/login")
);
const Signup = lazy(() =>
  import(/* webpackChunkName: "Signup" */ "./components/SignUp/signup")
);
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ "./components/Dashboard/dashboard")
);
const createTeam = lazy(() =>
  import(
    /* webpackChunkName: "CreateTeam" */ "./components/createTeam/createTeam"
  )
);
const Reroute = lazy(() =>
  import(/* webpackChunkName: "Reroute" */ "./components/Reroute/reroute")
);

function waitComponent(Component) {
  return props => (
    <Suspense fallback={<div>...Loading</div>}>
      <Component {...props} />
    </Suspense>
  );
}

export default function Home() {
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
              component={waitComponent(createTeam)}
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
}

render(<Home />, document.getElementById("app"));
