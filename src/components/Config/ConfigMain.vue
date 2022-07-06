<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import * as moment from 'moment';
import * as echarts from 'echarts';
import { _postConfigUpdate } from '../../utils/apis'
import { ElLoading } from 'element-plus'
import RuleDownload from '../RulesUtils/RuleDownload.vue'
import RulesMaker from '../RulesUtils/RulesMaker.vue'
import CodeInfo from '../RulesUtils/CodeInfo.vue'
import codesAllDL from '../RulesUtils/codesAllDL.vue'
import {
    codeGen,
    rulesInfo,
    codeCheck,
    rulesParse
} from "../../utils/codeGen";
const props = defineProps(["config", "host", "configid"])
const emits = defineEmits(["updateData"])
onMounted(() => {
    watch(() => form.value.name, e => { subable.value = e != '' })
    let myChart = echarts.init(document.getElementById("myChart"));
    myChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.2]
        },
        yAxis: {
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
            {
                type: 'bar',
                data: [10, 2, 3, 7, 2, 1]
            }
        ]
    })
})
watch(() => props.config, e => {
    form.value = {
        "name": props.config.name,
        "tips": props.config.tips,
        "state": props.config.state,
        "info": props.config.info,
    }
})
function switchChange() {
    console.log(form);

    _postConfigUpdate(props.host, { configid: props.config._id, update: { state: props.config.state } }).then(res => {
        console.log(res.data);
        emits("updateData")
    })
}
const dialogConfigChangeVisible = ref(false)
const subable = ref(false)
const form = ref({
    "name": props.config.name,
    "tips": props.config.tips,
    "state": props.config.state,
    "info": props.config.info,
})
const formRules = {
    name: [
        { required: true, message: '', trigger: 'blur' },
    ]
}
function onSubmit() {
    const loading = ElLoading.service({
        lock: true,
        text: '正在创建',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    _postConfigUpdate(props.host, { configid: props.config._id, update: form.value }).then(res => {
        console.log(res.data);
        emits("updateData")
        loading.close()
        dialogConfigChangeVisible.value = false
    })
}
const genData = computed(() => {
    return codeGen(props.config.rules)
})
const rulesInfoObj = computed(() => {
    return rulesInfo(props.config.rules)
})
const finishPercent = computed(() => {
    return (props.config.finish / props.config.total * 100).toFixed(1)
})
const colors = [
    { color: '#909399', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#1989fa', percentage: 60 },
    { color: '#6f7ad3', percentage: 80 },
    { color: '#5cb87a', percentage: 100 },
]
</script>

<template>
    <div style="padding: 5px;">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
                <el-card class="box-card" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span style="font-size:25px">{{ props.config.name }}</span>
                            <div>
                                <el-switch v-model="props.config.state" @change="switchChange"
                                    style="margin-right: 20px;" />
                                <el-button size="small" @click="dialogConfigChangeVisible = true">
                                    <el-icon>
                                        <Edit />
                                    </el-icon>
                                </el-button>
                            </div>
                        </div>
                    </template>
                    <el-card class="box-card" shadow="never">
                        <template #header>
                            <div>备注信息 </div>
                            <div style="color:#ccc;font-size:10px;">将显示于配置列表</div>
                        </template>
                        <div style="word-break:break-all;">{{ props.config.info }}</div>
                    </el-card>
                    <el-card class="box-card" shadow="never">
                        <template #header>
                            <div>提示信息 </div>
                            <div style="color:#ccc;font-size:10px;">将显示于APP扫码界面</div>
                        </template>
                        <div style="word-break:break-all;">{{ props.config.tips }}</div>
                    </el-card>



                </el-card>
            </el-col>

            <el-col :xs="24" :sm="24" :md="8" :lg="12" :xl="6">
                <el-card class="box-card" shadow="hover">
                    <el-row justify="space-between" align="middle" :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="14">
                            <RulesMaker class="c" :rules="props.config.rules" />
                        </el-col>
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="10">
                            <RuleDownload :genData="genData" />
                        </el-col> -->
                    </el-row>
                    <el-row>
                        <el-col>
                            <CodeInfo :genData="genData" :rulesInfoObj="rulesInfoObj" />
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                <el-card class="box-card" shadow="hover">
                    <div class="p">
                        <el-progress type="dashboard" :color="colors" :percentage="finishPercent">
                            <template #default="{ percentage }">
                                <span class="percentage-value">{{ percentage }}%</span>
                                <span class="percentage-label">扫码率</span>
                            </template>
                        </el-progress>
                        <div>
                            <div>
                                已完成 {{ props.config.finish }}
                            </div>
                            <div>
                                待扫码 {{ props.config.total - props.config.finish }}
                            </div>
                            <codesAllDL :configid="props.config._id" :host="props.host" />
                        </div>
                    </div>
                </el-card>
            </el-col>


            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="6">
                <el-card class="box-card" shadow="hover">
                    <div class="p">
                        <div id="myChart" style="width: 200px;height: 400px;"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>














    <el-dialog v-model="dialogConfigChangeVisible" title="更新配置信息">
        <el-form :model="form" :rules="formRules" label-width="70px">
            <el-form-item label="配置名" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="启用">
                <el-switch v-model="form.state" />
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.info" type="textarea" placeholder="显示于配置列表" />
            </el-form-item>
            <el-form-item label="提示">
                <el-input v-model="form.tips" type="textarea" placeholder="显示于APP扫码界面" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="!subable" @click="onSubmit">
                    更新
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.el-col {
    margin-bottom: 10px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.c {
    width: 100%;
    user-select: none;
}

.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
}

.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
}

.p {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>