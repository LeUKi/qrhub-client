<script setup>
import { ref, reactive, computed } from 'vue'
import RuleCode from './components/RuleCode.vue'
import Header from './components/Header.vue'
const host = ref('192.168.1.1')
const configid = ref('等待选择配置')

</script>

<template>
  <!-- <RuleCode  /> -->

  <el-container class="m">
    <el-header class="h" height="45px">
      <Header :host="host" :configid="configid" />
    </el-header>
    <el-main class="m">
      <router-view v-model:host="host" v-model:configid="configid" />
    </el-main>
  </el-container>
</template>

<style>
html,
body,
#app,
.m {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
}

.h {
  background-color: #393b46;
}


</style>
