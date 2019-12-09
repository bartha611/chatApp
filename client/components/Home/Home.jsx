import React from "react";
import "./home.css";
import { Container, Button } from "reactstrap";
import { useSelector } from 'react-redux';
import Proptypes from 'prop-types'

import Navigation from "../Navigation/navigation";

const Home = ({history}) => {
  const { authenticated } = useSelector(state => state.user);
  return (
    <div>
      <Navigation history={history} />
      <Container id="frontPage">
        <div id="frontPageInfo">
          <h3 id="homeTitle">Flack is where work might happen</h3>
          <p id="homeText">
            Flack is a communication website configured to organize information in
            a more digestible format.
          </p>
          {!authenticated && (
            <div id="getStarted">
              <h4>Get Started Today!</h4>
              <Button color="secondary" onClick={() => history.push('/signup')}>Sign-up</Button>
            </div>
          )}
          {authenticated && (
            <div id="createTeam">
              <h4>Create Team</h4>
              <Button color="secondary" onClick={() => history.push('/createteam')}>Create Team</Button>
            </div>
          )}
        </div>
        <div id="image" />
      </Container>
    </div>
  );
};

Home.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired
  }).isRequired
}

export default Home;
