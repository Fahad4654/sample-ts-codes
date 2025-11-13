// formatter.ts
import { format, resolveConfig } from 'prettier';
import * as fs from 'fs/promises';

async function formatFile(filePath: string): Promise<void> {
  try {
    const config = await resolveConfig(filePath);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const formattedContent = format(fileContent, { ...config, filepath: filePath });

    if (fileContent !== formattedContent) {
      await fs.writeFile(filePath, formattedContent, 'utf-8');
      console.log(`Formatted ${filePath}`);
    } else {
      console.log(`No changes in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error formatting ${filePath}:`, error);
  }
}

async function main(): Promise<void> {
  if (process.argv.length < 3) {
    console.error('Usage: ts-node formatter.ts <file1> <file2> ...');
    process.exit(1);
  }

  const filePaths = process.argv.slice(2);

  for (const filePath of filePaths) {
    await formatFile(filePath);
  }
}

main();