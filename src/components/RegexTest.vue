<template>
  <n-input v-model:value="modifier" type="text">
    <template #prefix> 修饰符 </template>
  </n-input>
  <n-input
    v-model:value="regex"
    type="textarea"
    :status="regexStatus"
    placeholder="请输入正则"
  />
  <n-input
    v-model:value="input"
    type="textarea"
    placeholder="输入内容"
  />
  <n-button @click="match">测试</n-button>
  <n-highlight :text="input" :patterns="patterns" />
  {{"input:"+ input }}
  {{"status:" + regexStatus }}
  {{"patterns:"+  patterns }}
  {{ "pre:"+ pre }}
</template>

<script setup>
import { NHighlight, NInput, NButton} from 'naive-ui'
import { computed, ref } from 'vue';
const input = ref('');
const modifier = ref('g')
const regex = ref('')
const regexStatus = ref('error')
const pre = computed(()=>{
  return regex.value;
})
const patterns = ref([])
const match = ()=>{
  patterns.value = input.value.match(new RegExp(pre.value, modifier.value))
}
// const re = computed(()=>{
//   try{
//     const regExp = new RegExp(pre.value, modifier.value);
//     console.log("正则正确")
//     regexStatus.value = "success"
//     return regExp;
//   }catch (e){
//     regexStatus.value = "error"
//     console.log("正则表达式错误")
//     return null;
//   }
// })
// const patterns = computed(()=>{
//   console.log("111")
//   if(re.value != null && regexStatus.value === 'success')
//   // return input.value.match(new RegExp(pre.value, modifier.value))
//     return input.value.match(re)
// })
</script>
