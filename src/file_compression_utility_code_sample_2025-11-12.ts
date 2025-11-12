import * as zlib from 'zlib';
import * as fs from 'fs';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const deflate = promisify(zlib.deflate);
const brotliCompress = promisify(zlib.brotliCompress);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function compressFile(
  inputFilePath: string,
  outputFilePath: string,
  algorithm: 'gzip' | 'deflate' | 'brotli' = 'gzip'
): Promise<void> {
  try {
    const data = await readFile(inputFilePath);
    let compressedData: Buffer;

    switch (algorithm) {
      case 'gzip':
        compressedData = await gzip(data);
        break;
      case 'deflate':
        compressedData = await deflate(data);
        break;
      case 'brotli':
        compressedData = await brotliCompress(data);
        break;
      default:
        throw new Error(`Unsupported compression algorithm: ${algorithm}`);
    }

    await writeFile(outputFilePath, compressedData);
    console.log(`File compressed successfully using ${algorithm}.`);

  } catch (error) {
    console.error("Error compressing file:", error);
    throw error;
  }
}

async function decompressFile(
  inputFilePath: string,
  outputFilePath: string,
  algorithm: 'gzip' | 'deflate' | 'brotli' = 'gzip'
): Promise<void> {

  try {
    const readFileAsync = promisify(fs.readFile);
    const writeFileAsync = promisify(fs.writeFile);
    const gunzipAsync = promisify(zlib.gunzip);
    const inflateAsync = promisify(zlib.inflate);
    const brotliDecompressAsync = promisify(zlib.brotliDecompress);

    const compressedData = await readFileAsync(inputFilePath);
    let decompressedData: Buffer;

    switch (algorithm) {
      case 'gzip':
        decompressedData = await gunzipAsync(compressedData);
        break;
      case 'deflate':
        decompressedData = await inflateAsync(compressedData);
        break;
      case 'brotli':
        decompressedData = await brotliDecompressAsync(compressedData);
        break;
      default:
        throw new Error(`Unsupported decompression algorithm: ${algorithm}`);
    }

    await writeFileAsync(outputFilePath, decompressedData);
    console.log(`File decompressed successfully using ${algorithm}.`);

  } catch (error) {
    console.error("Error decompressing file:", error);
    throw error;
  }
}


async function main() {
  try {
    // Example usage:
    const inputFile = 'input.txt';
    const compressedFile = 'compressed.gz';
    const decompressedFile = 'decompressed.txt';


    // Create a dummy input file
    await writeFile(inputFile, 'This is a test string for compression.\n'.repeat(100));

    await compressFile(inputFile, compressedFile, 'gzip');
    await decompressFile(compressedFile, decompressedFile, 'gzip');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


if (require.main === module) {
  main();
}