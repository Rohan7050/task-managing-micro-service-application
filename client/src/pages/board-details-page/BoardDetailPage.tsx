import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryKeys";
import { getBoardDetails } from "@/api/endpoints/board.api";
import { useBoardDetailsStore } from "@/store/boardDetails.store";
import { useEffect } from "react";
import { BOARD_BG_COLOR } from "@/utils/constants";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import DroppableList from "@/components/list/DroppableList";
import DraggableCard from "@/components/card/DraggableCard";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Card } from "@/types/board/card.type";
import ListForm from "@/components/list-form/ListForm";
import { useActiveListFormStore } from "@/store/list.store";

const BoardDetailPage = () => {
  const { id } = useParams();
  const { board, setBoard, updateCardNew } = useBoardDetailsStore();

  const { ListFormActiveId, setActiveListForm } = useActiveListFormStore()
  const {
    isError,
    isPending,
    error,
    refetch: refetchBoardDetails,
  } = useQuery({
    queryKey: queryKeys.boardDtl(id as string),
    queryFn: async () => {
      const res = await getBoardDetails(id as string);
      console.log("_-----> ", res);
      setBoard(res.data.board);
      return res;
    },
    refetchOnWindowFocus: false, // ❌ don't refetch when window/tab is focused
    refetchOnMount: false, // ❌ don't refetch when component remounts
    refetchOnReconnect: false, // ❌ don't refetch on network reconnect
    staleTime: Infinity, // ♾ data stays "fresh" forever
  });

  useEffect(() => {
    refetchBoardDetails();
  }, [id]);

  if (isPending) {
    return (
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <span className="text-white">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <span className="text-white">Error: {error.message}</span>
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("Drag End:", event, event.over?.id);
    // You can update your state here (move card, reorder, etc.)
    const { active, over } = event;
    if (over === null) return;
    const newCard = { ...active.data.current };
    const prevListId = newCard.list;
    updateCardNew(active.data.current as Card, prevListId, over.id as string, over.id as string === newCard.list)
  };

  const showListForm = () => {
    setActiveListForm("000");
  }

  return (
    <div
      className={
        BOARD_BG_COLOR["1"] + " isolate px-6 pt-24 pb-4 sm:pt-32 lg:px-8 h-dvh"
      }
    >
      <h1 className="text-2xl text-white">Board Details Page: {board?.name}</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex justify-start items-start h-full overflow-x-scroll">
          {board &&
            board.lists?.map((listItem) => {
              return (
                <DroppableList key={listItem.id} list={listItem}>
                  <>
                    {listItem.cards?.map((cardItem) => {
                      return (
                        <DraggableCard
                          key={cardItem.id}
                          card={cardItem}
                        ></DraggableCard>

                      );
                    })}
                  </>
                </DroppableList>
              );
            })}
          {
            ListFormActiveId && ListFormActiveId === '000'
              ? <ListForm listData={{
                id: "000",
                name: "",
                desc: '',
                board: board!.id
              }} ></ListForm>
              : <div onClick={showListForm} className="w-full md:w-1/3 lg:w-1/5 me-6 shrink-0 h-[3rem] flex flex-row justify-center items-center cursor-pointer border-white rounded-lg bg-[#ffffff86]">
                <PlusCircleIcon
                  className="text-white"
                  color="fff"
                  height={25}
                  width={25}
                />
                <h2 className="ps-3 text-white">Add another list</h2>
              </div>

          }
        </div>
      </DndContext>
    </div>
  );
};

export default BoardDetailPage;
