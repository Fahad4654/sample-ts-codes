interface Diff {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
}

function diffText(oldText: string, newText: string): Diff[] {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const diffs: Diff[] = [];
  let i = 0;
  let j = 0;

  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      diffs.push({ type: 'unchanged', value: oldLines[i] });
      i++;
      j++;
    } else if (i < oldLines.length && (j === newLines.length || lcsLength(oldLines, newLines, i, j) <= lcsLength(oldLines, newLines, i + 1, j))) {
      diffs.push({ type: 'removed', value: oldLines[i] });
      i++;
    } else {
      diffs.push({ type: 'added', value: newLines[j] });
      j++;
    }
  }

  return diffs;

  function lcsLength(oldArr: string[], newArr: string[], oldIndex: number, newIndex: number): number {
    let len = 0;
    while (oldIndex < oldArr.length && newIndex < newArr.length && oldArr[oldIndex] === newArr[newIndex]) {
      len++;
      oldIndex++;
      newIndex++;
    }
    return len;
  }
}

function renderDiff(diffs: Diff[]): string {
  let html = '';
  for (const diff of diffs) {
    switch (diff.type) {
      case 'added':
        html += `<span style="background-color:#ccffcc;">${diff.value}\n</span>`;
        break;
      case 'removed':
        html += `<span style="background-color:#ffcccc;">${diff.value}\n</span>`;
        break;
      case 'unchanged':
        html += `<span>${diff.value}\n</span>`;
        break;
    }
  }
  return html;
}

export { diffText, renderDiff, Diff };