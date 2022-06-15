<script setup>
import { ref, reactive, computed } from 'vue'
const props = defineProps(["host", "configid"])

function refresh() {
    window.location.reload();
} 
</script>

<template>
    <div style="display:flex;">
        <el-link class="a fff" :underline="false" href="#">
            QrHubManager
        </el-link>
        <div class="b">
            <el-breadcrumb>
                <el-breadcrumb-item :to="{ path: '/'+props.host }"><span class="fff">{{ props.host }}</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item><span class="fff">{{ props.configid }}</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="fr">
            <el-button type="info" circle @click="refresh">
                <el-icon>
                    <Refresh />
                </el-icon>
            </el-button>
        </div>
    </div>
</template>

<style scoped>
.a {
    font-size: 30px;
}

.fff {
    color: #fff;
}

.b {
    color: #fff;
    font-size: 10px;
    margin-top: 20px;
    margin-left: 20px;
}

.fr {
    position: absolute;
    right: 20px;
    top: 5px
}
</style>