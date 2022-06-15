<script setup>
import { ref, reactive, computed } from 'vue'

const search = ref('')
const tableData = reactive([{}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},])
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
</script>

<template>
    <el-row class="row-bg" justify="end">
        <el-col :span="24">
            <el-table border stripe  :data="filterTableData" style="width: 100%">
                <el-table-column label="配置名" prop="name" />
                <el-table-column label="创建日期" sortable prop="time" width="180"/>
                <el-table-column align="right" width="195">
                    <template #header>
                        <div style="display:flex;">
                            <el-input v-model="search" size="small" placeholder="筛选" />
                            <el-button style="margin-left:10px;" type="primary">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-button>
                        </div>
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">复制</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<style scoped>
</style>