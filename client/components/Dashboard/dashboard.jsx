import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import "./dashboard.css";
import PropTypes from "prop-types";

import Sidebar from "../Sidebar/sidebar";
import BoardNavigation from '../BoardNavigation/boardNavigation';
import Chat from '../Chat/Chat'
import Footer from '../footer/footer'

const AddTeamMembers = lazy(() =>
  import(
    /* webpackChunkName: "AddTeamMembers" */ "../addTeamMember/addTeamMember"
  )
);
const AddChannel = lazy(() =>
  import(/* webpackChunkName: "AddChannel" */ "../addChannel/addChannel")
);

function Dashboard({ history, match }) {
  const [addChannel, setAddChannel] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const dispatch = useDispatch();
  // const { description, name } = location.state;
  const { team, channel } = match.params
  const { username } = useSelector(state => state.user);
  useEffect(() => {
    dispatch({
      type: "LOAD_INFO",
      data: { username, team, channel },
      history
    });
    dispatch({ type: "STORE_JOIN", event: "join", channel });
  }, [team, channel]);
  return (
    <div>
      {!addChannel && !addMember && (
        <div id="board">
          <Sidebar
            setChannel={setAddChannel}
            setMember={setAddMember}
            team={team}
            history={history}
          />
          <div id="messageBox">
            <BoardNavigation />
            <Chat />
            <Footer channel={channel} />
          </div>
        </div>
      )}
      {addMember && (
        <Suspense fallback={<div>...Loading</div>}>
          <AddTeamMembers
            setMember={setAddMember}
            team={team}
            channel={channel}
            history={history}
          />
        </Suspense>
      )}
      {addChannel && (
        <Suspense fallback={<div>...Loading</div>}>
          <AddChannel setChannel={setAddChannel} team={team} />
        </Suspense>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      team: PropTypes.string.isRequired,
      channel: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default withRouter(Dashboard);
