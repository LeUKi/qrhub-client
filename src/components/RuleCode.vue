<script setup>
import { ref, reactive, computed } from 'vue'

import RulesMaker from './RulesMaker.vue'
import CodeInfo from './CodeInfo.vue'
import RuleAdd from './RuleAdd.vue'
import RuleInfo from './RuleInfo.vue'
import RuleDel from './RuleDel.vue'
import RuleDownload from './RuleDownload.vue'

import {
  codeGen,
  rulesInfo,
  codeCheck,
  rulesParse
} from "../utils/codeGen";
function show(e) {
  console.log(e);
}
const rules = reactive(ref([{
  type: "static",
  string: "TEST",
  id: "1",
}, {
  type: "forNum",
  step: 1,
  start: 1,
  end: 10,
  stringlen: 3,
  strinfill: "0",
  id: "2",
}]))
const selcindex = ref(0)

const genData = computed(() => {
  return codeGen(rules.value)
})
const rulesInfoObj = computed(() => {
  return rulesInfo(rules.value)
})

</script>

<template>
  <CodeInfo :genData="genData" :rulesInfoObj="rulesInfoObj" />
  <RuleAdd v-model:rules="rules" />
  <RuleDownload :genData="genData" />
  <RuleDel :rules="rules" :selcindex="selcindex" />
  <RulesMaker v-model:rules="rules" v-model:selcindex="selcindex" />
  <RuleInfo v-model:rules="rules" v-model:selcindex="selcindex" />
</template>

<style scoped>
</style>
