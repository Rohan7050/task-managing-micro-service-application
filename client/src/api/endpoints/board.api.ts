import { BoardApiUrl } from "../apiUrl.constant";
import { apiClient } from "../client";

export const getAllBoards = async () => {
    const boards = await apiClient.get(BoardApiUrl.getAllBoards.url);
    return boards.data;
}

export const createBoard = async (data: {name: string, desc: string, id: string}) => {
    if(data.id === '') {
        const boards = await apiClient.post(BoardApiUrl.createBoard.url, {desc: data.desc, name: data.name});
        return boards.data;
    }else {
        const boards = await apiClient.put(BoardApiUrl.updateBoard.url, {desc: data.desc, name: data.name, board: data.id});
        return boards.data;
    }
}

export const authenticateBoard = async (id: string) => {
    const boards = await apiClient.post(BoardApiUrl.boardAuth.url, {boardId: id});
    return boards.data;
}

export const getBoardDetails = async (board: string) => {
    const boardDtl = await apiClient.post(BoardApiUrl.boardDetails.url, {board});
    return boardDtl.data;
}