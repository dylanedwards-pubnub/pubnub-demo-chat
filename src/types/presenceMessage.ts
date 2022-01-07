interface IPresenceMessage {
  t: { t: string; r: number };
  m: Array<presenceMessage>;
}

type presenceMessage = {
  a: string;
  f: number;
  p: { t: string; r: number };
  k: string;
  c: string;
  u: {
    pn_action: string;
    pn_uuid: string;
    pn_timestamp: number;
    pn_occupancy: number;
    pn_ispresence: number;
    pn_channel: string;
  };
  d: {
    action: string;
    uuid: string;
    timestamp: number;
    occupancy: number;
  };
};

export default IPresenceMessage;
