<template>
  <h2>二叉树</h2>
  <!-- {{"data:"+ data }}
  {{"root:"+ root }} -->
  <n-button type="primary" @click="draw">可视化二叉树</n-button>
  <n-input v-model:value="data" type="text" placeholder="请输入二叉树（数组表示）" />
  <n-space align="center" class="search">
    查询值为<n-input-number v-model:value="x" placeholder="" clearable />的所有祖先结点
  <n-button type="primary" @click="searchAncestors">查询</n-button>
  <n-card title="查询结果">
    {{ ancestors }}  
  </n-card>
  </n-space>
  
  <canvas id="cvs"></canvas>
</template>

<script setup>
import { NInput, NButton, NInputNumber,NSpace, NCard, useMessage} from 'naive-ui';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { arrayToTree,findAncestors  } from '@/js/treenode.js'
const message = useMessage()
/** @type {HTMLCanvasElement} */
let cvs
let ctx
const data = ref("[3,5,9,4,6,2,4,6,8,2]")
const root = ref()
const ancestors = ref([])
const x = ref()
const searchAncestors = () => {
  ancestors.value = []
  if(findAncestors(root.value, x.value, ancestors.value)){
    message.success('查询成功')
    draw()
  } else {
    message.error(`未找到在值为${x.value}的结点`)
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
onMounted(()=>{
  cvs = document.getElementById('cvs')
  if(cvs.getContext){
    ctx = cvs.getContext('2d')
  }
  init()
  // drawNode(ctx, root.value, 400, 50, 150, 50)
})

// watchEffect(()=>{
  // cvs = document.getElementById('cvs')
  // if(cvs.getContext){
  //   ctx = cvs.getContext('2d')
  // }
  // init()
//   const root = arrayToTree(data.value);
//   drawNode(ctx, root, 400, 50, 150, 50)
// })
function init(){
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
function draw(){
  if(isValid(data.value)){
    ctx.clearRect(0, 0, 1000, 600); // 清除画布
    root.value = arrayToTree(JSON.parse(data.value));
    drawNode(ctx, root.value, 400, 50, 150, 50)
  }
}
function drawNode(ctx, node, x, y, offsetX, offsetY) {
  if (!node) return;

  // 绘制当前节点的圆
  ctx.fillStyle = "#000"
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
  // 绘制value
  ctx.font='1.4em sans-serif';
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

<style scoped>
.search{
  margin-top: 1.2em;
}
.n-card {
  max-width: 600px;
}
</style>