<script setup>
import { ref, toRefs, computed, reactive } from 'vue'
import type2init from "../../utils/type2init";

const props = defineProps(["genData"])
const emits = defineEmits([])

// computed
const drShow = ref(false)
const data = computed(() => {
    // return { key: "code", children: props.genData }
    return props.genData.map((item, index) => {
        return {
            key: index,
            code: item,
            no: index + 1,
        }
    })
})

const columns = [{
    "key": "no",
    "dataKey": "no",
    "title": "No.",
    "width": 150
},
{
    "key": "code",
    "dataKey": "code",
    "title": "code",
    "width": 500
}]
//下载txt
function dltxt() {
    let txt = props.genData.join("\n")
    let blob = new Blob([txt], { type: "text/plain;charset=utf-8" })
    let a = document.createElement('a')
    a.download = "code.txt"
    a.href = URL.createObjectURL(blob)
    a.click()
}
//下载csv
function dlcsv() {
    let data = props.genData.map((item, index) => {
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
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(row);
    let a = document.createElement('a')
    a.download = "code.csv"
    a.href = uri
    a.click()
}
//下载xls
function dlxls() {
    let data = props.genData.map((item, index) => {
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

</script>

<template>
    <!-- {{ JSON.stringify(data) }} -->
    <el-drawer v-model="drShow" title="查看与下载" direction="rtl" size="70%">
        <el-auto-resizer>
            <template #default="{ height, width }">
                <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" :footer-height="50" fixed>
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
                            <el-button type="success" @click="dlxls">
                                xls
                            </el-button>
                            <el-button type="info" @click="dltxt">
                                txt
                            </el-button>
                        </div>
                    </template>
                </el-table-v2>
            </template>
        </el-auto-resizer>
    </el-drawer>
    <el-button type="primary" style="margin-right: 16px" @click="drShow = true">
        查看/下载所有编码
    </el-button>
</template>

<style scoped lang="scss">
</style>