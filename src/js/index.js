class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    clear() {
        this.items = [];
    }
    top() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
}
// export {Stack}

function isBracket(char){
    return /[\(\)\[\]\{\}\<\>]/.test(char);
}

function isWhiteSpace(char){
    return /\s/.test(char);
}

function isLetter(char){
    return /[a-zA-Z]/.test(char);
}

function isDigit(char){
    return /[0-9]/.test(char);
}
// 定义TokenType枚举
const TokenType = Object.freeze({
    KEYWORD: 'keyword',
    IDENTIFIER: 'identifier',
    NUMBER: 'number',
    OPERATOR: 'operator',
    PUNCTUATOR: 'punctuator',
    STRING: 'string',
    COMMENT: 'comment',
    BRACKET: 'bracket'
});
// Token类表示每个词法单元
class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    toString() {
        return `Token(${this.type}, ${this.value})`;
    }
}
// 关键字定义
const keywords = ["int", "float", "long", "double", "char", "auto", "void", "signed", "unsigned",
    "return", "if", "else", "while", "for", "switch", "case","break","default", "goto"
]
// 分隔符定义
const punctuators = [",", ";", ":", "."];
// 运算符定义
const operators = ["+", "-", "*", "/", "%", "=", "=", ">", "<", "!", "&", "|"];

export {Token, isDigit, isLetter, isWhiteSpace, isBracket, keywords, punctuators, operators, TokenType, Stack}