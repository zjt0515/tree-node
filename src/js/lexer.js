import { index } from "d3";
import {
  isBracket,
  isDigit,
  isLetter,
  isWhiteSpace,
  keywords,
  operators,
  punctuators,
  Token,
  TokenType,
  Stack,
} from "./index.js";
import { renderList } from "vue";

const tokenize = (input) => {
  let currentIndex = 0;
  let tokens = [];
  while (currentIndex < input.length) {
    let currentChar = input[currentIndex];
    // 解析空白符
    if (isWhiteSpace(currentChar)) {
      currentIndex++;
      continue;
    }
    // 解析单行comment
    if (currentChar === "/" && input[currentIndex + 1] === "/") {
      let start = currentIndex;
      currentChar = input[++currentIndex];
      while (!/\n/.test(currentChar)) {
        currentChar = input[++currentIndex];
      }
      let value = input.slice(start, currentIndex);
      tokens.push(new Token(TokenType.COMMENT, value));
      continue;
    }
    // 解析多行comment
    if (currentChar === "/" && input[currentIndex + 1] === "*") {
      let comment = "/*";
      currentIndex += 2;
      while (
        currentIndex < input.length &&
        !(input[currentIndex] === "*" && input[currentIndex + 1] === "/")
      ) {
        comment += input[currentIndex++];
      }
      comment += "*/";
      tokens.push(new Token(TokenType.COMMENT, comment));
      continue;
    }
    //解析标点符号
    if (punctuators.includes(currentChar)) {
      tokens.push(new Token(TokenType.PUNCTUATOR, currentChar));
      currentIndex++;
      continue;
    }
    // 解析括号
    if (isBracket(currentChar)) {
      tokens.push(new Token(TokenType.BRACKET, currentChar, currentIndex));
      currentIndex++;
      continue;
    }
    // 解析标识符(或者关键字)
    if (isLetter(currentChar) || currentChar === "_") {
      let start = currentIndex;
      do {
        ++currentIndex;
        if (currentIndex >= input.length) {
          break;
        } else {
          currentChar = input[currentIndex];
        }
      } while (
        isLetter(currentChar) ||
        currentChar === "_" ||
        isDigit(currentChar)
      );

      let value = input.slice(start, currentIndex);
      if (keywords.includes(value)) {
        tokens.push(new Token(TokenType.KEYWORD, value));
      } else {
        tokens.push(new Token(TokenType.IDENTIFIER, value));
      }
      continue;
    }
    // 解析运算符
    if (operators.includes(currentChar)) {
      currentIndex++;
      continue;
    }
    // 判断number
    if (isDigit(currentChar)) {
      let start = currentIndex++;
      while (isDigit(input[currentIndex])) currentIndex++;
      let value = input.slice(start, currentIndex);
      tokens.push(new Token(TokenType.NUMBER, value));
      continue;
    }
    // 解析"string"
    if (currentChar === '"') {
      let start = currentIndex++;
      while (currentIndex < input.length && input[currentIndex] !== '"') {
        currentIndex++;
      }
      currentIndex += 1;
      let value = input.slice(start, currentIndex);
      tokens.push(new Token(TokenType.STRING, value));
      continue;
    }
    // 不支持类型
    throw new TypeError("unknown character is: " + currentChar);
  }
  return tokens;
};

/**
 * 从tokens中提取括号
 * @param {*} tokens
 * @returns 包含括号的字符串
 */
const getBracketTokens = (tokens) => {
  return tokens.filter((token) => token.type === TokenType.BRACKET);
};
const bracketTokensToList = (tokens) => {
  return tokens.map((item) => item.value);
};
/**
 * 判断括号是否匹配
 * @param {*} s
 * @returns
 */
const isValidBrackets = (s, removed = [], match = []) => {
  const stack = new Stack();
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  for (let [index, x] of s.entries()) {
    // 遇到左括号入栈
    if (x in map) {
      stack.push(x);
      continue;
    }
    // 遇到右括号
    if (!stack.isEmpty()) {
      // 左括号存在，弹出左括号检查是否匹配
      const leftIndex = stack.size();
      const leftBracket = stack.pop();
      if (map[leftBracket] !== x) {
        // 删去不匹配的括号
        removed.push({ index: leftIndex, value: leftBracket });
        removed.push({ index, value: x });
      } else {
        // 匹配成功
        match.push({ leftIndex, rightIndex: index });
      }
    } else {
      // 左括号不存在，选择：删去右括号
      removed.push({ index, value: x });
    }
  }
  // 多余的左括号
  while (stack.size()) {
    const leftIndex = stack.size();
    let x = stack.pop();
    removed.push({ index: leftIndex, value: x });
  }
};

/**
 * 判断括号是否匹配
 * @param {*} s
 * @returns
 */
const isValid = (s) => {
  const stack = new Stack();
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  for (let [index, x] of s.entries()) {
    // 遇到左括号入栈
    if (x in map) {
      stack.push(x);
      continue;
    }
    // 遇到右括号就弹出元素，并检查弹出的元素是否为对应的左括号
    // TODO是否有问题？对于多余的右括号
    if (map[stack.pop()] !== x) return false;
  }
  return !stack.size();
};
/**
 * 判断括号是否匹配
 * @param {*} bracketTokens
 * @returns
 */
const isValid2 = (bracketTokens, removed = [], match = []) => {
  const stack = new Stack();
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  for (let [index, token] of bracketTokens.entries()) {
    // 遇到左括号入栈
    if (token.value in map) {
      stack.push(x);
      continue;
    }
    // 遇到右括号就弹出元素，并检查弹出的元素是否为对应的左括号

    const leftBracketToken = stack.pop();
    if (map[leftBracketToken.value] !== token.value) {
      removed.push(leftBracketToken);
      removed.push(token);
    } else {
      match.push(leftBracketToken);
      match.push(token);
    }
  }
  while (stack.size()) {
    const leftBracketToken = stack.pop();
    removed.push(leftBracketToken);
  }
};
// 测试代码
const input1 = `
  // this is comment({})
  int main(){
    if(r){
      int result "string2";
    }
    return 0;
  }
`;
const input2 = `23414`;
console.log(tokenize(input2));

export {
  tokenize,
  getBracketTokens,
  isValidBrackets,
  isValid,
  isValid2,
  bracketTokensToList,
};
