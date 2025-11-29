import { ListApiUrl } from "../apiUrl.constant";
import { apiClient } from "../client";

export const createList = async (data: { name: string, desc: string, board: string }) => {
    const boards = await apiClient.post(ListApiUrl.createList.url, {
        desc: data.desc,
        name: data.name,
        board: data.board
    });
    return boards.data;

}

export const updateList = async (data: { name: string, desc: string, id: string, board: string }) => {
    const boards = await apiClient.put(ListApiUrl.updateList.url, {
        desc: data.desc,
        name: data.name,
        board: data.board,
        listId: data.id,
    });
    return boards.data;
}