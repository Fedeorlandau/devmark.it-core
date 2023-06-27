import type { Participant } from "./participant";

export type Member = string;

export type MemberInfo = {
  clientId: string;
  name: Member;
  participant: Participant;
  voted: boolean;
};
