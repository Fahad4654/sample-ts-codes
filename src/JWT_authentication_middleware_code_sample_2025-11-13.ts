import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  userId?: string;
}

const jwtSecret = 'your-secret-key'; // Store securely!

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, decoded: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.userId = decoded.userId;
    next();
  });
};

export { generateToken, authenticateToken, AuthRequest };