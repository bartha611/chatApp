import React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import Navigation from "./Navigation";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Navigation />
      <div className="m-auto pt-10 my-4 w-4/5 md:w-2/5 mt-10">
        <h3 className="text-3xl font-bold">Flack is where work might happen</h3>
        <p className="text-xl text-gray-500 my-4">
          Flack is a communication website configured to organize information in
          a more digestible format.
        </p>
        {!user && (
          <div id="getStarted">
            <h4>Get Started Today!</h4>
            <Button color="secondary" onClick={() => history.push("/signup")}>
              Sign-up
            </Button>
          </div>
        )}
        {user && (
          <div>
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white"
              onClick={() => history.push("/createteam")}
            >
              Create Team
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
