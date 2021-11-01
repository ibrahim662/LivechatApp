import React, { ReactDOM } from "react";

import "./message.css";

import ReactEmoji from "react-emoji";

const OMessage = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="chat-messages">
      <div className="message">
        <p className="meta">{user}</p>
        <p className="text">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="chat-messages">
      <div className="message">
        <p className="meta-reciever">{user}</p>
        <p className="text">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
};

export default OMessage;
