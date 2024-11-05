<template>
    <h2>B22040515张进涛</h2>
    <n-menu :options="menuOptions" mode="horizontal" />
  
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { NMenu,NSpace } from 'naive-ui';
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/'
          }
        },
        { default: () => '回家' }
      ),
    key: 'go-back-home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/bracket-pairing'
          }
        },
        { default: () => '括号配对' }
      ),
    key: 'bracketPairing',
  }
]

</script>