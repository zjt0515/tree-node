<template>
  <h2>二叉树</h2>
  <canvas id="cvs"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue';
/** @type {HTMLCanvasElement} */
let cvs
let ctx
onMounted(()=>{
  cvs = document.getElementById('cvs')
  if(cvs.getContext){
    ctx = cvs.getContext('2d')
  }
  init()
  const node = new Node(40, 40, 36, 32)
  node.draw()
})

function init(){
  const w = 300, h = 200
  cvs.width = w * devicePixelRatio  
  cvs.height = h * devicePixelRatio
  cvs.style.width = w + 'px';
  cvs.style.height = h + 'px';
}

class Node{
  constructor(startX, startY, r, text) {
    this.startX = startX;
    this.startY = startY;
    this.r = r;
    this.text = text;
  }

  draw(){
    /** @type {HTMLCanvasElement} */
    ctx.beginPath();
    ctx.arc(this.startX, this.startY, this.r, 0, 2*Math.PI)
    ctx.stroke();
    // 绘制文字
    ctx.font='1.4em sans-serif';
    
    ctx.fillText(this.text, this.startX, this.startY);
  }
}
</script>