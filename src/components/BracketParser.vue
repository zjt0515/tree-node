<template>
  <div class="bracketParser">
    <h2>请输入C语言代码</h2>
    <n-input
      v-model:value="code"
      type="textarea"
    />
      <n-button @click="check(value)">检查括号</n-button>
      <n-button @click="token(value)">词法分析</n-button>

    {{ value }}

    <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
    :row-key="tokens"
  />
  </div>
</template>

<script setup>
import Stack from "@/js/index.js";
import { NInput, NButton, useMessage, NDataTable } from "naive-ui";
import { computed, ref } from "vue";
import { tokenize } from '@/js/lexer.js'
const message = useMessage();
const code = ref("");
const brackets =()=>{}
const check = (s) => {
  if (isValid(s)) message.success("括号匹配正确");
  else message.error("匹配失败");
};
const tokens = ref([])
const data =computed(()=>{
  return tokens.value.map((item,index) => {return {...item, key: `${index}`}})
})
const token = () => {
  tokens.value = tokenize(code.value);
}

const isValid = (s) => {
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
</script>
