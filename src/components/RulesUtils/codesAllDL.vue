<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { _getCodesAll } from '../../utils/apis'
import * as moment from 'moment';
import { ElLoading, TableV2SortOrder } from 'element-plus'

const props = defineProps(["configid", "host"])
const emits = defineEmits([])
onMounted(() => {
})
// computed
const drShow = ref(false)
const data = ref([])
const search = ref('')
const filterTableData = computed(() =>
    data.value.map(item => {
        return {
            ...item,
            time: item.time ? moment(item.time).format('YYYY-MM-DD HH:mm:ss') : '',
            finish: item.finish ? '已扫描' : '未扫描',
        }
    }).filter(
        (data) =>
            !search.value ||
            data.code.toLowerCase().includes(search.value.toLowerCase()) ||
            data.operator.toLowerCase().includes(search.value.toLowerCase()) ||
            data.time.toLowerCase().includes(search.value.toLowerCase()) ||
            data.finish.toLowerCase().includes(search.value.toLowerCase())

    ))
const columns = [{
    "key": "no",
    "dataKey": "no",
    "title": "码序号",
    "width": 100,
},
{
    "key": "code",
    "dataKey": "code",
    "title": "码",
    "width": 300,
},
{
    "key": "finish",
    "dataKey": "finish",
    "title": "状态",
    "width": 70,
},
{
    "key": "operator",
    "dataKey": "operator",
    "title": "操作人",
    "width": 120,

},
{
    "key": "time",
    "dataKey": "time",
    "title": "操作时间",
    "width": 180,

}]


function showit() {
    updateData();
}
//下载txt
function dltxt() {
    let txt = filterTableData.value.join("\n")
    let blob = new Blob([txt], { type: "text/plain;charset=utf-8" })
    let a = document.createElement('a')
    a.download = "code.txt"
    a.href = URL.createObjectURL(blob)
    a.click()
}
//下载csv
function dlcsv() {
    let data = filterTableData.value
    let row = `码序号,码,状态,操作人,操作时间\n`;
    for (let i = 0; i < data.length; i++) {
        row += `${data[i].no},`;
        row += `${data[i].code},`;
        row += `${data[i].finish},`;
        row += `${data[i].operator},`;
        row += `${data[i].time},`;
        row += '\n';
    }
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(row);
    let a = document.createElement('a')
    a.download = "code.csv"
    a.href = uri
    a.click()
}
//下载xls
function dlxls() {
    let data = filterTableData.value.map((item, index) => {
        return {
            no: index + 1,
            code: item,
        }
    })
    let row = `No,code\n`;
    for (let i = 0; i < data.length; i++) {
        for (const key in data[i]) {
            row += `${data[i][key] + '\t'},`;
        }
        row += '\n';
    }
    let uri = 'data:application/vnd.ms-excel;charset=utf-8,\ufeff' + encodeURIComponent(row);
    let a = document.createElement('a')
    a.download = "code.xls"
    a.href = uri
    a.click()
}
function updateData() {
    const loading = ElLoading.service({
        lock: true,
        text: '正在拉取',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    _getCodesAll(props.host, { configid: props.configid }).then(res => {
        data.value.length = 0
        data.value = res.data.codes
        console.log(res);
        loading.close()
        drShow.value = true;
    })
}

</script>

<template>
    <!-- {{ JSON.stringify(data) }} -->
    <el-drawer v-model="drShow" title="码库详情" direction="rtl" size="70%">
        <el-input v-model="search" placeholder="检索编码、操状态、作人、操作时间" size="normal" clearable></el-input>

        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2 :columns="columns" :data="filterTableData" :width="width" :height="height"
                    :footer-height="50" fixed>

                    <template #footer>
                        <div class="flex items-center" style="
                        display: flex;
          justify-content: center;
            align-items: center;
          height: 100%;
        ">
                            <div style="margin-right: 16px">下载</div>
                            <el-button type="success" @click="dlcsv">
                                csv
                            </el-button>
                            <!-- <el-button type="success" @click="dlxls">
                                xls
                            </el-button>
                            <el-button type="info" @click="dltxt">
                                txt
                            </el-button> -->
                        </div>
                    </template>
                </el-table-v2>
            </template>
        </el-auto-resizer>
    </el-drawer>
    <el-button type="" style="margin-right: 16px" @click="showit">
        码库详情
    </el-button>
</template>

<style scoped lang="scss">
</style>