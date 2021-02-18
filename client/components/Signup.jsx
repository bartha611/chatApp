import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Label, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import { fetchAuth } from "../state/ducks/auth";
import Navigation from "./Navigation";

function Signup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (confirmPassword === password && password !== "") {
      dispatch(
        fetchAuth(
          "/api/user/register",
          "POST",
          "SIGNUP",
          {
            email,
            password,
          },
          history
        )
      );
    }
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  });

  return (
    <div>
      <Navigation />
      <div className="w-96 mt-20 ml-auto mr-auto shadow-lg p-4">
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <h2 className="text-center my-0 text-2xl font-bold">Sign-Up</h2>
        <Form>
          <FormGroup>
            <Label for="email" className="font-bold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password" className="font-bold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword" className="font-bold">
              Confirm Password
            </Label>
            <Input
              id="confirm"
              type="password"
              placeholder="********"
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />
          </FormGroup>
          <Button
            className="signup__button"
            id="submit"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </Form>
        {error && <Alert color="danger">User already exists</Alert>}
        <div className="text-center mt-4 text-sm">
          <span>Already a member? </span>
          <a href="/login">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Login
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
