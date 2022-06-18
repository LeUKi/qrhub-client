<script setup>
import { ref, toRefs, computed, reactive } from 'vue'
import draggable from 'vuedraggable'
import {
    codeGen,
    rulesInfo,
    codeCheck,
    rulesParse
} from "../../utils/codeGen";
const props = defineProps(["rules", "selcindex"])
const emits = defineEmits(['update:rules', "update:selcindex"])

// computed
const rules = computed({
    get() {
        return props.rules
    },
    set(v) {
        emits('update:rules', v)
    }
})
const selcindex = computed({
    get() {
        return props.selcindex
    },
    set(v) {
        emits('update:selcindex', v)
    }
})
const rule = computed({
    get() {
        return rules.value[selcindex.value]
    },
    set(v) {
        rules.value[selcindex.value] = v
    }
})

</script>

<template>
    <template v-if="!rule">
        请选择一项以修改
    </template>
    <template v-else-if="rule.type == 'static'">
        <el-form label-position="Right" label-width="100px" :model="rule">
            <el-form-item label="固定字符串" >
                <el-input v-model.trim="rule.string" class="ei"/>
            </el-form-item>
        </el-form>
    </template>
    <template v-else-if="rule.type == 'forNum'">
        <el-form label-position="Right" label-width="100px" :model="rule">
            <el-form-item label="数字开始">
                <el-input-number v-model="rule.start" :min="0" :max="rule.end" />
            </el-form-item>
            <el-form-item label="数字结束">
                <el-input-number v-model="rule.end" :min="rule.start" />
            </el-form-item>
            <el-form-item label="步长">
                <el-input-number v-model="rule.step" />
            </el-form-item>
            <el-form-item label="高位填充">
                <el-input v-model.trim="rule.strinfill" class="ei" align="center"/>
            </el-form-item>
            <el-form-item label="总长度">
                <el-input-number v-model="rule.stringlen" />
            </el-form-item>
        </el-form>
    </template>
    <template v-else-if="rule.type == 'forABC'">
        <el-form label-position="Right" label-width="100px" :model="rule">
            <el-form-item label="字母开始">
                <el-input v-model="rule.start" min="0" :max="rule.end" />
            </el-form-item>
            <el-form-item label="字母结束">
                <el-input v-model="rule.end" :min="rule.start" />
            </el-form-item>
        </el-form>
    </template>
    <template v-else>
        当前：{{ codeGen([rule])[0] }}
    </template>
</template>
<style scoped lang="scss">
.ei {
    width: 150px;
}
</style>