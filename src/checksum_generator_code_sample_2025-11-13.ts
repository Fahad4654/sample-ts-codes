type ChecksumAlgorithm = 'MD5' | 'SHA1' | 'SHA256';

async function generateChecksum(data: string, algorithm: ChecksumAlgorithm = 'SHA256'): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);

  const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

async function verifyChecksum(data: string, checksum: string, algorithm: ChecksumAlgorithm = 'SHA256'): Promise<boolean> {
    const generatedChecksum = await generateChecksum(data, algorithm);
    return generatedChecksum === checksum;
}

// Example Usage
async function main() {
  const data = "This is a test string.";
  const checksumSHA256 = await generateChecksum(data);
  console.log("SHA256 Checksum:", checksumSHA256);

  const isValid = await verifyChecksum(data, checksumSHA256);
  console.log("Checksum is valid:", isValid);

    const checksumMD5 = await generateChecksum(data, 'MD5');
    console.log("MD5 Checksum:", checksumMD5);
}

if (typeof window === 'undefined') { // Check if running in Node.js environment
    main();
}