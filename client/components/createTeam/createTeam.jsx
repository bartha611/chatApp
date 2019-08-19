import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Form, FormGroup, Button, Label, Container, Alert } from "reactstrap";
import Navigation from "../Navigation/navigation";
import teamAction from '../../actions/teamAction';


function createTeam(props) {
  const [team, setTeam] = useState("");
  const [open, setOpen] = useState(false);
  const response = useSelector(state => state.team);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(teamAction(team,open));
  }
  useEffect(() => {
    if(response.team) {
      props.history.push('/dashboard');
    }
  })
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
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </Form>
        {response.error && <Alert color="danger">Could not create team</Alert>}
      </Container>
    </div>
  );
}

export default createTeam;
