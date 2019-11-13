import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Form, FormGroup, Button, Container, Alert } from "reactstrap";
import Proptypes from "prop-types";

const AddTeamMembers = ({ history, team, setMember, channel }) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const member = useSelector(state => state.member);
  const sendData = () => {
    dispatch({
      type: "LOAD_MEMBER",
      operation: "CREATE",
      data: { username, team },
      navigation: () => {
        setMember(false);
        return `/${team}/${channel}`;
      },
      history
    });
  };
  return (
    <div>
      <Container>
        <Button
          style={{ marginLeft: "0 auto" }}
          close
          aria-label="Cancel"
          onClick={() => setMember(false)}
        />
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
        {member.error && <Alert color="danger">Member does not exist</Alert>}
      </Container>
    </div>
  );
};

AddTeamMembers.propTypes = {
  team: Proptypes.string.isRequired,
  setMember: Proptypes.func.isRequired,
  channel: Proptypes.string.isRequired,
  history: Proptypes.func.isRequired
};

export default AddTeamMembers;
