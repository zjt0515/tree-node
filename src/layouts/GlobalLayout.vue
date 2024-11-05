<template>
  <div id="globalLayout">
    <n-layout>
      <n-layout-header><GlobalHeader/></n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <RouterView />
      </n-layout-content>
      <n-layout-footer>footer</n-layout-footer>
    </n-layout>
    <n-layout></n-layout>
  </div>
</template>

<script setup>
import GlobalHeader from './global/GlobalHeader.vue';
</script>
