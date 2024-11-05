<template>
  <div id="globalLayout">
    <n-layout>
      <n-layout-header class="header"><GlobalHeader/></n-layout-header>
      <n-layout-content content-style="padding: 24px;" class="content">
        <RouterView />
      </n-layout-content>
      <n-layout-footer class="footer">footer</n-layout-footer>
    </n-layout>
    <n-layout></n-layout>
  </div>
</template>

<script setup>
import {NLayoutContent, NLayoutFooter, NLayoutHeader, NLayout} from 'naive-ui'
import GlobalHeader from './global/GlobalHeader.vue';
</script>

<style scoped>
#globalLayout{
  max-width: 1200px;
  margin: 0 auto;
}
.content{
  height: 100vh;

}
.footer{
  background-color: #efefef;
  text-align:center;
}
</style>
