import crypto from 'crypto';

namespace HashUtil {

  export function sha256(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  export function md5(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  export function generateSalt(length: number = 16): string {
    return crypto.randomBytes(length).toString('hex');
  }

  export function saltedHash(data: string, salt: string): string {
    const combined = salt + data;
    return sha256(combined);
  }

  export function verifySaltedHash(data: string, hash: string, salt: string): boolean {
    return saltedHash(data, salt) === hash;
  }

  export function hmacSHA256(data: string, key: string): string {
    return crypto.createHmac('sha256', key).update(data).digest('hex');
  }

  export function generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
  }

}

export default HashUtil;