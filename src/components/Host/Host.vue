<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import HostMain from './HostMain.vue'
import HostAside from './HostAside.vue'

onMounted(() => {
    updateData()
})
watch(() => props.uhost, updateData)
watch(() => props.uconfigid, updateData)
const props = defineProps(["host", "uhost","configid", "uconfigid"])
const emits = defineEmits(["update:host", "update:configid"])

function updateData() {
    if (props.host != props.uhost) {
        emits("update:host", props.uhost)
    }
    if (props.configid != props.uconfigid) {
        emits("update:configid", props.uconfigid)
    }
}
</script>

<template>
    <el-container>
        <el-aside width="200px">
            <HostAside :host="props.host" />
        </el-aside>
        <el-main style="padding:0;">
            <HostMain />
        </el-main>
    </el-container>
</template>

<style scoped>
</style>