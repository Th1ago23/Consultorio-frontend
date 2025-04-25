import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

export const authenticateToken: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    res.status(401).json({ error: 'Não autorizado' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    (req as AuthRequest).userId = user.userId;
    (req as AuthRequest).isAdmin = user.isAdmin;

    next();
  } catch (err) {
    res.status(403).json({ error: 'Token inválido' });
  }
};

export const authenticateAdmin: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.isAdmin) {
    return next();
  } else {
    res.status(403).json({ error: 'Acesso proibido' });
  }
};