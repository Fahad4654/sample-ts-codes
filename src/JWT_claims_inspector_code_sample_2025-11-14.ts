import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  sub: string;
  name: string;
  iat: number;
  exp: number;
  roles?: string[];
}

function inspectJwt(token: string): JwtPayload | null {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}

function isTokenExpired(payload: JwtPayload | null): boolean {
  if (!payload) {
    return true;
  }
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

function main() {
  const validToken = jwt.sign({ sub: '1234567890', name: 'John Doe', iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + (60 * 60), roles: ['admin', 'user'] }, 'secret');
  const expiredToken = jwt.sign({ sub: '1234567890', name: 'Jane Doe', iat: Math.floor(Date.now() / 1000) - (60 * 60), exp: Math.floor(Date.now() / 1000) - (30 * 60)}, 'secret');
  const invalidToken = "this.is.not.a.jwt";

  const validPayload = inspectJwt(validToken);
  const expiredPayload = inspectJwt(expiredToken);
  const invalidPayload = inspectJwt(invalidToken);


  console.log("Valid Token Payload:", validPayload);
  console.log("Expired Token Payload:", expiredPayload);
  console.log("Invalid Token Payload:", invalidPayload);

  console.log("Valid Token Expired:", isTokenExpired(validPayload));
  console.log("Expired Token Expired:", isTokenExpired(expiredPayload));
  console.log("Invalid Token Expired:", isTokenExpired(invalidPayload));
}

main();