import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text: string): { encryptedData: string; iv: string } {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(encryptedData: string, ivHex: string): string {
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Example Usage:
const originalText = 'This is a secret message!';
const encryptionResult = encrypt(originalText);
const decryptedText = decrypt(encryptionResult.encryptedData, encryptionResult.iv);

console.log('Original Text:', originalText);
console.log('Encrypted Data:', encryptionResult.encryptedData);
console.log('Decrypted Text:', decryptedText);

export {};