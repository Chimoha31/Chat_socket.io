import React, { useState } from "react";
import Header from './Header';
import "../styles/JoinForm.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const JoinForm = ({ socket, username, setUsername, room ,setRoom }) => {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", {username, room});
      navigate("/chatroom");
    }else if(username === "" || room === "") {
      setErrMsg("Fill in the blank is required")
    }
  };

  return (
    <div className="container_bg">
      <Header />
      <div className="joinform_container">
        <div className="form">
          <h3> Join A Chat !!</h3>
          <label>*User Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errMsg && !username ? <p>{errMsg}</p> : ""}
          <label>*Room Number</label>
          <input
            type="text"
            placeholder="Room number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          {errMsg && !room ? <p>{errMsg}</p> : ""}
          <Button onClick={handleJoinRoom} className="roomform_btn">
            Join A Room
          </Button>
        </div>

        <div className="form_gif">{/* {bg} */}</div>
      </div>
    </div>
  );
};

export default JoinForm;