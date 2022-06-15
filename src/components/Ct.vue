<script setup>
import { ref,toRefs } from 'vue'
const props = defineProps({
    Ctcount: Number
})
// const Ctcount = ref(props.Ctcount)
const { Ctcount } = toRefs(props)
</script>

<template>
    {{ Ctcount }}
    <button @click="Ctcount++">child add</button>
</template>

<style scoped>
</style>