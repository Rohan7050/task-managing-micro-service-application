import type { List } from "@/types/board/list.type";
import { useDroppable } from "@dnd-kit/core";
import React from "react";
import ListForm from "../list-form/ListForm";
import { useActiveListFormStore } from "@/store/list.store";
import { PencilIcon } from "@heroicons/react/24/outline";


interface DroppableListProps {
  list: List;
  children: React.ReactNode;
}

const DroppableList: React.FC<DroppableListProps> = ({ list, children }) => {
  const { setNodeRef } = useDroppable({ id: list.id });
  const { ListFormActiveId, setActiveListForm } = useActiveListFormStore()
  return (
    <div
      ref={setNodeRef}
      className="relative bg-[#101204] rounded-md w-full md:w-1/3 lg:w-1/5 me-6 shrink-0"
    >
      {ListFormActiveId !== list.id && <div onClick={() => setActiveListForm(list.id)} className="absolute top-0 right-0 flex flex-col items-end">
        <PencilIcon className="text-white p-2" height={30} width={30} />
      </div>}
      {ListFormActiveId === list.id
        ? <ListForm listData={list} fullWidth={true}></ListForm>
        : <h2 className="p-2 text-[#BFC1C4] font-bold text-start" >{list.name}</h2>}
      {list.cards && (
        <div className="m-2">{children}</div>
      )}
    </div>
  );
};

export default DroppableList;
