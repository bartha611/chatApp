import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import './addchannel.css'



const AddChannel = ({ addChannel, setAddChannel}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (name) {
      const response = await Axios.post("http://localhost:3000/channel/create", {
        name
      })
      if (response.status === 200) {
        dispatch()
      }
    }
  }
  return (
    <div id="addchannel" className="col-md-6">
      <h2><b>Create Channel</b></h2>
      <form>
        <div className="form-group">
          <label>Channel</label>
          <input type="text" className="form-control" placeholder="Channel" onChange={(e) => setName(e)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" className="form-control" placeholder="optional description" onChange={(e) => setDescription(e)} />
        </div>
      </form>
      <button onClick={() => {handleSubmit()}} className="btn btn-primary" type="submit">Submit</button>
    </div>
  )
}

export default AddChannel;