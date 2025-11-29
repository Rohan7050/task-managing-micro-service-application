import { createBoard, getAllBoards } from "@/api/endpoints/board.api";
import { queryKeys } from "@/api/queryKeys";
import BoardForm from "@/components/board-form/BoardForm";
import Modal from "@/components/modal/Modal";
import { useBoardStore } from "@/store/board.store";
import { PlusCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BoadsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [boardInfo, setBoardInfo] = useState({
    id: '',
    name: '',
    desc: ''
  })
  const {setBoards} = useBoardStore();
  const { isPending, isError, data, error, refetch: refetchBoardList } = useQuery({
    queryKey: queryKeys.boards,
    queryFn: async () => {
      const res = await getAllBoards();
      setBoards(res.data);
      console.log(res)
      return res;
    },
      refetchOnWindowFocus: false,   // ❌ don't refetch when window/tab is focused
      refetchOnMount: false,         // ❌ don't refetch when component remounts
      refetchOnReconnect: false,     // ❌ don't refetch on network reconnect
      staleTime: Infinity,           // ♾ data stays "fresh" forever
  });


  const onEditClick = (id: string, name: string, desc: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBoardInfo((p) => ({...p, id: id, name: name, desc: desc}));
    setIsOpen(true);
  } 

  const {mutate: createNewBoard} = useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      console.log(data)
      toast.success("Create new Board");
      refetchBoardList();
      setIsOpen(false)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: AxiosError<any>) => {
      console.log("login err", error, error?.status);
      if (error?.status === 400) {
        const errMsg = error.response?.data && error.response.data?.error ? error.response.data.error[0].message : 'Invalid Request'
        toast.error(errMsg);
      } else {
        toast.error("Something went wrong");
      }
      setIsOpen(false)
    },
  })

  const navigateToBoardDetailsPage = (id: string): void => {
    navigate('/boards/' + id)
  }

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

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          onClick={(e) => onEditClick('', '', '', e)}
          className="border-2 border-dashed h-[8rem] flex flex-row justify-center items-center cursor-pointer border-white rounded-lg bg-[#ffffff86]"
        >
          <PlusCircleIcon
            className="text-white"
            color="fff"
            height={30}
            width={30}
          />
          <h2 className="ps-3 text-white">Create new board</h2>
        </div>
        {data.data.map((item: { id: string; name: string; desc: string }) => (
          <div
            onClick={() => navigateToBoardDetailsPage(item.id)}
            key={item.id}
            className="relative group bg-gradient-to-br h-[8rem] cursor-pointer from-[#6A1E55] to-[#3B1C32] shadow-lg rounded-md border-2 border-white shadow-indigo-500/50 p-4 flex flex-col justify-start items-start"
          >
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end">
                <PencilIcon onClick={(e) => onEditClick(item.id, item.name, item.desc, e)} className="text-white p-2" height={35} width={35}/>
            </div>
            <h1 className="text-white">{item.name}</h1>
            <p className="pt-4 text-white">{item.desc}</p>
          </div>
        ))}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <BoardForm mutate={createNewBoard} id={boardInfo.id} name={boardInfo.name} desc={boardInfo.desc} />
        </Modal>
      </div>
    </div>
  );
}

export default BoadsPage;
