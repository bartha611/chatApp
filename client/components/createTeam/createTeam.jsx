import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Form,
  FormGroup,
  Button,
  Label,
  Container,
  Alert
} from "reactstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Navigation from "../Navigation/navigation";
import "./createTeam.css";

function createTeam({ history }) {
  const [team, setTeam] = useState("");
  const [open, setOpen] = useState(false);
  const response = useSelector(state => state.team);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (team !== "") {
      dispatch({
        type: "LOAD_TEAM",
        operation: "CREATE",
        data: { team, open },
        navigation: ({ shortid }) => `/${shortid}`,
        history
      });
    }
  };
  return (
    <div>
      <Navigation />
      <Container className="mt-5">
        <div id="createTeam">
          <Form method="post">
            <h4 id="teamTitle">Create Team</h4>
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
                CHECK BOX IF CHANNEL IS CLOSED TO SELECT EMAILS
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
        </div>
        {response.error && <Alert color="danger">Could not create Team</Alert>}
      </Container>
    </div>
  );
}

createTeam.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(createTeam);
