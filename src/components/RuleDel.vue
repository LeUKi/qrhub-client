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
function rm(e) {
    if (e == '1') {
        rules.value.splice(selcindex.value, 1)
        console.log(selcindex.value, rules.value.length);
        if (selcindex.value = rules.value.length) {
            selcindex.value -= 1
        }
    } else if (e == '2') {
        let t = rules.value.splice(selcindex.value, 1)
        rules.value.length = 0
        rules.value.push(t[0])
        selcindex.value = 0
        console.log(t);
    }
}
</script>

<template>
    <div class="fd">
        <div class="btns">
            <el-dropdown :disabled="selcindex >= rules.length" split-button type="danger" @click="rm('1')" @command="rm">
                <el-icon>
                    <Delete />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="1">删除当前项</el-dropdown-item>
                        <el-dropdown-item command="2">删除其余项</el-dropdown-item>
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