import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthPatientRequest extends Request {
  patientId?: number;
}

export function authPatientMiddleware(
  req: AuthPatientRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, "JWT_SECRET") as { patientId: number };
    req.patientId = decoded.patientId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
