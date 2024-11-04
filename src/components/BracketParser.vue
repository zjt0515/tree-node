<template>
  <div class="bracketParser">
    <h2>请输入C语言代码</h2>
    <n-input
      v-model:value="value"
      type="textarea"
      placeholder="基本的 Textarea"
    />
      <n-button @click="check(value)">检查括号</n-button>

    {{ value }}
  </div>
</template>

<script setup>
import Stack from "@/js/index.js";
import { NInput, NButton, useMessage } from "naive-ui";
import { computed, ref } from "vue";
const message = useMessage();
const value = ref("");
const brackets =()=>{}
const check = (s) => {
  if (isValid(s)) message.success("括号匹配正确");
  else message.error("匹配失败");
};

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
