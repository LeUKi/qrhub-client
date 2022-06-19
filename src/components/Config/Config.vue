<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import ConfigMain from './ConfigMain.vue'
import ConfigAside from './ConfigAside.vue'
import { _getConfig } from '../../utils/apis'
// import { ElNotification, ElLoading } from 'element-plus'

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
    let q = {
        configid: props.uconfigid
    }
    // console.log(q);
    _getConfig(props.uhost, q).then(res => {
        console.log(res.data);
        config.value = res.data.config[0]
    })
}

const config = ref({rules:[]})
</script>

<template>
    <el-container>
        <el-aside width="200px">
            <ConfigAside :host="props.host" :configid="props.uconfigid"/>
        </el-aside>
        <el-main style="padding:0;">
            <ConfigMain @updateData="updateData" :configid="props.uconfigid" :config="config" :host="props.uhost"  />
        </el-main>
    </el-container>
</template>

<style scoped>
</style>