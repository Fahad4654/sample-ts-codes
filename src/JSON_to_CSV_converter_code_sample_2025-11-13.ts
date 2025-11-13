function jsonToCsv(json: any[], delimiter: string = ","): string {
  if (!json || json.length === 0) {
    return "";
  }

  const headers: string[] = Object.keys(json[0]);
  const csvRows: string[] = [];

  csvRows.push(headers.join(delimiter));

  for (const row of json) {
    const values: string[] = headers.map(header => {
      const value = row[header];
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return String(value);
    });
    csvRows.push(values.join(delimiter));
  }

  return csvRows.join("\n");
}

function downloadCsv(csv: string, filename: string = "data.csv"): void {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// Example usage (requires a DOM environment)
async function convertAndDownload(jsonData: any[], filename: string = "data.csv") {
    const csvData = jsonToCsv(jsonData);
    downloadCsv(csvData, filename);
}


export { jsonToCsv, downloadCsv, convertAndDownload };

// Example JSON data
// const data = [
//     { "name": "John Doe", "age": 30, "city": "New York" },
//     { "name": "Jane Doe", "age": 25, "city": "Los Angeles" }
// ];
//
// To use the example, uncomment the data and convertAndDownload function calls within a DOM environment.
// convertAndDownload(data, "example.csv");