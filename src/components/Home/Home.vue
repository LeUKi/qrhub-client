<script setup>
import { ref, reactive, computed, onMounted, watch, } from 'vue'

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
}
function setHost() {
    window.location.href = "/#/" + input.value
}
const input = ref('')

</script>

<template>

    <div class="a">
        <el-input class="b" v-model="input" placeholder="输入QrHub后台地址">

        </el-input>
        <el-button type="primary" @click="setHost">
            <el-icon>
                <ArrowRightBold />
            </el-icon>
        </el-button>
    </div>
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
</style>