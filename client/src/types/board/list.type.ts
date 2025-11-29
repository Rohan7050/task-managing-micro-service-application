import type { Card } from "./card.type";

export type List = {
  name:string;
  desc: string;
  order: number;
  board: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  cards?: Card[]
};
