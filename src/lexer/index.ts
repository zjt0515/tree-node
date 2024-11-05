const tokenize = (input: string) => {
  let currentIndex = 0;
  let tokens = [] as Token[];
  while (currentIndex < input.length) {
    const currentChar = input[currentIndex];
    // 判断空格
    if (isWhiteSpace(currentChar)) {
      currentIndex++;
      continue;
    }
    // 判断符号

    // 判断id

    // 判断number

    // 判断string
  }
}

/**
 * 是否为空格
 * @param char 
 * @returns 
 */
function isWhiteSpace(char){
  return /\s/.test(char);
}

/**
 * 是否是字母
 * @param char 
 * @returns 
 */
function isLetter(char){
  return /[a-zA-Z]/.test(char);
}

/**
 * 是否是数字
 * @param char 
 * @returns 
 */
function isDigit(char){
  return /[0-9]/.test(char);
}
