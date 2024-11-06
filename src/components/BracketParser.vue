<template>
  <div class="bracketParser">
    <h2>请输入C语言代码</h2>
    <n-input
      v-model:value="code"
      type="textarea"
    />
    <div class="buttons">
      <n-button type="primary" @click="check(brackets)">检查括号</n-button>
      <n-button type="primary" @click="token(code)">词法分析</n-button>
    </div>
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
import { NInput, NButton, useMessage, NDataTable } from "naive-ui";
import { computed, ref } from "vue";
import { tokenize, isValidBrackets, getBracketsFromTokens } from '@/js/lexer.js'
const message = useMessage();
const code = ref("");
const tokens = ref([])
const brackets = computed(()=>{
  return getBracketsFromTokens(tokens.value)
})
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

const check = (s) => {
  if (isValidBrackets(s)) message.success("括号匹配正确");
  else message.error("匹配失败");
};

const token = () => {
  tokens.value = tokenize(code.value);
}


</script>

<style scoped>
.buttons{
  margin-top: 1.2em;
}
</style>