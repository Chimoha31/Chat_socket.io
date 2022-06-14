import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import "../styles/Chat.css";
import IntoRoomMsg from "./IntoRoomMsg";
import LeftRoomMsg from "./LeftRoomMsg";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [intoPerson, setIntoPerson] = useState("");
  const [isIntoRoom, setIsIntoRoom] = useState(false);
  const [leftPerson, setLeftPerson] = useState("");
  const [isLeftRoom, setIsLeftRoom] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        username: username,
        room: room,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleLeave = async () => {
    navigate("/joinroom");
    const userData = {
      username: username,
      room: room,
    };

    await socket.emit("disconnect_room", userData);
    console.log(userData);
  };

  useEffect(() => {
    socket.on("into_room", (data) => {
      setIsIntoRoom(true);
      setIntoPerson(data.username);
    });

    return () => socket.off("into_room");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("left_chat", (data) => {
      setIsLeftRoom(true);
      console.log(data.username);
      setLeftPerson(data.username);
    });
    return () => socket.off("left_chat");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
    return () => socket.off("receive_message");
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
          <div>
            <p className="leave" onClick={handleLeave}>
              Leave 👋🏻
            </p>
          </div>
        </div>

        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {isIntoRoom && <IntoRoomMsg intoPerson={intoPerson} />}

            {messageList.map((message, index) => (
              <div
                key={index}
                className="message"
                id={username === message.username ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                  <div className="message-meta">
                    <p>{message.time}</p>
                    <p id="author">{message.username}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLeftRoom && <LeftRoomMsg leftPerson={leftPerson} />}
          </ScrollToBottom>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="message"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && handleSendMessage();
            }}
          />
          <button onClick={handleSendMessage}>&#9658;</button>
        </div>
      </div>
        </div>
    </Fragment>
  );
};

export default Chat;