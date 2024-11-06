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
  const node = new Node(40, 40, 24, 3)
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
  constructor(x, y, r, value) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.value = value;
  }

  draw(){
    /** @type {HTMLCanvasElement} */
    // 绘制圆
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
    ctx.stroke();
    // 绘制value
    ctx.font='1.4em sans-serif';
    ctx.fillText(this.value, this.x - this.r / 4, this.y + this.r / 4);
    // 绘制线
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.r);
    ctx.lineTo( )
  }
}
</script>