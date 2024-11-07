<template>
  <h2>二叉树</h2>
  <!-- {{"data:"+ data }}
  {{"root:"+ root }} -->

  <n-grid :x-gap="16" :y-gap="12" :cols="2">
    <n-grid-item>
      <n-input v-model:value="data" type="text" placeholder="输入二叉树数组形式(空节点输入null)">
      </n-input>
    </n-grid-item>
    <n-grid-item>
      <n-button type="primary" ghost @click="draw">可视化二叉树</n-button>
    </n-grid-item>
    <n-grid-item>
      <n-input-number v-model:value="x" placeholder="请输入">
        <template #prefix>
          查询值为
        </template>
      </n-input-number>
    </n-grid-item>
    <n-grid-item>
      <n-button type="primary" ghost @click="searchAncestors">查询所有祖先节点</n-button>
    </n-grid-item>
  </n-grid>
  <n-card embedded title="查询结果">
    祖先：{{ ancestors }}

  </n-card>
  <canvas id="cvs"></canvas>

  <n-card title="测试数据">
    {{ ancestors }}
    nodeData: {{ nodeData }}
  </n-card>
</template>

<script setup>
import { NInput, NButton, NInputNumber, NSpace, NCard, useMessage, NInputGroup, NGrid, NGridItem } from 'naive-ui';
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { arrayToTree, findAncestors } from '@/js/treenode.js'
const message = useMessage()
/** @type {HTMLCanvasElement} */
let cvs
let ctx
const data = ref("[3,5,9,4,6,2,4,6,8,2]")
const nodeData = reactive({ root: null })
const ancestors = ref([])
const x = ref()
const searchAncestors = () => {
  draw()
  ancestors.value = []
  if (findAncestors(nodeData.root, x.value, ancestors.value)) {
    message.success('查询成功')
    draw()
  } else {
    message.error(`未找到值为${x.value}的结点`)
  }
}

const isValid = (data) => {
  try {
    // 尝试解析输入的字符串为数组
    const parsedArray = JSON.parse(data);
    // 检查输入的是否为数组，且数组中的每一项为数字
    if (
      Array.isArray(parsedArray) &&
      parsedArray.every((item) => typeof item === "number" || !item)
    ) {
      return true;
    } else {
      message.error("请输入一个包含数字的有效数组！")
      return false;
    }
  } catch (e) {
    message.error("输入格式错误！请使用有效的数组格式。")
    return false;
  }
}
onMounted(() => {
  cvs = document.getElementById('cvs')
  if (cvs.getContext) {
    ctx = cvs.getContext('2d')
  }
  init()
  // drawNode(ctx, root.value, 400, 50, 150, 50)
})

function init() {
  ctx.clearRect(0, 0, 1000, 600); // 清除画布

  // 设置绘制样式
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.lineWidth = 2;
  const w = 1000, h = 600
  cvs.width = w * devicePixelRatio
  cvs.height = h * devicePixelRatio
  cvs.style.width = w + 'px';
  cvs.style.height = h + 'px';
}
/**
 * 绘制二叉树
 */
function draw() {
  if (isValid(data.value)) {
    ctx.clearRect(0, 0, 1000, 600); // 清除画布
    nodeData.root = arrayToTree(JSON.parse(data.value));
    drawNode(ctx, nodeData.root, 400, 50, 150, 50)
  }
}
function drawNode(ctx, node, x, y, offsetX, offsetY) {
  if (!node) return;

  // 绘制当前节点的圆
  ctx.fillStyle = "#18a058"
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
  // 绘制value
  if (node?.highlight) {
    console.log("存在")
    ctx.fillStyle = "#777";
  }
  ctx.font = '1.4em sans-serif';
  ctx.fillStyle = "#fff";
  ctx.fillText(node.value, x - 7, y + 5);
  // 绘制左右子树
  if (node.left) {
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x - offsetX, y + offsetY);
    ctx.stroke();
    drawNode(ctx, node.left, x - offsetX, y + offsetY, offsetX / 2, offsetY);
  }

  if (node.right) {
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + offsetX, y + offsetY);
    ctx.stroke();
    drawNode(ctx, node.right, x + offsetX, y + offsetY, offsetX / 2, offsetY);
  }
}
</script>

<style scoped></style>