export interface IChatMessage {
  t: { t: string; r: number };
  m: Array<messagePayload>;
}

export type messagePayload = {
  a: string;
  f: number;
  i: string;
  p: { t: string; r: number };
  k: string;
  c: string;
  d: messageData;
};


export type messageData = {
  message: string;
  sender: string;
  senderUuid: string;
  timetoken: number
};

