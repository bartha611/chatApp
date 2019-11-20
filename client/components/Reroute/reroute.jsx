import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from "react-router-dom";
import { Spinner } from "reactstrap";
import PropTypes from 'prop-types'




const Reroute = ({ history, match}) => {
  const {team} = match.params
  const { username } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "LOAD_CHANNEL",
      operation: "READ",
      data: { team, username },
      navigation: channels => {
        return {
          pathname: `/${team}/${channels[0].shortid}`,
          state: { description: channels[0].description, name: channels[0].name }
        };
      },
      redirect: '/',
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

Reroute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      team: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(Reroute);
