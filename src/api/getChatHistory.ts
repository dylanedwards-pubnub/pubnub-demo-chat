import axios from "axios";
import { StringMappingType } from "typescript";
import {IChatMessage, messageData} from "../types/chatMessage";


type historyPayload = [Array<messageData>, number, number] 

const getChatHistory = (
  channelName: string,
  askerUuid: StringMappingType,
  setChatMessages: React.Dispatch<React.SetStateAction<messageData[]>>,
  chatMessages: Array<messageData>
) => {
  const subKey = process.env.REACT_APP_SUB_KEY;
  const url = `https://ps.pndsn.com/v2/history/sub-key/${subKey}/channel/${channelName}?count=100&uuid=${askerUuid}`;
  axios
    .get(url)
    .then(function (response) {
      console.log("chat history: ", JSON.stringify(response));
      const historicalMessages = response.data as historyPayload;
      if (historicalMessages[0].length > 0) {
        setChatMessages(historicalMessages[0]);
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
