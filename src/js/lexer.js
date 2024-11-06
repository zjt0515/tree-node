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
  Stack
} from "./index.js";

const tokenize = (input) => {
  let currentIndex = 0;
  let tokens = [];
  while (currentIndex < input.length) {
    let currentChar = input[currentIndex];
    // 判断空白符
    if (isWhiteSpace(currentChar)) {
      currentIndex++;
      continue;
    }
    // 判断comment
    if (currentChar === '/'){
      let start = currentIndex;
      currentChar = input[++currentIndex];
      // 匹配单行注释
      if(currentChar === '/'){
        while(!/\n/.test(currentChar)){
          currentChar = input[++currentIndex];
        }
        let value = input.slice(start, currentIndex);
        tokens.push(new Token(TokenType.COMMENT, value));
        continue;
      }
    }
    // 判断标点符号
    if (punctuators.includes(currentChar)){
      tokens.push(new Token(TokenType.PUNCTUATOR, currentChar));
      currentIndex++;
      continue;
    }
    // 判断括号
    if (isBracket(currentChar)){
      tokens.push(new Token(TokenType.BRACKET, currentChar));
      currentIndex++;
      continue;
    }
    // 判断标识符(或者关键字)
    if (isLetter(currentChar) || currentChar === "_") {
      let start = currentIndex;
      do{
        ++currentIndex;
        if(currentIndex >= input.length){
          break;
        } else{
          currentChar = input[currentIndex];
        }
      }while(isLetter(currentChar) || currentChar === "_" || isDigit(currentChar))
      
      let value = input.slice(start, currentIndex);
      if (keywords.includes(value)) {
        tokens.push(new Token(TokenType.KEYWORD, value));
      } else {
        tokens.push(new Token(TokenType.IDENTIFIER, value));
      }
      continue;
    }
    // 判断number
    if(isDigit(currentChar)){
      let start = currentIndex++;
      while(isDigit(input[currentIndex])) currentIndex++;
      let value = input.slice(start, currentIndex);
      tokens.push(new Token(TokenType.NUMBER, value));
      continue;
    }
    // 判断"string"
    if(currentChar === '"'){
      let start = currentIndex++;
      while(currentChar !== '"'){
        currentChar = input[++currentIndex]
      }
      let value = input.slice(start, currentIndex);
      tokens.push(new Token(TokenType.STRING, value));
      continue;
    }
    // 不支持类型
    throw new TypeError('unknown character is: ' + currentChar);
  }
  return tokens;
};
const input1 = `
  // this is comment({})
  int main(){
    if(r){
      int result "string2";
    }
    return 0;
  }
`
const input2 = `23414`
console.log(tokenize(input2))
/**
 * 从tokens中提取括号
 * @param {*} tokens 
 * @returns 包含括号的字符串
 */
const getBracketsFromTokens = (tokens)=>{
  return tokens.filter(token => token.type === TokenType.BRACKET).map(token => token.value)
}
/**
 * 判断括号是否匹配
 * @param {*} s 
 * @returns 
 */
const isValidBrackets = (s) => {
  const stack = new Stack();
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  for (const x of s) {
    if (x in map) {
      stack.push(x);
      continue;
    }
    if (map[stack.pop()] !== x) return false;
  }
  return !stack.size();
};

export { tokenize, getBracketsFromTokens, isValidBrackets }