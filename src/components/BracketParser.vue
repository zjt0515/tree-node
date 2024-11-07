<template>
  <div class="bracketParser">
    <n-space>
      <h2>请输入C语言代码</h2>
      <n-button type="primary" @click="getTokens(code)">词法分析</n-button>
    </n-space>
    <n-input
      v-model:value="code"
      type="textarea"
      :autosize="{
        minRows: 3,
      }"
    />
    <n-card title="括号配对分析器">
      <br />
      {{ "多余的括号: " + removedBrackets }}
      <n-button v-if="removedBrackets.length" type="error" @click="delete"
        >删除多余的括号</n-button
      >
      <h4>查询匹配的括号</h4>
      匹配括号：{{ matchBrackets }} 输入括号位置： 对应的括号位置：{{
        bracketIndex2
      }}
      <n-list>
        <!-- <template #header> hhh </template> -->
        <n-list-item>
          <template #prefix>
            <n-button type="primary" @click="check">是否匹配</n-button>
            <n-tag type="error"> 成功 </n-tag>
          </template>
          <n-thing
            title="括号序列"
            title-extra="extra"
            description="description"
          >
            {{ "括号序列：" + brackets }}
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing
            title="多余括号"
            title-extra="extra"
            description="选择删除多余括号"
          />
        </n-list-item>
        <n-list-item>
          <n-thing
            title="查找匹配的括号"
            title-extra="extra"
            description="输入括号在源代码中的位置，返回对应括号的位置"
          />
          <n-input-number v-model:value="bracketIndex1" />
        </n-list-item>
      </n-list>
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
import {
  NInput,
  NButton,
  useMessage,
  NDataTable,
  NCard,
  NSpace,
  NInputNumber,
  NList,
  NListItem,
  NThing,
  NTag,
} from "naive-ui";
import { computed, reactive, ref } from "vue";
import {
  tokenize,
  isValidBrackets,
  isValid,
  getBracketsFromTokens,
} from "@/js/lexer.js";
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
const tokens = ref([]);
const brackets = computed(() => {
  return getBracketsFromTokens(tokens.value);
});
const removedBrackets = ref([]);
const matchBrackets = ref([]);
const bracketIndex1 = ref();
const bracketIndex2 = computed(() => {
  return matchBrackets.value.filter(
    (match) =>
      match.leftIndex === bracketIndex1 || match.rightIndex === bracketIndex1
  );
});
const getTokens = () => {
  try {
    tokens.value = tokenize(code.value);
    message.success("解析成功");
    return true;
  } catch (e) {
    message.error("程序错误");
    return false;
  }
};
/**
 * 检查括号匹配
 */
const check = () => {
  // 先进行一遍词法分析
  if (getTokens()) {
    if (isValid(brackets.value)) message.success("括号匹配正确");
    else message.error("匹配失败");
    removedBrackets.value = [];
    matchBrackets.value = [];
    isValidBrackets(brackets.value, removedBrackets.value, matchBrackets.value);
  }
};

const columns = [
  {
    title: "TokenType",
    key: "type",
    className: "type",
  },
  {
    title: "Value",
    key: "value",
  },
  {
    title: "Index",
    key: "index",
  },
];
const rowClassName = (row) => {
  if (row.type === "identifier") {
    return "too-old";
  }
  return "";
};
</script>

<style scoped>
.buttons {
  margin-top: 1.2em;
}
</style>
