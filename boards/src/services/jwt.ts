import { sign } from "jsonwebtoken";

export class JWTToken {
  static create(boardId: string, accessType: string, userId: string, key: string) {
    return sign(
      {
        boardId,
        accessType,
        userId: userId
      },
      key
    );
  }
}
