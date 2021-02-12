import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import { fetchAuth } from "../state/ducks/auth";
import Navigation from "./Navigation";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(
      fetchAuth(
        "/api/user/login",
        "POST",
        "LOGIN",
        { email, password },
        history
      )
    );
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.keyCode === 13) {
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  });

  return (
    <div>
      <Navigation />
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="w-96 ml-auto mr-auto mt-20 shadow-lg p-4">
          <h2 className="text-center font-serif font-bold text-2xl">Login</h2>
          <Form method="post">
            <FormGroup>
              <Label className="font-bold">Email</Label>
              <Input
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter Email"
                name="email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className="font-bold">
                Password
              </Label>
              <Input
                id="password"
                onChange={(e) => {
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
              size="lg"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
          {error && (
            <Alert className="my-3" color="danger">
              Email or Password invalid
            </Alert>
          )}
          <div className="mt-4 text-sm text-center">
            <span>Not a member? </span>
            <a href="/signup">
              <span className="text-blue-500 hover:underline cursor-pointer">
                Signup here
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
