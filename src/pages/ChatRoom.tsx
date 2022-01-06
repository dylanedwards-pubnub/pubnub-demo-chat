import React, { useEffect, useState } from "react";
import RightMessage from "../components/RightMessage";
import LeftMessage from "../components/LeftMessage";
import { hasSubscribers } from "diagnostics_channel";
import subscribe from "../api/subscribe";
import publish from "../api/publish";
import IChatMessage from "../types/chatMessage";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";

type chatroomState = {
  username: string;
  chatroomName: string;
};

function ChatRoom() {
  const location = useLocation();
  const state = location.state as chatroomState;
  const [chatMessages, setChatMessages] = useState<Array<IChatMessage>>([]);
  const [messageToSend, setMessageToSend] = useState<string>("");

  console.log("state: ", state);

  const channelName = state.chatroomName;
  const userUuid = nanoid();
  const startingTimeToken = "0";

  useEffect(() => {
    subscribe(
      channelName,
      userUuid,
      startingTimeToken,
      setChatMessages,
      chatMessages
    );
    // return () => {
    //   cleanup
    // }
  }, []);

  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div className="chat">
        <div className="chat-header clearfix">5 people in chat</div>
        <div className="chat-history">
          <ul className="m-b-0">
            {chatMessages.map((msg) => {
              return <LeftMessage chatMessage={msg} key={nanoid()} />;
            })}
          </ul>
        </div>
        <div className="chat-message clearfix">
          <div className="input-group mb-0">
            <div className="input-group-prepend">
              <button
                className="input-group-text send-icon"
                onClick={(e) => {
                  e.preventDefault();
                  publish(channelName, userUuid, state.username, messageToSend);
                  setMessageToSend("");
                }}
              >
                <i className="fa fa-send"></i>
              </button>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter text here..."
              value={messageToSend}
              onChange={(e) => {
                setMessageToSend(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
