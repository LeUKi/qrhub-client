<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import * as moment from 'moment';
import { _postConfigUpdate, _postConfigDel } from '../../utils/apis'
const props = defineProps(["configs", "host"])
const emits = defineEmits(["updateData"])
const search = ref('')
const filterTableData = computed(() =>
    props.configs.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
function add() {
    window.location.hash = window.location.hash + "/new"
}
function switchChange(_id, state) {
    console.log(_id, state);
    _postConfigUpdate(props.host, { configid: _id, update: { state } }).then(res => {
        console.log(res.data);
        emits("updateData")
    })
}
function configEdit(_id) {
    window.location.hash = window.location.hash + '/' + _id
}
function configDelete(_id) {
    _postConfigDel(props.host, { configid: _id }).then(res => {
        console.log(res.data);
        emits("updateData")
    })
}
</script>

<template>
    <el-row class="row-bg" justify="end">
        <el-col :span="24">
            <el-table border stripe :data="filterTableData" style="width: 100%">
                <el-table-column label="配置名" resizable prop="name" />
                <el-table-column label="创建日期" align="center" sortable prop="time" width="165" :formatter="(row, column, cellValue, index) => {
                    return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
                }" />
                <el-table-column align="right" width="195">
                    <template #header>
                        <div style="display:flex;">
                            <el-input v-model="search" size="small" placeholder="筛选" />
                            <el-button @click="add" style="margin-left:10px;" type="primary">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-button>
                        </div>
                    </template>
                    <template #default="scope">
                        <el-switch v-model="scope.row.state" @change="switchChange(scope.row._id, scope.row.state)"
                            style="margin-right:20px" />
                        <el-button size="small" type="primary" @click="configEdit(scope.row._id)">编辑
                        </el-button>
                        <el-button size="small" type="danger" @click="configDelete(scope.row._id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<style scoped>
</style>