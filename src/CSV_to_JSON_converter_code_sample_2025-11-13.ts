type CsvToJsonOptions = {
  delimiter?: string;
  quote?: string;
  header?: boolean;
};

function csvToJson<T = any>(csv: string, options: CsvToJsonOptions = {}): T[] {
  const delimiter = options.delimiter || ",";
  const quote = options.quote || '"';
  const header = options.header !== false;

  const lines = csv.trim().split("\n");
  if (!lines.length) return [];

  const headers = header ? lines.shift()!.split(delimiter).map(h => h.replace(new RegExp(`^${quote}|${quote}$`, 'g'), '').trim()) : [];
  const data: T[] = [];

  for (const line of lines) {
    const values = line.split(delimiter).map(v => v.replace(new RegExp(`^${quote}|${quote}$`, 'g'), '').trim());
    if (header) {
      const obj: any = {};
      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = values[i] || null;
      }
      data.push(obj);
    } else {
      data.push(values as any);
    }
  }

  return data;
}

export default csvToJson;