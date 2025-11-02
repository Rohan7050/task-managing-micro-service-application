import { BoardApiUrl } from "../apiUrl.constant";
import { apiClient } from "../client";

export const getAllBoards = async () => {
    const boards = await apiClient.get(BoardApiUrl.getAllBoards.url);
    return boards.data;
}

export const createBoard = async (data: {name: string, desc: string}) => {
    const boards = await apiClient.post(BoardApiUrl.createBoard.url, data);
    return boards.data;
}