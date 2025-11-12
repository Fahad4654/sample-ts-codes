import { sign, verify, JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';

const JWT_SECRET = 'super-secret-key'; // Replace with a secure secret in production

export const jwtUtils = {
  generateToken: (payload: object, options?: SignOptions): string => {
    return sign(payload, JWT_SECRET, { ...options, algorithm: 'HS256' });
  },

  verifyToken: <T extends JwtPayload>(token: string, options?: VerifyOptions): T | null => {
    try {
      const decoded = verify(token, JWT_SECRET, options) as T;
      return decoded;
    } catch (error) {
      return null;
    }
  },

  decodeToken: <T extends JwtPayload>(token: string): T | null => {
    try {
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return decoded as T;
    } catch (error) {
      return null;
    }
  },
};

// Example Usage
// const token = jwtUtils.generateToken({ userId: 123, username: 'testUser' }, { expiresIn: '1h' });
// console.log("Generated Token:", token);
// const verified = jwtUtils.verifyToken<{ userId: number, username: string }>(token);
// console.log("Verified Token:", verified);
// const decoded = jwtUtils.decodeToken<{ userId: number, username: string }>(token);
// console.log("Decoded Token:", decoded);