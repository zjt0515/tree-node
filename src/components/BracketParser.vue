<template>
  <div class="bracketParser">
    <!--TODO整理页面 -->
    <n-space>
      <h2>请输入C语言代码</h2>
    </n-space>
    <n-input id="codeInput" v-model:value="code" type="textarea" :autosize="{
      minRows: 3,
    }" show-count ref="inputBox" />
    <n-button class="tokenize-button" type="primary" @click="getTokens(code)">词法分析</n-button>

    <!-- Tokens表格 -->
    <n-space vertical :size="12">
      <!-- 查询 -->
      <!-- <n-space>
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
      </n-space> -->
      <!-- 表格本体 -->
      <!-- // TODO 新增自定义列，用于匹配算法 -->
      <n-data-table ref="tableRef" :columns="columns" :data="tokens" :bordered="false" :pagination="paginationReactive"
        @update:filters="handleUpdateFilter" />
    </n-space>
    <!-- 括号处理 -->
    <n-card title="括号配对分析器">
      <n-list>
        <!-- <template #header> hhh </template> -->
        <n-list-item>
          <template #suffix>
            <n-button type="primary" @click="checkBrackets">是否匹配</n-button>

          </template>
          <n-thing title="括号序列" title-extra="" description="">
            <n-space>
              <n-tag v-for="item in bracketList" :bordered="false">
                {{ item }}
              </n-tag>
            </n-space>
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="多余的括号" title-extra="" description="" />
          <n-space>
            <n-tag v-for="item in removedBrackets" :bordered="false">
              {{ item }}
            </n-tag>
          </n-space>
          <n-button v-if="removedBrackets.length" type="error" @click="deleteBracket">删除多余的括号</n-button>
        </n-list-item>
        <n-list-item>
          <n-thing title="匹配的括号" title-extra="" description="" />
          <div v-for="item in matchBracketTokens">
            {{ item.left }} 匹配 {{ item.right }}
          </div>
          <n-space>
            <n-input-number v-model:value="matchedIndex" placeholder="输入括号位置">
              <template #prefix>
                index:
              </template>
            </n-input-number>
            <n-button type="primary" ghost @click="match">查询</n-button>
            匹配结果:<n-tag v-if="matchedBracket">{{ matchedBracket }}</n-tag>
          </n-space>
        </n-list-item>
      </n-list>
    </n-card>

    <!-- 优化代码模态框 -->
    <n-modal v-model:show="showModal">
      <n-card style="width: 600px" title="选择正确代码" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <template #header-extra>
          噢！
        </template>
        <div v-for="(test, i) in newCode">
          <n-input v-model:value="newCode[i]" type="textarea" size="small" :autosize="{
            minRows: 3,
          }" :disabled="!active" round />
        </div>
        <template #footer>
          尾部
        </template>
      </n-card>
    </n-modal>
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
  NDropdown,
  NModal
} from "naive-ui";
import { computed, reactive, ref } from "vue";
import {
  tokenize,
  isValid2,
  isValid,
  getBracketTokens,
  bracketTokensToList
} from "@/js/lexer.js";
import { TokenType } from "@/js/index.js"
const showModal = ref(false)
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
const newCode = ref(["2", "3"])
const tokens = ref([]);
// 括号tokens数组
const bracketTokens = computed(() => {
  return getBracketTokens(tokens.value);
});
// 括号值数组
const bracketList = computed(() => {
  return bracketTokensToList(bracketTokens.value)
})
// 多余的？
const removedBrackets = ref([]);
// 匹配成功的
const matchBracketTokens = ref([]);
// 光标
// const cursorPosition = ref(0)
// function updateCursorPosition() {
//   const inputBox = $refs.inputBox; // 获取输入框的引用
//   cursorPosition.value = inputBox.selectionStart; // 获取光标的当前位置
// }
const matchedIndex = ref();
const matchedBracket = ref()
const match = () => {
  let isTrue
  matchBracketTokens.value.forEach((item) => {
    const leftIndex = item.left.index;
    const rightIndex = item.right.index;
    if (matchedIndex.value == leftIndex) {
      matchedBracket.value = item.right
      isTrue = true
    }
    if (matchedIndex.value == rightIndex) {
      matchedBracket.value = item.left
      isTrue = false
    }
  })
  if (isTrue) {
    message.success("查询成功")
  } else {
    message.error("不存在")
  }
}
/**
 * 词法分析
 */
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
    matchBracketTokens.value = [];
    isValid2(bracketTokens.value, removedBrackets.value, matchBracketTokens.value);
  }
};
const deleteBracket = () => {
  // let res = code.value
  removedBrackets.value.forEach((token) => {
    let index = token.index;
    const newCode = deletei(code, index)
    code.value = newCode
  })
  checkBrackets()
  // if ()
  //   newCode.value.push(res)
}
const deletei = (s, index) => {
  let res = s.value.slice(0, index) + code.value.slice(index + 1);
  return res;
}

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
const tokenTypeColumn = reactive({
  title: "TokenType",
  key: "type",
  filterMultiple: false,
  filterOptionValue: null,
  filterOptions: Object.values(TokenType).map((type) => ({ label: type, value: type })),
  filter(value, row) {
    return row.type === value;
  }
});
const columns = [
  // {
  //   title: "TokenType",
  //   key: "type",
  // },
  tokenTypeColumn,
  {
    title: "Value",
    key: "value",
  },
  {
    title: "Index",
    key: "index",
    sorter(rowA, rowB) {
      return rowA.index - rowB.index
    }
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
const handleUpdateFilter = (filters, sourceColumn) => {
  tokenTypeColumn.filterOptionValue = filters[sourceColumn.key]
}
</script>

<style scoped>
.tokenize-button {
  float: right;
  margin: 1.2em 1em;
}
</style>
