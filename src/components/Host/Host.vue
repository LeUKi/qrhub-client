<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import HostMain from './HostMain.vue'
import HostAside from './HostAside.vue'
import { _getConfigs } from '../../utils/apis'
// import { ElNotification, ElLoading } from 'element-plus'
import axios from 'axios';

onMounted(() => {
    updateData()
})
watch(() => props.uhost, updateData)
watch(() => props.uconfigid, updateData)
const props = defineProps(["host", "uhost", "configid", "uconfigid"])
const emits = defineEmits(["update:host", "update:configid"])
function updateData() {
    if (props.host != props.uhost) {
        emits("update:host", props.uhost)
    }
    if (props.configid != props.uconfigid) {
        emits("update:configid", props.uconfigid)
    }
    _getConfigs(props.uhost).then(res => {
        configs.value.length = 0
        configs.value = res.data.configs
        console.log(configs.value);
    })

}

const configs = ref([])
</script>

<template>
    <el-container>
        <el-aside width="200px">
            <HostAside :host="props.uhost" />
        </el-aside>
        <el-main style="padding:0;">
            <HostMain @updateData="updateData" :configs="configs" :host="props.uhost" />
        </el-main>
    </el-container>
</template>

<style scoped>
</style>