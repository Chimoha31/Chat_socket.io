import React from "react";
import "../styles/LeftRoomMsg.css";

const leftRoomMsg = ({leftPerson}) => {
  return (
    <div className="left_container">
      <div className="left_person">{leftPerson} has left the room</div>
    </div>
  );
};

export default leftRoomMsg;