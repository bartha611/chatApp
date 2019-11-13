import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./dashboard.css";
import PropTypes from "prop-types";

import Sidebar from "../Sidebar/sidebar";
import MessageBoard from "../Message/message";

const AddTeamMembers = lazy(() =>
  import(
    /* webpackChunkName: "AddTeamMembers" */ "../addTeamMember/addTeamMember"
  )
);
const AddChannel = lazy(() =>
  import(/* webpackChunkName: "AddChannel" */ "../addChannel/addChannel")
);

function Dashboard() {
  const [addChannel, setAddChannel] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { team, channel } = useParams();
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
          <MessageBoard channel={channel} />
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
      teamName: PropTypes.string.isRequired,
      channelName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Dashboard;
