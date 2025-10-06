import { sign } from "jsonwebtoken";

export class JWTToken {
  static create(id: string, email: string, key: string) {
    return sign(
      {
        id: id,
        email: email,
      },
      key
    );
  }
}
