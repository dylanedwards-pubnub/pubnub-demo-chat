import axios from "axios";
import {IChatMessage, messageData} from "../types/chatMessage";

const subscribe = (
  channelName: string,
  subscriberUuid: string,
  timeToken: string,
  setChatMessages: React.Dispatch<React.SetStateAction<messageData[]>>,
  chatMessages: Array<messageData>,
  region: null | number

) => {
  const subKey = process.env.REACT_APP_SUB_KEY
  let url
  if (region) {
    url = `https://ps.pndsn.com/v2/subscribe/${subKey}/${channelName}/0?uuid=${subscriberUuid}&tt=${timeToken}&tr=${region}`;
  } else {
    url = `https://ps.pndsn.com/v2/subscribe/${subKey}/${channelName}/0?uuid=${subscriberUuid}&tt=${timeToken}`;
  }
  
  console.log("starting sub call w time token: ", timeToken)
  axios
    .get(url)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      //add data to chat messages if not the first sub
      const newMessage = response.data  as IChatMessage
      if ( newMessage.m.length > 0) {
        // create a new instance of message data from the sub payload
        const messageToAdd : messageData = {
          message: newMessage.m[0].d.message,
          sender: newMessage.m[0].d.sender,
          senderUuid: newMessage.m[0].d.senderUuid,
          timetoken: newMessage.m[0].p.t
        }
        // newMessage.m[0].d
        setChatMessages(chatMessages => [...chatMessages, messageToAdd])
      }
      // parse  out time token for a new call 
      console.log(response.data.t.t)
      subscribe( channelName,subscriberUuid, newMessage.t.t, setChatMessages, chatMessages, newMessage.t.r)
    })
    .catch(function (error) {
      console.log(error);
      alert("SUBSCRIPTION FAILURE");
    });
};

export default subscribe