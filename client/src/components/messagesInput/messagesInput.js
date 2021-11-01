import React from "react";

import "./messagesInput.css";

const MessagesInput = ({ message, setMessage, sendMessage }) => (
  <div className="chat-form-container">
    <form id="chat-form">
      <input
        className="ms"
        type="text"
        placeholder="Type your message ..."
        required
        autoComplete="off"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="btn" onClick={(event) => sendMessage(event)}>
        {" "}
        Send
      </button>
    </form>
  </div>
);

export default MessagesInput;
