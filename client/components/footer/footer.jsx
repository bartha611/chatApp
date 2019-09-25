import React from 'react';
import TextArea from 'react-textarea-autosize'
import { Form } from 'reactstrap';
import PropTypes from 'prop-types'

const Footer = ({handleSubmit, setInput, input}) => {
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
  handleSubmit: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired
}

export default Footer;