import axios from "axios";

const publish = (
  channelName: string,
  publisherUuid: string,
  publisherScreenName: string,
  message: string
) => {
  const subKey = process.env.REACT_APP_SUB_KEY;
  const pubKey = process.env.REACT_APP_PUB_KEY;
  const url = `https://ps.pndsn.com/publish/${pubKey}/${subKey}/0/${channelName}/0?store=1&uuid=${publisherUuid}`;

  var data = JSON.stringify({
    message: message,
    sender: publisherScreenName,
    senderUuid: publisherUuid
  });

  var config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(url, data, config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      alert("PUBLISH ERROR");
    });
};

export default publish;
