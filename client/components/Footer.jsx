import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Form } from "reactstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../state/ducks/messages";

const Footer = ({ messageEnd, channel }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [isBold, setIsBold] = useState(false);
  const [isItalics, setIsItalics] = useState(false);
  const [isStrikeThrough, setIsStrikeThrough] = useState(false);

  const handleSubmit = async () => {
    const element = document.getElementById("input");
    if (element.innerHTML !== "") {
      await dispatch(
        fetchMessages(`/api/channels/${channel}/messages`, "POST", "CREATE", {
          message: element.innerHTML,
        })
      );
      element.innerHTML = "";
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const keydownHandler = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const keyupHandler = () => {
    setIsBold(document.queryCommandState("bold"));
    setIsItalics(document.queryCommandState("italic"));
    setIsStrikeThrough(document.queryCommandState("strikeThrough"));
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [channel]);

  return (
    <div className="mb-2 mr-4 border-2 border-gray-600 rounded-md h-auto">
      <Form className="w-full pr-6 rounded-md pl-3 relative py-1">
        <div
          contentEditable="true"
          id="input"
          ref={inputRef}
          className="outline-none break-words w-full"
        />
      </Form>
      <div
        className="bg-gray-100 flex p-1 h-7 box-content"
        onMouseDown={(e) => e.preventDefault()}
      >
        <button
          type="button"
          className={`hover:bg-gray-300 ${
            isBold ? `bg-gray-300` : ``
          } w-7 font-bold font-serif cursor-pointer flex items-center justify-center`}
          onClick={() => {
            setIsBold(!isBold);
            document.execCommand("bold", false, null);
          }}
        >
          B
        </button>
        <button
          type="button"
          className={`hover:bg-gray-300 ${
            document.queryCommandState("italic") ? `bg-gray-300` : ``
          } w-7 italic cursor-pointer flex items-center justify-center`}
          onClick={() => {
            setIsItalics(!isItalics);
            document.execCommand("italic", false, null);
          }}
        >
          I
        </button>
        <button
          type="button"
          className={`hover:bg-gray-300 ${
            isStrikeThrough ? `bg-gray-300` : ``
          } w-7 line-through cursor-pointer flex items-center justify-center`}
          onClick={() => {
            setIsStrikeThrough(!isStrikeThrough);
            document.execCommand("strikeThrough", false, null);
          }}
        >
          S
        </button>
        <div className="ml-auto bg-green-600 flex justify-center items-center">
          <button
            type="submit"
            className="focus:outline-none hover:bg-green-700 w-7"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faPlay} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  channel: PropTypes.string.isRequired,
  messageEnd: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};

export default Footer;
