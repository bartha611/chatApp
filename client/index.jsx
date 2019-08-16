import { render } from "react-dom";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// import Components
import Login from "./components/Login/login";
import Signup from "./components/SignUp/signup";
import Dashboard from "./components/Dashboard/dashboard";
import CreateTeam from "./components/createTeam/createTeam";
import AddTeamMembers from "./components/addTeamMember/addTeamMember";
import Navigation from "./components/Navigation/navigation";


const store = createStore(rootReducer, applyMiddleware(thunk));


export default function Home() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Navigation} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/createTeam" component={CreateTeam} />
          <Route path="/addTeamMember" component={AddTeamMembers} />
        </Switch>
      </Router>
    </Provider>
)
}

render(<Home />, document.getElementById("app"));
