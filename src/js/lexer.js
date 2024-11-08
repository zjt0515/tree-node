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
      tokens.push(new Token(TokenType.COMMENT, value, start));
      continue;
    }
    // 解析多行comment
    if (currentChar === "/" && input[currentIndex + 1] === "*") {
      let start = currentIndex;
      let comment = "/*";
      currentIndex += 2;
      while (
        currentIndex < input.length &&
        !(input[currentIndex] === "*" && input[currentIndex + 1] === "/")
      ) {
        comment += input[currentIndex++];
      }
      comment += "*/";
      tokens.push(new Token(TokenType.COMMENT, comment,start));
      continue;
    }
    //解析标点符号
    if (punctuators.includes(currentChar)) {
      tokens.push(new Token(TokenType.PUNCTUATOR, currentChar, currentIndex));
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
        tokens.push(new Token(TokenType.KEYWORD, value, start));
      } else {
        tokens.push(new Token(TokenType.IDENTIFIER, value, start));
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
      tokens.push(new Token(TokenType.NUMBER, value, start));
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
      tokens.push(new Token(TokenType.STRING, value, start));
      continue;
    }
    // 不支持类型
    throw new TypeError("unknown character is: " + currentChar);
  }
  return tokens;
};

/**
 * 从tokens中提取括号tokens
 * @param {*} tokens
 * @returns bracketTokens
 */
const getBracketTokens = (tokens) => {
  return tokens.filter((token) => token.type === TokenType.BRACKET);
};
/**
 * bracketTokens => brackets
 * @param {*} tokens 
 * @returns 
 */
const bracketTokensToList = (tokens) => {
  return tokens.map((item) => item.value);
};

/**
 * 判断括号是否匹配
 * @param {*} s 括号数组
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
      stack.push(token);
      continue;
    }
    // 遇到右括号就弹出元素，并检查弹出的元素是否为对应的左括号
    if(stack.isEmpty()){
      removed.push(token)
    } else {
      const leftBracketToken = stack.pop();

      if (map[leftBracketToken.value] !== token.value) {
        removed.push(leftBracketToken);
        removed.push(token);
      } else {
        match.push({left:leftBracketToken, right:token});
      }
    }
  }
  while (stack.size()) {
    const leftBracketToken = stack.pop();
    removed.push(leftBracketToken);
  }
};
/**
 * 删除多余括号
 * @param {string} s 
 * @returns 
 */
const removeInvalid = (s) => {
  const ans = [];
  let currSet = new Set();

  currSet.add(s);
  while (true) {
      for (const str of currSet) {
          if (isValid(str)) {
              ans.push(str);
          }
      }
      if (ans.length > 0) {
          return ans;
      }
      const nextSet = new Set();
      for (const str of currSet) {
          for (let i = 0; i < str.length; i ++) {
              if (i > 0 && str[i] === str[i - 1]) {
                  continue;
              }
              if (str[i] === '(' || str[i] === ')') {
                  nextSet.add(str.substring(0, i) + str.substring(i + 1));
              }
          }
      }
      currSet = nextSet;
  }
}

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
  isValid,
  isValid2,
  bracketTokensToList,
};
