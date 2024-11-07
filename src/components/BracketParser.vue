<template>
  <div class="bracketParser">
    //TODO整理页面
    <n-space>
      <h2>请输入C语言代码</h2>
    </n-space>
    <n-input v-model:value="code" type="textarea" :autosize="{
      minRows: 3,
    }" />
    <n-button class="tokenize-button" type="primary" @click="getTokens(code)">词法分析</n-button>
    <n-card title="括号配对分析器">
      <br />
      {{ "多余的括号: " + removedBrackets }}
      <n-button v-if="removedBrackets.length" type="error" @click="delete">删除多余的括号</n-button>
      <h4>查询匹配的括号</h4>
      匹配括号：{{ matchBrackets }} 输入括号位置： 对应的括号位置：{{
        bracketIndex2
      }}
      <n-list>
        <!-- <template #header> hhh </template> -->
        <n-list-item>
          <template #prefix>
            <n-button type="primary" @click="checkBrackets">是否匹配</n-button>
            <n-tag type="error"> 成功 </n-tag>
          </template>
          <n-thing title="括号序列" title-extra="extra" description="description">
            {{ "括号序列：" + bracketList }}
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="多余括号" title-extra="extra" description="选择删除多余括号" />
        </n-list-item>
        <n-list-item>
          <n-thing title="查找匹配的括号" title-extra="extra" description="输入括号在源代码中的位置，返回对应括号的位置" />
          <n-input-number v-model:value="bracketIndex1" />
        </n-list-item>
      </n-list>
    </n-card>
    <!-- Tokens表格 -->
    <n-space vertical :size="12">
      <!-- 查询 -->
      <n-space>
        <n-dropdown trigger="hover" :options="typeOptions" @select="handleSelect">
          <n-button>类型</n-button>
        </n-dropdown>
        <n-button @click="unfilter">
          清除过滤
        </n-button>
      </n-space>
      <n-space class="tags">
        <n-tag v-for="tag in tags" closable @close="handleClose(tag)">
          {{ tag }}
        </n-tag>
      </n-space>
      <!-- 表格本体 -->
      // TODO 新增自定义列，用于匹配算法
      <n-data-table ref="tableRef" :columns="columns" :data="tokens" :bordered="false" :row-class-name="rowClassName"
        :pagination="paginationReactive" @update:filters="handleUpdateFilter" />
    </n-space>
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
  NDropdown
} from "naive-ui";
import { computed, reactive, ref } from "vue";
import {
  tokenize,
  isValid2,
  isValidBrackets,
  isValid,
  getBracketTokens,
  bracketTokensToList
} from "@/js/lexer.js";
import { TokenType } from "@/js/index.js"
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
const bracketTokens = computed(() => {
  return getBracketTokens(tokens.value);
});
const bracketList = computed(() => {
  return bracketTokensToList(bracketTokens.value)
})
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
const checkBrackets = () => {
  // 先进行一遍词法分析
  if (getTokens()) {
    if (isValid(bracketList.value)) message.success("括号匹配正确");
    else message.error("匹配失败");
    removedBrackets.value = [];
    matchBrackets.value = [];
    isValidBrackets(bracketTokens.value, removedBrackets.value, matchBrackets.value);
  }
};

//表格相关
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  onChange: (page) => {
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  }
});
const columns = [
  {
    title: "TokenType",
    key: "type",
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
const typeOptions = Object.values(TokenType).map(x => ({ label: x, key: x }))
const tags = ref([])
const handleSelect = (key) => {
  tags.value.push(key)
  filterTokenType()
}
const handleClose = (tag) => {
  tags.value.splice(tag, 1)
}
const tableRef = ref(null)
const filterTokenType = () => {
  tableRef.value.filter({
    type: tags.value
  })
}
const unfilter = () => {
  tableRef.value.filter(null)
}
</script>

<style scoped>
.tokenize-button {
  float: right;
  margin: 1.2em 1em;
}
</style>
