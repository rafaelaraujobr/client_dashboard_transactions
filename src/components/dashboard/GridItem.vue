<template>
    <div class="grid-stack-item" :gs-x="item.x" :gs-y="item.y" :gs-w="item.w" :gs-h="item.h" :id="item.id">
        <q-card class="grid-stack-item-content " flat bordered>
            <q-resize-observer @resize="onResize" />
            <q-toolbar style="min-height:40px" class="grid-stack-item__header q-pr-xs ">
                <q-toolbar-title class="text-body2">
                    {{ item.id }}
                </q-toolbar-title>
            </q-toolbar>
            {{ item }}
        </q-card>
    </div>
</template>
<script lang="ts" setup>
import type { GridStackWidget } from 'gridstack';
import { ref, watch } from 'vue';
import type { PropType } from 'vue'
const size = ref({ height: 200, width: 200 })
const componentKey = ref(0)
const props = defineProps({
    item: {
        type: Object as PropType<GridStackWidget>,
        required: true
    },
});
watch(() => props.item, () => {
    componentKey.value += 1
}, { deep: true })

function onResize(value: any): void {
    size.value = { ...value, height: value.height - 42 };
}
</script>