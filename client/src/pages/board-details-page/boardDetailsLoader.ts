import { authenticateBoard } from "@/api/endpoints/board.api";

export async function boardLoader ({params}: any) {
    const {id} = params;
    try {
        const res = await authenticateBoard(id);
        return res;
    } catch(err: any) {
        if(err.status === 401) {
            throw new Response("Access Denied", { status: 401 });
        }else if(err.status === 400) {
            throw new Response("Board Not Found", { status: 400 });
        }else {
            throw new Response("Failed to load board", { status: 500 });
        }
    }
}
