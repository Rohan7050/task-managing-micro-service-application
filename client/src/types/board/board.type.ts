import type { List } from "./list.type";

export type Board = {
  name: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  lists?: List[];
};
