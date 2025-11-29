import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Board {
  id: string;
  name: string;
  desc: string;
}
interface BoardsState {
  boards: Board[];
  setBoards: (data: Board[]) => void;
}

export const useBoardStore = create<BoardsState>()(
  persist(
    (set) => ({
      boards: [],
      setBoards: (data: Board[]) => {
        set({ boards: data });
      },
    }),
    {
      name: "board-storage",
    }
  )
);
