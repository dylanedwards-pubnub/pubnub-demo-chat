import axios from "axios";

/**
 *
 * @param channelName
 * @param askerUuid
 *
 * example response
 * {
 *  "status": 200,
 * "message": "OK",
 *   "occupancy": 2,
 *   "uuids": [
 *       "MuvtdiolmTkTOQ_8DNn2W",
 *       "3OfWMP4ZSVwUpo5qH4GTY"
 *   ],
 *   "service": "Presence"
 * }
 */
export type HereNowResponse = {
  status: string;
  message: string;
  occupancy: number;
  uuids: Array<String>;
  service: string;
};

const hereNow = (
  channelName: string,
  askerUuid: string,
  setNumberUsersInChat: React.Dispatch<React.SetStateAction<number>>
) => {
  const subKey = process.env.REACT_APP_SUB_KEY;
  const url = `https://ps.pndsn.com/v2/presence/sub-key/${subKey}/channel/${channelName}?uuid=${askerUuid}`;
  console.log("RUN HERE NOW");

  axios
    .get(url)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      const data = response.data as HereNowResponse;
      setNumberUsersInChat(data.occupancy);
    })
    .catch(function (error) {
      console.log(error);
      alert("PUBLISH ERROR");
    });
};

export default hereNow;
