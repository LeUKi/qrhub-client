<script setup>
import { ref, toRefs, computed, reactive } from 'vue'
import draggable from 'vuedraggable'
const props = defineProps(["rules", "selcindex"])
const emits = defineEmits(['update:rules', "update:selcindex"])

const ruleInfo = {
    static: (e) => [`"${e.string}"`],
    forNum: (e) => {
        let pad = function (tbl) {
            return function (num, n) {
                return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join("0"))) + num;
            }
        }([]);
        return [`${pad(e.start, e.stringlen)}~${pad(e.end, e.stringlen)}`]
    },
    forABC: (e) => [e.start + "~" + e.end],
    YYYY: () => ["YYYY"],
    YY: () => ["YY"],
    MM: () => ["MM"],
    DD: () => ["DD"],
    HH: () => ["HH"],
    hh: () => ["hh"],
    mm: () => ["mm"],
    ss: () => ["ss"],
}
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

function dragsatrt(e) {
    selcindex.value = e.newIndex
}
</script>

<template>
    <div class="fd">
        <draggable v-model="rules" item-key="order" @end="dragsatrt" animation="300" tag="div"
            :component-data="{ class: 'outarea' }" force-fallback="true">
            <template #item="{ element, index }">
                <div class="oone" :class="selcindex == index ? 'selc' : ''">
                    <div class="one" @click="selcindex = index">
                        <!-- {{ element.type }} -->
                        {{ ruleInfo[element.type](element)[0] }}
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<style scoped lang="scss">
.fd {
    border: 1px solid #ccc;
    // background-color: red;
    border-radius: 3px;
    // background: #ddd;
    display: flex;
    width: 100px;

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
        // background: #ccc;
        /* padding: 2px; */
        // width: 100%;
        overflow: auto;
        flex: 1;
        padding: 1px;

        min-width: 100px;


        .oone {
            border-radius: 2px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #ccc;
            cursor: pointer;
            padding: 1px;
            margin-left: 1px;

            /* border-radius: 12%; */
            .one {
                border-radius: 1px;
                background: #fff;
                user-select: none;
                // margin: 1px;
                /* border-radius: 10%; */
                // height: 14px;
                min-width: 30px;
                text-align: center;
                white-space: nowrap;
            }



        }

        .selc {
            background: #1d54ac;
            cursor: move;
        }

    }

}

/* 滚动条 */
.fd {
    ::-webkit-scrollbar {
        width: 20px;
        height: 20px;
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb {
        border-radius: 999px;
        border: 5px solid transparent;
    }

    ::-webkit-scrollbar-track {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
    }

    ::-webkit-scrollbar-thumb {
        min-height: 20px;
        background-clip: content-box;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
}
</style>