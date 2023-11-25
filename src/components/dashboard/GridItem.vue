<template>
    <div class="grid-stack-item" :gs-x="item.x" :gs-y="item.y" :gs-w="item.w" :gs-h="item.h" :gs-min-w="item.minW" :gs-min-h="item.minH">
        <q-card class="grid-stack-item-content " flat bordered>
            <q-resize-observer @resize="onResize" />
            <q-toolbar style="min-height:40px" class="grid-stack-item__header q-pr-xs ">
                <q-toolbar-title class="text-body2">
                    {{ item.content?.title || 'Sem título' }}
                </q-toolbar-title>
            </q-toolbar>
            <component :is="component" :size="size" />
        </q-card>
    </div>
</template>
<script lang="ts" setup>
import type { GridStackWidget } from 'gridstack';
import { defineAsyncComponent, ref } from 'vue';
import type { PropType } from 'vue'
const size = ref({ height: 200, width: 200 })
const props = defineProps({
    item: {
        type: Object as PropType<GridStackWidget> | any,
        required: true
    },
});
const component = defineAsyncComponent(() => import(`@/components/dashboard/widgets/${props.item?.content?.component || 'EnptyCard'}.vue`))

function onResize(value: any): void {
    size.value = { ...value, height: value.height - 42 };
}
</script>