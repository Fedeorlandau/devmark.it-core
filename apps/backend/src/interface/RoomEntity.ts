import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface OptionPack {
  id: number;
  label: string;
  values: number[];
}

export interface RoomEntity extends InMemoryDBEntity {
  id: string;
  hash: string;
  owner: string;
  options: OptionPack;
  selectedOptions: {
    id: string;
    value: number;
  }[];
  members: string[];
  membersInfo: { clientId: string; name: string; voted?: boolean }[];
  revealed: boolean;
  createdAt: Date;
}
