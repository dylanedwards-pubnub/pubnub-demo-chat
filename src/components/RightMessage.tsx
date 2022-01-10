import React from "react";
import {messageData} from '../types/chatMessage'

interface IRightMessageProps {
  chatMessage: messageData;
}

const RightMessage = (props: IRightMessageProps) => {

  return (
    <li className="clearfix">
      <div className="message right-message right-message-text">
        <p id="right-message-text">{props.chatMessage.message}</p>
      </div>
    </li>
  );
};

export default RightMessage;
