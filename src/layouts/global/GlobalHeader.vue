<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
</template>

<script lang="ts">
import type { Component } from "vue";
import { defineComponent, h } from "vue";
import { NIcon, useMessage } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "回家" }
      ),
    key: "go-back-home",
  },
  {
    key: "divider-1",
    type: "divider",
    props: {
      style: {
        marginLeft: "32px",
      },
    },
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F",
          target: "_blank",
          rel: "noopenner noreferrer",
        },
        "且听风吟"
      ),
    key: "hear-the-wind-sing",
  },
  {
    label: "C语言括号配对",
    key: "pinball-1973",
  },
  {
    label: "二叉树寻找祖先",
    key: "a-wild-sheep-chase",
  },
];

export default defineComponent({
  setup() {
    const message = useMessage();
    return {
      menuOptions,
      handleUpdateValue(key: string, item: MenuOption) {
        message.info(`[onUpdate:value]: ${JSON.stringify(key)}`);
        message.info(`[onUpdate:value]: ${JSON.stringify(item)}`);
      },
    };
  },
});
</script>
