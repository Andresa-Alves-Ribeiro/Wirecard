import * as jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export class TokenGenerator {

  public generate = (input: AuthenticationData): string => {
    const newToken = jwt.sign(
      {
        id: input.id,
        name: input.name,
        card: input.card,
        expiration_date: input.expiration_date,
        cvv: input.cvv
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: "30min",
      }
    );
    return newToken;
  };

  public verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = { id: payload.id, name:payload.name, card: payload.card, expiration_date: payload.expiration_date, cvv: payload.cvv};
    return result;
  }
};

export interface AuthenticationData {
  id: string,
  name?:string,
  card?: string,
  expiration_date?:string,
  cvv?:string
};