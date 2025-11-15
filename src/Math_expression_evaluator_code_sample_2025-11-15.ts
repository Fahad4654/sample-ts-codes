type Operator = '+' | '-' | '*' | '/';

interface ExpressionNode {
  type: 'number' | 'operator';
  value: number | Operator;
  left?: ExpressionNode;
  right?: ExpressionNode;
}

function evaluate(expression: string): number {
  function tokenize(str: string): (number | Operator)[] {
    const tokens: (number | Operator)[] = [];
    let currentNumber = '';
    for (const char of str.replace(/\s/g, '')) {
      if (/[0-9.]/.test(char)) {
        currentNumber += char;
      } else if (['+', '-', '*', '/'].includes(char)) {
        if (currentNumber) {
          tokens.push(parseFloat(currentNumber));
          currentNumber = '';
        }
        tokens.push(char as Operator);
      }
    }
    if (currentNumber) {
      tokens.push(parseFloat(currentNumber));
    }
    return tokens;
  }

  function buildAST(tokens: (number | Operator)[]): ExpressionNode {
    let currentIndex = 0;

    function parseTerm(): ExpressionNode {
      let node = parseFactor();

      while (currentIndex < tokens.length && (tokens[currentIndex] === '+' || tokens[currentIndex] === '-')) {
        const operator = tokens[currentIndex] as Operator;
        currentIndex++;
        const right = parseFactor();
        node = { type: 'operator', value: operator, left: node, right: right };
      }

      return node;
    }

    function parseFactor(): ExpressionNode {
      let node = parseAtom();

      while (currentIndex < tokens.length && (tokens[currentIndex] === '*' || tokens[currentIndex] === '/')) {
        const operator = tokens[currentIndex] as Operator;
        currentIndex++;
        const right = parseAtom();
        node = { type: 'operator', value: operator, left: node, right: right };
      }

      return node;
    }

    function parseAtom(): ExpressionNode {
      const token = tokens[currentIndex];
      currentIndex++;

      if (typeof token === 'number') {
        return { type: 'number', value: token };
      }

      throw new Error("Invalid expression");
    }

    return parseTerm();
  }

  function evalAST(node: ExpressionNode): number {
    if (node.type === 'number') {
      return node.value as number;
    } else {
      const leftValue = evalAST(node.left!);
      const rightValue = evalAST(node.right!);
      const operator = node.value as Operator;

      switch (operator) {
        case '+': return leftValue + rightValue;
        case '-': return leftValue - rightValue;
        case '*': return leftValue * rightValue;
        case '/':
          if (rightValue === 0) {
            throw new Error("Division by zero");
          }
          return leftValue / rightValue;
        default: throw new Error("Invalid operator");
      }
    }
  }


  const tokens = tokenize(expression);
  const ast = buildAST(tokens);
  return evalAST(ast);
}

// Example usage:
// console.log(evaluate("2 + 3 * 4"));
// console.log(evaluate("10 / 2 - 1"));