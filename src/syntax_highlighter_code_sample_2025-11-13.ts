type SyntaxToken = {
    type: string;
    value: string;
    start: number;
    end: number;
};

function highlight(code: string, grammar: Record<string, RegExp>): SyntaxToken[] {
    const tokens: SyntaxToken[] = [];
    let pos = 0;

    while (pos < code.length) {
        let match = null;
        let matchedType = null;

        for (const type in grammar) {
            const regex = grammar[type];
            regex.lastIndex = pos;
            const currentMatch = regex.exec(code);

            if (currentMatch && (!match || currentMatch.index < match.index)) {
                match = currentMatch;
                matchedType = type;
            }
        }

        if (match) {
            const value = match[0];
            tokens.push({
                type: matchedType!,
                value,
                start: match.index,
                end: match.index + value.length
            });
            pos = match.index + value.length;
        } else {
            tokens.push({
                type: "default",
                value: code[pos],
                start: pos,
                end: pos + 1
            });
            pos++;
        }
    }

    return tokens;
}

function render(tokens: SyntaxToken[]): string {
    return tokens.map(token => `<span class="${token.type}">${escapeHtml(token.value)}</span>`).join("");
}

function escapeHtml(unsafe: string): string {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

const jsGrammar = {
    keyword: /\b(const|let|var|function|return|if|else|for|while)\b/,
    string: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/,
    number: /\b\d+(\.\d+)?\b/,
    comment: /\/\/.*/,
    operator: /[+\-*/=<>!&|]/,
};

const codeSnippet = `
const message = "Hello, world!"; // a simple string
function greet(name) {
  if (name) {
    return "Hello, " + name;
  } else {
    return message;
  }
}
`;

const jsTokens = highlight(codeSnippet, jsGrammar);
const highlightedCode = render(jsTokens);

// You would typically inject highlightedCode into a DOM element.
// console.log(highlightedCode);