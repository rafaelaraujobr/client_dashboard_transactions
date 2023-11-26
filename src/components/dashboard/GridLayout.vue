<template>
    <q-card class="bg-transparent" flat>
        <div class="grid-stack">
            <grid-item v-for="item in gridItems.filter(item => item.dashboard_id === dashboard.id)" class="grid-stack-item"
                :item="item" :key="item.id" />
        </div>
    </q-card>
</template>
<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css'
import '@/styles/gridstack-custom.sass'
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { GridStack } from 'gridstack'
import type { GridStackOptions, GridStackNode } from 'gridstack'
import { useDashboardComposable } from '@/composables/dashboardComposable';
import GridItem from './GridItem.vue'
import { useQuasar } from 'quasar'
const { dashboard, updateGridItem, gridItems } = useDashboardComposable()
const $q = useQuasar()
let grid: GridStack
const heightPanel = computed<number>((): number => $q.screen.height)
const heightGridStack = computed<number>((): number => {
    return heightPanel.value - (50 + 24 + 24)
})
const row = ref<number>(6)
const column = ref<number>(12)
const margin = ref<number>(10)
const options = computed<GridStackOptions>(() => ({
    row: $q.screen.lt.sm ? 0 : row.value,
    maxRow: $q.screen.lt.sm ? 0 : row.value,
    column: column.value,
    margin: margin.value,
    float: true,
    removable: '.grid-stack-trash',
    acceptWidgets: () => true,
    cellHeight: heightGridStack.value / row.value,
    resizable: { handles: 'se, sw' },
    draggable: {
        handle: '.grid-stack-item__header'
    }
}))
function onGridReady(options: GridStackOptions): void {
    grid = GridStack.init(options)
    if (grid) {
        grid.setStatic(false)
        onChangeGridStack(grid)
    }
}
function resetGrid(): void {
    if (grid) {
        grid.destroy(false)
        nextTick(() => {
            onGridReady(options.value)
        })
    } else onGridReady(options.value)
}

function onChangeGridStack(gridstackInstance: GridStack): void {
    gridstackInstance.on('change', (event: Event, items: GridStackNode[]) => {
        items.forEach((item: any) => {
            updateGridItem({
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
                id: item.el.id
            })
        })
    })
}
watch(() => $q.fullscreen.isActive, (value: boolean) => {
    console.log('fullscreen', value)
})

watch(heightPanel, (): void => {
    if (grid) grid.cellHeight(heightGridStack.value / row.value)
})

watch(dashboard, () => {
    resetGrid()
})


onMounted(() => {
    onGridReady(options.value)
})
</script>

<style lang="sass">
.grid-stack__grid
    &::before
        background-size: calc(100% / v-bind(options.column)) calc(100% / v-bind(options.maxRow))
</style>
