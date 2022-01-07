import axios from "axios";
import IChatMessage from "../types/chatMessage";

const subscribe = async (
  channelName: string,
  subscriberUuid: string,
  timeToken: string,
  setChatMessages: React.Dispatch<React.SetStateAction<IChatMessage[]>>,
  chatMessages: Array<IChatMessage>
) => {
  const subKey = process.env.REACT_APP_SUB_KEY
  const url = `https://ps.pndsn.com/v2/subscribe/${subKey}/${channelName}/0?uuid=${subscriberUuid}&tt=${timeToken}`;
  console.log("starting sub call w time token: ", timeToken)
  axios
    .get(url)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      //add data to chat messages if not the first sub
      const newMessage = response.data as unknown as IChatMessage
      if ( newMessage.m.length > 0) {
        setChatMessages(chatMessages => [...chatMessages, newMessage])
      }
      // parse  out time token for a new call 
      console.log(response.data.t.t)
      subscribe( channelName,subscriberUuid, response.data.t.t, setChatMessages, chatMessages)
    })
    .catch(function (error) {
      console.log(error);
      alert("SUBSCRIPTION FAILURE");
    });
};

export default subscribe