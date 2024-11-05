<template>
<div id="bracketPairingPage">
  <n-message-provider>
    <bracket-parser />
  </n-message-provider>
</div>
</template>
<script setup lang="ts">
import { NMessageProvider } from 'naive-ui';
import BracketParser from '@/components/BracketParser.vue';
</script>
<style scoped>
</style>