<script setup>
import { ref, toRefs, computed } from 'vue'
const props = defineProps(["genData", "rulesInfoObj"])
const { genData, rulesInfoObj } = toRefs(props)
const testin = ref("")
const istestin = computed(() => {
    return genData.value.includes(testin.value)
})
</script>

<template>
    <div class="tx">{{ rulesInfoObj.Start.join("") }}</div>
    <span class="tx"> ~ </span>
    <div class="tx"> {{ rulesInfoObj.End.join("") }}</div>
    <div class="tx">共{{ genData.length }}个</div>
    <el-input v-model="testin" clearable placeholder="输入一串编码测试是否符合条件" />
    <div>{{ testin ? istestin ? "通过生成规则" : "不符合规则" : "" }}</div>
</template>

<style scoped>
.tx {
    font-family: 'Courier New', Courier, monospace;
    /* font-size: 20px; */
}
</style>