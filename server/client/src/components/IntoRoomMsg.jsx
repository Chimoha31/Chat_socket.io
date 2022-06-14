import React from 'react';
import '../styles/IntoRoomMsg.css';

const IntoRoomMsg = ({intoPerson}) => {
  return (
    <div className="into_container">
    <div className="into_person">{intoPerson} joined the room</div>
  </div>
  )
}

export default IntoRoomMsg