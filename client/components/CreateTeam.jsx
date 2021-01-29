import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "react-helmet";
import {
  Input,
  Form,
  FormGroup,
  Button,
  Label,
  Container,
  Alert,
} from "reactstrap";
import { fetchTeams } from "../state/ducks/teams";
import Navigation from "./Navigation";

function createTeam() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { error } = useSelector((state) => state.teams);

  const handleSubmit = () => {
    if (name !== "") {
      dispatch(fetchTeams(`/api/teams`, "POST", "CREATE", { name }, history));
    }
  };

  return (
    <div>
      <Navigation />
      <Container className="mt-20">
        <Helmet>
          <title>CreateTeam</title>
        </Helmet>
        <div className="w-96 py-5 px-7 box shadow-md m-auto">
          <Form method="post">
            <h2 className="text-center font-serif font-bold text-2xl">
              Create Team
            </h2>
            <FormGroup>
              <Label className="font-bold">Team name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter Team name"
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </FormGroup>
            <Button block className="mt-3 w-20" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
        {error && <Alert color="danger">Could not create Team</Alert>}
      </Container>
    </div>
  );
}

export default createTeam;
