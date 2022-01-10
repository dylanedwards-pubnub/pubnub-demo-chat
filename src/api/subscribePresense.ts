import axios from "axios";
import IPresenceMessage from "../types/presenceMessage";

const subscribePresence = (
  channelName: string,
  subscriberUuid: string,
  timeToken: string,
  setNumberUsersInChat: React.Dispatch<React.SetStateAction<number>>,
  region: null | number
) => {
  const subKey = process.env.REACT_APP_SUB_KEY;
  let url;
  if (region) {
    url = `https://ps.pndsn.com/v2/subscribe/${subKey}/${channelName}-pnpres/0?uuid=${subscriberUuid}&tt=${timeToken}&tr=${region}`;
  } else {
    url = `https://ps.pndsn.com/v2/subscribe/${subKey}/${channelName}-pnpres/0?uuid=${subscriberUuid}&tt=${timeToken}`;
  }
  console.log("starting presence call w time token: ", timeToken)

  axios
    .get(url)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      // set number of ppl in chat if not the first sub
      const newMessage = response.data as unknown as IPresenceMessage
      if ( newMessage.m.length > 0) {
          setNumberUsersInChat(newMessage.m[0].u.pn_occupancy)
      }
      // parse  out time token for a new call 
      subscribePresence( channelName,subscriberUuid, newMessage.t.t, setNumberUsersInChat, newMessage.t.r)
    })
    .catch(function (error) {
      console.log(error);
      alert("PRESENCE FAILURE");
    });
};

export default subscribePresence;

// m[0].u.pn_occupancy
