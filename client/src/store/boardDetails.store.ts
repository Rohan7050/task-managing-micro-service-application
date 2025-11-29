import type { Board } from "@/types/board/board.type";
import type { Card } from "@/types/board/card.type";
import type { List } from "@/types/board/list.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BoardDetailsState {
  board: Board | null;
  setBoard: (board: Board) => void;
  addNewList: (list: List) => void;
  updateList: (list: List) => void;
  createCard: (card: Card, position: string, index: number) => void;
  updateCard: (card: Card, position: string, index: number) => void;
  updateCardNew: (card: Card, oldList: string, newList: string, inSameList: boolean) => void
}

export const useBoardDetailsStore = create<BoardDetailsState>()(
  persist(
    (set) => ({
      board: null,
      setBoard: (board: Board): void => {
        set({ board });
      },
      addNewList: (list: List): void => {
        set((state) => {
          if (!state.board) return state;
          return {
            board: {
              ...state.board,
              lists: [
                ...(state.board.lists as Array<List>).map(
                  (listItem) => listItem
                ),
                list,
              ],
            },
          };
        });
      },
      updateList: (list: List): void => {
        set((state) => {
          if (!state.board) return state;
          return {
            board: {
              ...state.board,
              lists: (state.board.lists as Array<List>).map((listItem) => {
                if (list.id === listItem.id) {
                  return {
                    ...listItem,
                    name: list.name,
                    desc: list.desc,
                    createdAt: list.createdAt,
                    updatedAt: list.updatedAt,
                    __v: list.__v,
                  };
                } else {
                  return { ...listItem };
                }
              }),
            },
          };
        });
      },
      createCard: (card: Card, position: string, index: number = 0): void => {
        console.log("index ==> ", index, "position ==> ", position);
        set((state) => {
          if (!state.board) return state;
          return {
            board: {
              ...state.board,
              lists: state.board.lists?.map((list) =>
                list.id === card.list
                  ? {
                      ...list,
                      cards: [
                        card,
                        ...list.cards!.map((cardItem) => cardItem),
                      ].sort((a, b) => a.order - b.order),
                    }
                  : list
              ),
            },
          };
        });
      },
      updateCard: (card: Card, position: string, index: number = 0): void => {
        console.log("index ==> ", index, "position ==> ", position);
        set((state) => {
          if (!state.board) return state;
          return {
            board: {
              ...state.board,
              lists: state.board.lists?.map((list) =>
                list.id === card.list
                  ? {
                      ...list,
                      cards: list
                        .cards!.map((cardItem) =>
                          cardItem.id === card.id ? card : cardItem
                        )
                        .sort((a, b) => a.order - b.order),
                    }
                  : list
              ),
            },
          };
        });
      },
      updateCardNew: (card: Card, oldList: string, newList: string, inSameList: boolean = false): void => {
        console.log("oldList ==> ", oldList, "newList ==> ", newList);
        set((state) => {
          if (!state.board) return state;
          if(state.board.lists?.length) {
              for(const list of state.board.lists) {
                if(!inSameList) {
                  if(list.id === oldList) {
                      list.cards = list.cards?.filter((cardItem: Card) => cardItem.id !== card.id)
                      console.log('oldList => ', list);
                  }
                  if(list.id === newList) {
                      card.list = newList;
                      list.cards = [{...card!}, ...list.cards!.map((cardItem) => cardItem)]
                      console.log('newList => ', list);
                  }
                }else {
                  if(list.id === newList) {
                      list.cards = list.cards!.map((cardItem) => cardItem.id === card.id ? card : cardItem)
                      console.log('sameList => ', list);
                  }
                }
              }
          }
          console.log(state);
          return {
            board: {
              ...state.board,
              lists: state.board.lists?.map((list) => list)
            }
          }
        });
      },
    }),
    {
      name: "board-storage",
    }
  )
);
