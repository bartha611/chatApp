import React from "react";
import ReactHtmlParser from "react-html-parser";

const createBoard = (messages) => {
  const boardHTMLObject = [];
  let messageBlock = [];
  let previousDate = "";
  let previousTime = "";
  let previousUser = "";
  let divider = "";

  for (let k = 0; k < messages.length; k++) {
    const { created_at: createdAt, message, username } = messages[k];
    const messageTime = new Date(createdAt)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/^0+/, "");
    const messageDate = new Date(createdAt)
      .toDateString()
      .split(" ")
      .slice(1, 4)
      .join(" ");

    if (k === 0) {
      messageBlock.push(<p className="message">{ReactHtmlParser(message)}</p>);
      divider = (
        <h4 className="border-b-2 text-center font-bold">
          <span>{messageDate}</span>
        </h4>
      );
    } else if (
      messageDate === previousDate &&
      messageTime === previousTime &&
      username === previousUser
    ) {
      messageBlock.push(<p className="message">{ReactHtmlParser(message)}</p>);
    } else {
      boardHTMLObject.push(
        <div className="py-2 mt-2 break-words">
          {divider}
          <span className="font-bold">{previousUser}</span>
          <span className="ml-2 text-gray-500 text-sm">{previousTime}</span>
          {messageBlock}
        </div>
      );
      messageBlock = [<p className="message">{ReactHtmlParser(message)}</p>];
      divider =
        messageDate !== previousDate ? (
          <h4 className="border-b-2 text-center font-bold">
            <span>{messageDate}</span>
          </h4>
        ) : (
          ""
        );
    }
    previousDate = messageDate;
    previousTime = messageTime;
    previousUser = username;
  }
  boardHTMLObject.push(
    <div className="py-2 mt-2 break-words">
      {divider}
      <span className="font-bold">{previousUser}</span>
      <span className="ml-2 text-sm text-gray-500">{previousTime}</span>
      {messageBlock}
    </div>
  );
  return boardHTMLObject;
};

export default createBoard;
