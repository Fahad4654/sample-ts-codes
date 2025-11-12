interface ParserOptions {
  delimiter?: string;
  header?: boolean;
}

type ParsedRow = { [key: string]: string };

async function parseFile(
  filePath: string,
  options: ParserOptions = {}
): Promise<ParsedRow[]> {
  const { delimiter = ',', header = false } = options;
  const decoder = new TextDecoder();
  const file = await Deno.readFile(filePath);
  const text = decoder.decode(file);
  const lines = text.trim().split('\n');

  if (!lines.length) return [];

  const headers = header ? lines.shift()!.split(delimiter) : undefined;
  return lines.map((line) => {
    const values = line.split(delimiter);
    if (headers) {
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || '';
        return obj;
      }, {} as ParsedRow);
    } else {
      return values.reduce((obj, value, index) => {
        obj[index.toString()] = value;
        return obj;
      }, {} as ParsedRow);
    }
  });
}

export { parseFile, ParserOptions, ParsedRow };