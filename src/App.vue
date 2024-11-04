<template>
  <tree-node />
  <n-message-provider>
    <bracket-parser />
  </n-message-provider>
  <RegexTest/>
</template>

<script setup>
import {NMessageProvider} from 'naive-ui'
import TreeNode from "./components/TreeNode.vue";
import BracketParser from "./components/BracketParser.vue";
import RegexTest from "./components/RegexTest.vue";
</script>

<style scoped></style>
