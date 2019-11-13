import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";

const Reroute = () => {
  const { team } = useParams();
  const history = useHistory();
  const { username } = useSelector(state => state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "LOAD_CHANNEL",
      operation: "READ",
      data: { team, username },
      navigation: channels => `/${team}/${channels[0].shortid}`,
      history
    });
  }, []);
  return (
    <Spinner
      size="lg"
      style={{ margin: "0 auto", marginTop: "100px" }}
      color="dark"
    />
  );
};

export default Reroute;

