<template>
  <n-menu
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
    responsive
  />
</template>
<script setup>
const menuOptions = [
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
    label: "Parser",
    key: "pinball-1973",
  },
];
</script>
