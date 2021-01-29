import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useDispatch } from "react-redux";
import { fetchChannels } from "../state/ducks/channels";

const Reroute = () => {
  const history = useHistory();
  const { team } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels(`/api/teams/${team}`, "GET", "READ", null, history));
  }, [team]);

  return (
    <div>
      <Spinner className="ml-auto mr-auto mt-10" size="lg" />
    </div>
  );
};

export default Reroute;
