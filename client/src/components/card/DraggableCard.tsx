import type { Card } from "@/types/board/card.type";
import { useDraggable } from "@dnd-kit/core";
// import { useSortable } from "@dnd-kit/sortable";
import React from "react";

interface DraggableCardProps {
  card: Card;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
    data: card
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-[#242528] font-bold rounded-md text-start p-2 my-2"
    >
      <h1 className="text-[#BFC1C4]">{card.title}</h1>
    </div>
  );
};

export default DraggableCard;
