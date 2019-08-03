import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/navigation.jsx";
import { useFetch } from "./../Hooks";
import { Input, Form, FormGroup, Button, Label, Container } from "reactstrap";

function CreateTeam() {
  const [team, setTeam] = useState("");
  const [open, setOpen] = useState(false);
  const [response, sendData] = useFetch("/team/create", {
    team: team,
    open: open
  });
  useEffect(() => {
    if(response.status === 200) {
      
    }
  }, [response])
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
              <Input type="checkbox" onClick={() => setOpen(!open)} /> CHECK BOX
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
