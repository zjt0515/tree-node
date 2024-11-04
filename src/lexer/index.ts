const tokenize = (input: string) => {
  let currentIndex = 0;
  let tokens = [] as Token[];
  while (currentIndex < input.length) {
    const currentChar = input[currentIndex];
    // 判断空格
    const spaceReg = /\s/;
    if (spaceReg.test(currentChar)) {
      currentIndex++;
      continue;
    }
    // 判断符号

    // 判断id

    // 判断number

    // 判断string
  }
}
