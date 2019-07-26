import React, { useState } from "react";
import Navigation from "../Navigation/navigation.jsx";
import { Input, Form, FormGroup, Button, Label, Container } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

function CreateTeam() {
  const [teamid, setTeamId] = useState(null);
  const handleChange = value => {
    setTeamId(value);
  };
  return ( 
    <div>
      {!teamid ? <Team handleChange = {handleChange} /> : <Redirect to = {{pathname: '/addTeamMember', state: {team: teamid}}} />}
    </div>
  );
}

function Team(props) {
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState(null);
  const [confirmTeam, setConfirmTeam] = useState(null);
  const handleSubmit = evt => {
    evt.preventDefault();
    axios
      .post("http://localhost:3000/team/create", {
        team: team,
        open: open
      })
      .then(response => {
        if (response.status === 200) {
          props.handleChange(response.data.id)
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navigation />
      <Container className="mt-5">
        <Form>
          <FormGroup>
            <Input
              type="text"
              id="team"
              placeholder="Enter Teamname"
              onChange={e => setTeam(e.target.value)}
              name="team"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              id="confirmTeam"
              placeholder="Confirm Teamname"
              onChange={e => setConfirmTeam(e.target.value)}
              name="confirmTeam"
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
            onClick={handleSubmit}
            disabled={confirmTeam !== team}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
} 

export default CreateTeam;
