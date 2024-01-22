// types/next.d.ts
import jwt from "jsonwebtoken";

declare module "next" {
  interface NextApiRequest {
    user?: jwt.JwtPayload;
  }
}
