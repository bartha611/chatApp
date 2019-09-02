import { render } from "react-dom";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './reducers';
import {PrivateUserRoute} from './configuration/router';

// import Components
import Login from "./components/Login/login";
import Signup from "./components/SignUp/signup";
import Dashboard from "./components/Dashboard/dashboard";
import createTeam from "./components/createTeam/createTeam";
import AddTeamMembers from "./components/addTeamMember/addTeamMember";
import Navigation from "./components/Navigation/navigation";

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={Navigation} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <PrivateUserRoute path="/createTeam" component={createTeam} />
            <PrivateUserRoute path="/addTeamMember" component={AddTeamMembers} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}

render(<Home />, document.getElementById("app"));
