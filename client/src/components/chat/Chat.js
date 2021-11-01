import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Header from "../header/header";
import MessagesInput from "../messagesInput/messagesInput";
import AllMessages from "../allMessages/allMessages";
import "./Chat.css";
import ReactEmoji from "react-emoji";

let ENDPOINT = "https://ibralivechat.herokuapp.com/";
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // get URL properties
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    //get socket server
    socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

    //emit data to the server
    socket.emit("Join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      // socket.off()
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="chat-container">
      <Header room={room} />
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3> Username:</h3>
          <h2 id="room-name">{name}</h2>
        </div>

        <AllMessages messages={messages} name={name} />
      </main>

      <MessagesInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
