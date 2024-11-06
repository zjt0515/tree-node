<template>
<div id="bracketPairingPage">
  <n-message-provider>
    <bracket-parser />
  </n-message-provider>
</div>
</template>
<script setup>
import { NMessageProvider } from 'naive-ui';
import BracketParser from '@/components/BracketParser.vue';
</script>
<style scoped>
</style>