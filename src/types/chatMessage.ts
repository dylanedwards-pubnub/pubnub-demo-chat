export interface IChatMessage {
  t: { t: string; r: number };
  m: Array<messagePayload>;
}

export type messagePayload = {
  a: string;
  f: number;
  i: string;
  p: { t: number; r: number };
  k: string;
  c: string;
  d: subMessageData;
};


export type subMessageData = {
  message: string;
  sender: string;
  senderUuid: string;
};

export type messageData = {
  message: string;
  sender: string;
  senderUuid: string;
  timetoken: number
};
