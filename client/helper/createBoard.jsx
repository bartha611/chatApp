import React from "react";
import moment from "moment";

const createBoard = ({ messages }) => {
  const boardHTMLObject = [];
  let messageBlock = [];
  let previousDate = "";
  let previousTime = "";
  let previousUser = "";
  let divider = "";
  for (let k = 0; k < messages.length; k++) {
    const { createdat, message, username } = messages[k];
    const [date, time, meridian] = createdat.split(" ");
    const messageTime = `${time} ${meridian}`.replace(/^0/, "");
    const messageDate = moment(date).format("MMMM DD, YYYY");

    if (k === 0) {
      messageBlock.push(<p className="message">{message}</p>);
      divider = (
        <h4>
          <span>{messageDate}</span>
        </h4>
      );
    } else if (
      messageTime === previousTime &&
      messageDate === previousDate &&
      username === previousUser
    ) {
      messageBlock.push(<p className="message">{message}</p>);
    } else {
      boardHTMLObject.push(
        <div className="messageBlock">
          {divider}
          <span className="user">{previousUser}</span>
          <span className="time">{previousTime}</span>
          {messageBlock}
        </div>
      );
      messageBlock = [<p className="message">{message}</p>];
      divider =
        messageDate !== previousDate ? (
          <h4>
            <span>{messageDate}</span>
          </h4>
        ) : (
          <hr />
        );
    }
    previousDate = messageDate;
    previousTime = messageTime;
    previousUser = username;
  }
  boardHTMLObject.push(
    <div className="messageBlock">
      {divider}
      <span className="user">{previousUser}</span>
      <span className="time">{previousTime}</span>
      {messageBlock}
    </div>
  )
  return boardHTMLObject
};

export default createBoard;
