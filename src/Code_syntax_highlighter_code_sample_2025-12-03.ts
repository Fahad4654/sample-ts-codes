interface SyntaxHighlightOptions {
  keywords: string[];
  strings: string[];
  numbers: string[];
  comments: string[];
  types: string[];
}

class SyntaxHighlighter {
  constructor(private options: SyntaxHighlightOptions) {}

  highlight(code: string): string {
    let highlightedCode = code;

    this.options.keywords.forEach(keyword => {
      highlightedCode = highlightedCode.replace(new RegExp(`\\b${keyword}\\b`, 'g'), `<span class="keyword">${keyword}</span>`);
    });

    this.options.strings.forEach(string => {
      highlightedCode = highlightedCode.replace(new RegExp(`"${string}"`, 'g'), `<span class="string">"${string}"</span>`);
    });

    this.options.numbers.forEach(number => {
      highlightedCode = highlightedCode.replace(new RegExp(`\\b${number}\\b`, 'g'), `<span class="number">${number}</span>`);
    });

    this.options.comments.forEach(comment => {
        highlightedCode = highlightedCode.replace(new RegExp(`//${comment}`, 'g'), `<span class="comment">//${comment}</span>`);
    });

    this.options.types.forEach(type => {
      highlightedCode = highlightedCode.replace(new RegExp(`\\b${type}\\b`, 'g'), `<span class="type">${type}</span>`);
    });

    return highlightedCode;
  }
}

const options: SyntaxHighlightOptions = {
  keywords: ['function', 'let', 'const', 'return', 'if', 'else'],
  strings: ['Hello, world!', 'Example string'],
  numbers: ['123', '42', '3.14'],
  comments: ['This is a comment', 'Another comment'],
  types: ['number', 'string', 'boolean']
};

const highlighter = new SyntaxHighlighter(options);
const code = `
function greet(name: string): string {
  // This is a comment
  const message: string = "Hello, " + name + "!";
  let numberExample: number = 123;
  if (numberExample > 42) {
    return message;
  } else {
      return "Too small";
  }
}
`;

const highlightedCode = highlighter.highlight(code);
console.log(highlightedCode);