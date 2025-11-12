type Diff = {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
};

function textDiff(text1: string, text2: string): Diff[] {
  const diffs: Diff[] = [];
  let i = 0;
  let j = 0;

  while (i < text1.length || j < text2.length) {
    if (i < text1.length && j < text2.length && text1[i] === text2[j]) {
      diffs.push({ type: 'unchanged', value: text1[i] });
      i++;
      j++;
    } else if (i < text1.length && (j === text2.length || longestCommonSubsequence(text1.substring(i), text2.substring(j)).length <= 0)) {
      diffs.push({ type: 'removed', value: text1[i] });
      i++;
    } else {
      diffs.push({ type: 'added', value: text2[j] });
      j++;
    }
  }

  return diffs;

  function longestCommonSubsequence(str1: string, str2: string): string {
    const dp: string[][] = Array(str1.length + 1).fill(null).map(() => Array(str2.length + 1).fill(''));

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + str1[i - 1];
        } else {
          dp[i][j] = dp[i - 1][j].length > dp[i][j - 1].length ? dp[i - 1][j] : dp[i][j - 1];
        }
      }
    }

    return dp[str1.length][str2.length];
  }
}

function formatDiff(diffs: Diff[]): string {
    let result = "";
    diffs.forEach(diff => {
        switch (diff.type) {
            case 'added':
                result += `+${diff.value}`;
                break;
            case 'removed':
                result += `-${diff.value}`;
                break;
            case 'unchanged':
                result += ` ${diff.value}`;
                break;
        }
    });
    return result;
}

function characterDiff(text1:string, text2:string):string[]{
    const diffs: string[] = [];
    let i = 0;
    let j = 0;

    while (i < text1.length || j < text2.length) {
        if (i < text1.length && j < text2.length && text1[i] === text2[j]) {
            diffs.push(` ${text1[i]}`);
            i++;
            j++;
        } else if (i < text1.length && (j === text2.length)) {
            diffs.push(`-${text1[i]}`);
            i++;
        } else {
            diffs.push(`+${text2[j]}`);
            j++;
        }
    }

    return diffs;
}