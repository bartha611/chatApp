import { render } from "react-dom";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./reducers";
import PrivateRoute from "./configuration/router";
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';


// import Components
import Login from "./components/Login/login";
import Signup from "./components/SignUp/signup";
import Dashboard from "./components/Dashboard/dashboard";
import createTeam from "./components/createTeam/createTeam";
import AddTeamMembers from "./components/addTeamMember/addTeamMember";
import Navigation from "./components/Navigation/navigation";
import MessageBoard from "./components/Message/message";
import Reroute from "./components/Reroute/reroute";

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Navigation} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/message" component={MessageBoard} />
            <PrivateRoute path="/createTeam" component={createTeam} />
            <PrivateRoute path="/addTeamMember" component={AddTeamMembers} />
            <PrivateRoute exact path="/:teamName" component={Reroute} />
            <PrivateRoute path="/:teamName/:channelName" component={Dashboard} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

render(<Home />, document.getElementById("app"));
