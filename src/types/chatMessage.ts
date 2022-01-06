interface IChatMessage {
  t: { t: string; r: number };
  m: Array<messagePayload>;
}

type messagePayload = {
  a: string;
  f: number;
  i: string;
  p: { t: string; r: number };
  k: string;
  c: string;
  d: { message: string; sender: string };
};

export default IChatMessage;
