import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import {
  Alert
} from 'reactstrap'

import { addChannel } from '../../actions/channelAction'

import './addchannel.css'



const AddChannel = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const channelState = useSelector(state => state.channel);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    await dispatch(addChannel(name, props.team, description))
    if (!channelState.error) {
      props.history.push('/dashboard');
    }
  }
  useEffect(() => {
    const handleEnter = (e) => {
      if(e.keyCode === 13) {
        console.log("hello there")
        e.preventDefault();
        handleSubmit()
      }
    }
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  })
  return (
    <div className="col-md-10 mt-5">
      <div id="icon" onClick={() => props.setChannel(false)}>
        <i className="fa fa-window-close fa-2x" />
      </div>
      <div id="addchannel" className="col-md-6">
        <h2><b>Create Channel</b></h2>
        <form>
          <div className="form-group">
            <label className="labels">Channel</label>
            <input type="text" className="form-control" placeholder="Channel" onChange={(e) => setName(e)} />
          </div>
          <div className="form-group">
            <label className="labels">Description</label>
            <input type="text" className="form-control" placeholder="optional description" onChange={(e) => setDescription(e)} />
          </div>
        </form>
        <button onClick={() => {handleSubmit()}} className="btn btn-primary" type="submit">Submit</button>
        {channelState.error && (
        <Alert className="mt-4" color="danger">Error in creating channel</Alert>
      )}
      </div>
    </div>
  )
}

AddChannel.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  team: PropTypes.string.isRequired,
  setChannel: PropTypes.func.isRequired
}

export default withRouter(AddChannel);