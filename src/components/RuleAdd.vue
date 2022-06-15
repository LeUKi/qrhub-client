<script setup>
import { ref, toRefs, computed, reactive } from 'vue'
import type2init from "../utils/type2init";
const props = defineProps(["rules", "selcindex"])
const emits = defineEmits(['update:rules', "update:selcindex"])

// computed
const rules = computed({
    get() {
        return props.rules
    },
    set(v) {
        emits('update:rules', v)
    }
})
const selcindex = computed({
    get() {
        return props.selcindex
    },
    set(v) {
        emits('update:selcindex', v)
    }
})

// fn
function saverule(e) {
    rules[selcindex] = { ...rules[selcindex], ...e }
}

function addOne(e) {
    rules.value.push(type2init(e))
    selcindex.value = rules.value.length - 1
    console.log(rules);
}
</script>

<template>
    <div class="fd">
        <div class="btns">
            <el-dropdown split-button type="primary" @click="addOne('static')" @command="addOne">
                <el-icon>
                    <Plus />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="static">字符串</el-dropdown-item>
                        <el-dropdown-item command="forNum">循环数字</el-dropdown-item>
                        <el-dropdown-item command="forABC">循环字母</el-dropdown-item>
                        <el-dropdown-item command="YYYY">当前年 YYYY</el-dropdown-item>
                        <el-dropdown-item command="YY">当前年 YY</el-dropdown-item>
                        <el-dropdown-item command="MM">当前月 01~12</el-dropdown-item>
                        <el-dropdown-item command="DD">当前日 01~31</el-dropdown-item>
                        <el-dropdown-item command="HH">当前时 00~11</el-dropdown-item>
                        <el-dropdown-item command="hh">当前时 00~23</el-dropdown-item>
                        <el-dropdown-item command="mm">当前分 00~59</el-dropdown-item>
                        <el-dropdown-item command="ss">当前秒 00~59</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tx {
    font-family: 'Courier New', Courier, monospace;
    font-size: 30px;
}

.fd {
    border: 1px solid #000;
    // background-color: red;
    background: #ccc;
    display: flex;

    .btns {
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .outarea {
        display: flex;
        /* border: 1px solid #000; */
        background: #ccc;
        /* padding: 2px; */
        width: 400px;
        overflow: auto;
        flex: 1;

        .oone {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #ccc;
            cursor: pointer;

            /* border-radius: 12%; */
            .one {
                padding: 10px;
                background: #fff;
                user-select: none;
                margin: 2px;
                /* border-radius: 10%; */
                min-width: 30px;
                text-align: center;
                white-space: nowrap;
            }

            .selc {
                background: rgb(162, 198, 255);
                cursor: move;
            }

        }

    }

}
</style>