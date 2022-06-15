<script setup>
import QrcodeVue from 'qrcode.vue'
import { ref, reactive, computed } from 'vue'
const props = defineProps(["host", "configid"])
const qr = computed(() => {
    return JSON.stringify(["b", props.host, props.configid])
})
</script>

<template>
    <el-affix class="a" :offset="20">
        <el-row>
            <qrcode-vue :value="qr" :size="180" level="L" />
        </el-row>
        <el-row justify="center">
            扫描并开始使用这个配置
        </el-row>
    </el-affix>


</template>

<style scoped>
.a {
    /* border: 1px solid #000; */
    margin-right: 20px;
}
</style>