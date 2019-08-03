import React, { useState } from "react";
import axios from "axios";
import useFetch from "./../Hooks.js";
import { Input, Form, FormGroup, Button, Alert, Container } from "reactstrap";

export default function AddTeamMembers() {
  const [email, setEmail] = useState("");
  const [response,sendData] = useFetch('/userTeam/create', email)
  return (
    <div>
      <Container>
        <Form method="post">
          <FormGroup>
            <Input
              id="email1"
              type="email"
              placeholder="example@gmail.com"
              onChange={event => setEmail(event.target.value)}
              name="email1"
            />
          </FormGroup>
          <Button onClick = {() => {sendData()}}>
            Submit
          </Button>
        </Form>
        {response.error && <Alert color = "danger">{response.error}</Alert>}
      </Container>
    </div>
  );
}
