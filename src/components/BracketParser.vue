<template>
  <div class="bracketParser">
    <h2>请输入C语言代码</h2>
    <n-input
      v-model:value="code"
      type="textarea"
    />
    <n-button type="primary" @click="getTokens(code)">词法分析</n-button>
    <n-card title="括号配对分析器">
      {{ "括号序列：" + brackets }}
      <n-button type="primary" @click="check">检查括号</n-button>
      <n-button v-if="removedBrackets.length" type="primary" @click="check(brackets)">检查括号</n-button>
    </n-card>
    <n-data-table
    :columns="columns"
    :data="tokens"
    :bordered="false"
    :row-class-name="rowClassName"
  />
  {{ tokens }}
  {{ brackets }}
  </div>
</template>

<script setup>
import { NInput, NButton, useMessage, NDataTable, NCard } from "naive-ui";
import { computed, ref } from "vue";
import { tokenize, isValidBrackets, isValid, getBracketsFromTokens } from '@/js/lexer.js'
const message = useMessage();
const code = ref(`int main() {
    // 这是单行注释
    int a = 5;
    if(a == 5){
      return 6;
    }
    /* 这是
       多行
       注释 */
    return a;
}`);
const tokens = ref([])
const brackets = computed(()=>{
  return getBracketsFromTokens(tokens.value)
})
const removedBrackets = ref([])
const getTokens = () => {
  try{
    tokens.value = tokenize(code.value);
    message.success("解析成功")
  }catch(e){
    message.success("程序错误")
  }
}
const check = () => {
  getTokens(code)
  if (isValid(brackets.value)) message.success("括号匹配正确");
  else message.error("匹配失败");
};


const columns = [
  {
    title: "TokenType",
    key: "type",
    className: "type",
  }, 
  {
    title: "Value",
    key: "value"
  }
]
const rowClassName = (row)=>{
  if (row.type === 'identifier') {
    return 'too-old'
  }
  return ''
}
</script>

<style scoped>
.buttons{
  margin-top: 1.2em;
}
</style>