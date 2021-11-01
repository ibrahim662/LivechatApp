import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./allMessages.css";
import OMessage from "../message/message";

const AllMessages = ({ messages, name }) => (
  <ScrollToBottom>
    {messages.map((message, i) => (
      <div key={i}>
        <OMessage message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default AllMessages;
