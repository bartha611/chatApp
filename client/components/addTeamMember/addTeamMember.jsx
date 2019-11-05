import React, { useState } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { Input, Form, FormGroup, Button, Container, Alert } from "reactstrap";

export default function AddTeamMembers() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const member = useSelector(state => state.member);
  const sendData = () => {
    // TODO
    
  }
  return (
    <div>
      <Container>
        <Form method="post">
          <FormGroup>
            <Input
              id="email1"
              type="text"
              placeholder="username"
              onChange={event => setUsername(event.target.value)}
              name="email1"
            />
          </FormGroup>
          <Button
            onClick={() => {
              sendData();
            }}
          >
            Submit
          </Button>
        </Form>
      </Container>

    </div>
  );
}
