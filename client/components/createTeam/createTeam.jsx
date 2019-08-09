import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input, Form, FormGroup, Button, Label, Container, Alert } from "reactstrap";
import Navigation from "../Navigation/navigation";
import { useFetch } from "../Hooks";


function CreateTeam() {
  const [team, setTeam] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [response, sendData] = useFetch("/team/create", {
    team,
    open
  });
  useEffect(() => {
    if (response.status === 200) {
      console.log("hello")
    }
  }, [response]);
  return (
    <div>
      <Navigation />
      <Container className="mt-5">
        <Form method="post">
          <FormGroup>
            <Input
              type="text"
              id="team"
              placeholder="Enter Teamname"
              onChange={e => setTeam(e.target.value)}
              name="team"
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" onClick={() => setOpen(!open)} />
              {' '}
CHECK BOX
              IF CHANNEL IS CLOSED TO SELECT EMAILS
            </Label>
          </FormGroup>
          <Button
            block
            className="mt-3"
            id="submit"
            onClick={() => {
              sendData();
            }}
          >
            Submit
          </Button>
        </Form>
        {response.error && <Alert color="danger">{response.error}</Alert>}
      </Container>
    </div>
  );
}

export default CreateTeam;
