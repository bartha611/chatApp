import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import "./login.css";
import { Form, FormGroup, Input, Label, Button, Alert} from "reactstrap";
import { fetchUser } from "../../actions/userAction"
// import { fetchTeams } from '../../actions/teamAction'
import Navigation from "../Navigation/navigation";


function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.user);
  const team = useSelector(state => state.team);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await dispatch(fetchUser(username,password));
    // await dispatch(fetchTeams(username));
  };
  useEffect(() => {
    const handleEnter = e =>{
      if(e.keyCode === 13) {
        handleSubmit();
      }
    }
    window.addEventListener('keydown', handleEnter)
    return () => window.removeEventListener('keydown', handleEnter);
  })
  useEffect(() => {
    if(user.authenticated) {
      console.log(team);
      props.history.push('/dashboard')
    }
  }, [user]);
  return (
    <div className="Login">
      <Navigation />
      <div className="login-form mt-5">
        <h2 className="mb-5 text-center">Login</h2>
        <Form method="post">
          <FormGroup>
            <Label>Username</Label>
            <Input
              id="username"
              data-value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Enter Password"
              name="username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="********"
              name="password"
            />
          </FormGroup>
          <Button
            id="submit"
            className="mt-4"
            onKeyDown={e => {
              if (e.keyCode === 13) {
                handleSubmit();
              }
            }}
            tabIndex="0"
            color="secondary"
            size="lg"
            block
            onClick={() => {handleSubmit()}}
          >
            Submit
          </Button>
        </Form>
        {user.error && <Alert className="mt-3" color="danger">Username or Password invalid</Alert>}
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}
export default withRouter(Login);
