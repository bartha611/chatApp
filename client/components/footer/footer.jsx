import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment-timezone'
import TextArea from 'react-textarea-autosize'
import { Form } from 'reactstrap';
import PropTypes from 'prop-types'

const Footer = ({channel}) => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.user)
  const handleSubmit = () => {
    const zone = moment.tz.guess();
    dispatch({
      type: "LOAD_MESSAGE",
      operation: "CREATE",
      data: { input, channel, username, zone}
    })
    setInput("");
  }
  return (
    <div id="footer">
      <div id="formbox">
        <Form>
          <TextArea
            name="message"
            id="textbox"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
          />
        </Form>
        <button
          type="submit"
          id="button"
          className="btn btn-success"
          onClick={() => {
              handleSubmit();
            }}
        >
            Submit
        </button>
      </div>
    </div>
  )
}

Footer.propTypes = {
  channel: PropTypes.string.isRequired
}

export default Footer;