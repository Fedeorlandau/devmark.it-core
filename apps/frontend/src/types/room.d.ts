import type { Member, MemberInfo } from "./member";

export type Room = {
  owner: Member;
  options: RoomOptions;
  selectedOptions: SelectedOption[];
  members: Member[];
  membersInfo: MemberInfo[];
  hash?: string;
  revealed: boolean;
  createdAt?: Date;
  id?: string;
};

type RoomOptions = {
  id: number;
  label: string;
  values: number[];
};

type SelectedOption = {
  id: string;
  value: number;
};
