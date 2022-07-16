import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";
import JoinForm from "./components/JoinForm";
import io from "socket.io-client";

const socket = io.connect("https://chat-application001.herokuapp.com/");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joinroom" element={<JoinForm socket={socket} username={username} setUsername={setUsername} room={room} setRoom={setRoom} />} />
          <Route path="/chatroom" element={<Chat socket={socket} username={username} room={room} />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;