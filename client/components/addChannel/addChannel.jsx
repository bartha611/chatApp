import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';



const AddChannel = () => {
  const [channel, setChannel] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (channel) {
      const response = await Axios.post("http://localhost:3000/channel/create")
    }
  }
  return (
    <div id="">
      <h2><b>Create Channel</b></h2>
      <form>
        <div className="form-group">
          <label>Channel</label>
          <input type="text" className="form-control" placeholder="Channel" onChange={(e) => setChannel(e)} />
        </div>
      </form>
      <button onClick={handleSubmit()} className="btn btn-primary" type="submit">Submit</button>
    </div>
  )
}

export default AddChannel;