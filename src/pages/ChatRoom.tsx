import React, { useEffect, useState } from "react";
import RightMessage from "../components/RightMessage";
import LeftMessage from "../components/LeftMessage";
import { hasSubscribers } from "diagnostics_channel";
import subscribe from "../api/subscribe";
import publish from "../api/publish";
import hereNow from "../api/hereNow";
import subscribePresense from "../api/subscribePresense";
import { IChatMessage, messageData } from "../types/chatMessage";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";
import getChatHistory from "../api/getChatHistory";

type chatroomState = {
  username: string;
  chatroomName: string;
  userUuid: string;
};

function ChatRoom() {
  const location = useLocation();
  const state = location.state as chatroomState;
  const [chatMessages, setChatMessages] = useState<Array<messageData>>([]);
  const [messageToSend, setMessageToSend] = useState<string>("");
  const [numberUsersInChat, setNumberUsersInChat] = useState<number>(0);
  const channelName = state.chatroomName;
  const startingTimeToken = "0";

  useEffect(() => {
    getChatHistory(channelName, state.userUuid, setChatMessages);
    
    hereNow(channelName, state.userUuid, setNumberUsersInChat);

    subscribe(
      channelName,
      state.userUuid,
      startingTimeToken,
      setChatMessages,
      chatMessages,
      null
    );

    subscribePresense(
      channelName,
      state.userUuid,
      startingTimeToken,
      setNumberUsersInChat,
      null
    );
  }, []);

  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div className="chat">
        <div className="chat-header clearfix">
          {numberUsersInChat} people in chat
        </div>
        <div className="chat-history">
          <ul className="m-b-0">
            {chatMessages.map((msg) => {
              return msg.senderUuid === state.userUuid ? (
                <RightMessage chatMessage={msg} key={nanoid()} />
              ) : (
                <LeftMessage chatMessage={msg} key={nanoid()} />
              );
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
                  publish(
                    channelName,
                    state.userUuid,
                    state.username,
                    messageToSend
                  );
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
