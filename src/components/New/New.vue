<script setup>
import { ref, reactive, computed, onMounted, watch, } from 'vue'
import RulesMaker from '../RulesUtils/RulesMaker.vue'
import CodeInfo from '../RulesUtils/CodeInfo.vue'
import RuleAdd from '../RulesUtils/RuleAdd.vue'
import RuleInfo from '../RulesUtils/RuleInfo.vue'
import RuleDel from '../RulesUtils/RuleDel.vue'
import RuleDownload from '../RulesUtils/RuleDownload.vue'
import { ElLoading } from 'element-plus'
import { _postConfigNew, _postCodeGen } from '../../utils/apis'
import {
    codeGen,
    rulesInfo,
    codeCheck,
    rulesParse
} from "../../utils/codeGen";
onMounted(() => {
    updateData()
    emits("update:configid", "创建新配置")
    watch(() => form.name, e => { subable.value = e != '' })
})
watch(() => props.uhost, updateData)
watch(() => props.uconfigid, updateData)
const props = defineProps(["host", "uhost", "configid", "uconfigid"])
const emits = defineEmits(["update:host", "update:configid"])

const subable = ref(false)
const formRules = {
    name: [
        { required: true, message: '', trigger: 'blur' },
    ]
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
function updateData() {
    if (props.host != props.uhost) {
        emits("update:host", props.uhost)
    }
    if (props.configid != props.uconfigid) {
        emits("update:configid", props.uconfigid)
    }
}
const form = reactive({
    // "finish": 10,
    "time": new Date().getTime(),
    // "operator": null,
    // "total": 10,
    "name": "",
    "tips": "",
    "state": false,
    "info": ""
})
function onSubmit() {
    let d = {
        rules: [...rules.value],
        ...form,
        total: genData.value.length,
    }
    console.log(JSON.stringify(d));
    const loading = ElLoading.service({
        lock: true,
        text: '正在创建',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    _postConfigNew(props.host, d).then(res1 => {
        console.log(res1.data.insertedId);
        _postCodeGen(props.host, { configid: res1.data.insertedId }).then(res2 => {
            console.log(res2.data);
            loading.close()
            window.location.href = '/#/' + props.host + '/' + res1.data.insertedId
        })
    })
}

</script>

<template>
    <el-form :model="form" label-width="70px">
        <el-form-item label="预览">
            <RuleDownload :genData="genData" />
            <CodeInfo :genData="genData" :rulesInfoObj="rulesInfoObj" />
        </el-form-item>
        <el-form-item label="编码规则">
            <div class="c">
                <el-row align="middle">
                    <RulesMaker class="c" v-model:rules="rules" v-model:selcindex="selcindex" />
                    <RuleAdd v-model:rules="rules" />
                </el-row>
                <el-row>
                    <el-row :sm="24">
                        <el-col>
                            <el-row>
                                <RuleInfo v-model:rules="rules" v-model:selcindex="selcindex" />
                                <RuleDel :rules="rules" :selcindex="selcindex" />

                            </el-row>
                        </el-col>
                    </el-row>

                </el-row>
            </div>
        </el-form-item>
    </el-form>
    <el-divider content-position="left">以下选项可在创建成功后再次修改</el-divider>
    <el-form :model="form" :rules="formRules" label-width="70px">
        <el-form-item label="配置名" prop="name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="启用">
            <el-switch v-model="form.state" />
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.info" type="textarea" placeholder="将显示于配置列表" />
        </el-form-item>
        <el-form-item label="提示">
            <el-input v-model="form.tips" type="textarea" placeholder="将显示于APP扫码界面" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="!subable" @click="onSubmit">创建</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>
.a {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #f5f5f5; */
}

.b {
    max-width: 500px;
}

.c {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    flex: 1;
}
</style>