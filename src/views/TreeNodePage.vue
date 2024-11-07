<template>
<div id="treeNodePage">
  <n-message-provider>
    <TreeNode/> 
  </n-message-provider>
</div>
</template>
<script setup>
import { NMessageProvider } from 'naive-ui';
import TreeNode from '@/components/TreeNode.vue';
</script>
<style scoped>
</style>