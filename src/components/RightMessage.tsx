import React from "react";
import IChatMessage from "../types/chatMessage";

interface IRightMessageProps {
  chatMessage: IChatMessage;
}

const RightMessage = (props: IRightMessageProps) => {

  return (
    <li className="clearfix">
      <div className="message right-message right-message-text">
        <p id="right-message-text">{props.chatMessage.m[0].d.message}</p>
      </div>
    </li>
  );
};

export default RightMessage;
