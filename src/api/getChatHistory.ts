import axios from "axios";
import { StringMappingType } from "typescript";
import {
  historicalMessage,
  IChatMessage,
  messageData,
} from "../types/chatMessage";

type historyPayload = [Array<historicalMessage>, number, number];

const getChatHistory = (
  channelName: string,
  askerUuid: string,
  setChatMessages: React.Dispatch<React.SetStateAction<messageData[]>>
  // chatMessages: Array<messageData>
) => {
  const subKey = process.env.REACT_APP_SUB_KEY;
  const url = `https://ps.pndsn.com/v2/history/sub-key/${subKey}/channel/${channelName}?count=100&include_meta=true&uuid=${askerUuid}`;
  axios
    .get(url)
    .then(function (response) {
      console.log("chat history: ", JSON.stringify(response));
      const historicalMessages = response.data as historyPayload;
      if (historicalMessages[0].length > 0) {
        const messagesToAdd = new Array<messageData>();
        historicalMessages[0].forEach((msg) => {
          const newMsg: messageData = {
            message: msg.message.message,
            sender: msg.message.sender,
            senderUuid: msg.message.senderUuid,
            timetoken: msg.timetoken,
          };
          messagesToAdd.push(newMsg);
        });
        setChatMessages(messagesToAdd);
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("PUBLISH ERROR");
    });
};

export default getChatHistory;

// [[],0,0]
// [[{"message": "Gecko1", "sender": "carl"}, {"message": "Gecko1", "sender": "carl"}],16415912858064824,16415913368396680]
