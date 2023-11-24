<template>
    <q-card class="bg-transparent" flat>
        <div class="grid-stack">
            <grid-item v-for="item in gridItems" class="grid-stack-item" :item="item" :key="item.id" />
        </div>
    </q-card>
</template>
<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css'
import { onMounted, ref } from 'vue'
import { GridStack } from 'gridstack'
import type { GridStackOptions, GridStackNode, GridStackWidget } from 'gridstack'
import GridItem from './GridItem.vue'
const gridItems = ref<GridStackWidget[]>([{
    x: 0,
    y: 0,
    w: 3,
    h: 1,
    id: '1',
    content: {
        title: 'Valor Total de Vendas',
        component: 'MinMaxSales',
    }
}, {
    x: 3,
    y: 0,
    w: 3,
    h: 1,
    id: '2',
    content: {
        title: 'Quantidade de itens vendidos',
        component: 'MinMaxSales',
    }
}, {
    x: 6,
    y: 0,
    w: 3,
    h: 1,
    id: '3',
    content: {
        title: 'Quantidade de transações',
        component: 'MinMaxSales',
    }
}, {
    x: 9,
    y: 0,
    w: 3,
    h: 1,
    id: '4',
    content: {
        title: 'Maior e Menor Venda',
        component: 'MinMaxSales',
    }
}, {
    x: 0,
    y: 1,
    w: 4,
    h: 3,
    id: '5'
},
{
    x: 4,
    y: 1,
    w: 4,
    h: 3,
    id: '6'
},
{
    x: 8,
    y: 1,
    w: 4,
    h: 2,
    id: '7'
}, {
    x: 8,
    y: 3,
    w: 4,
    h: 3,
    id: '8'
}, {
    x: 0,
    y: 4,
    w: 8,
    h: 2,
    id: '9'
}])
const options = ref<GridStackOptions>({
    column: 12,
    maxRow: 0,
    minRow: 6,
    float: true,
    margin: 10,
    auto: true,
    placeholderClass: 'grid-stack-placeholder',
    placeholderText: 'Drop Here',
    resizable: {
        handles: 'e, se, s, sw, w'
    },
    draggable: {
        handle: '.grid-stack-item__header'
    }
})
let grid: GridStack
function onGridReady(options: GridStackOptions): void {
    grid = GridStack.init(options)
    if (grid) {
        grid.setStatic(false)
        onChangeGridStack(grid)
    }
}
function onChangeGridStack(gridstackInstance: GridStack): void {
    gridstackInstance.on('change', (event: Event, items: GridStackNode[]) => {
        items.forEach((item: GridStackNode) => {
            console.log(item)
            const gridItem = gridItems.value.find((gridItem: GridStackWidget) => gridItem.id === item.el.id)
            const updateItem = {
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
                id: item.el.id
            }
            if (gridItem) Object.assign(gridItem, updateItem)
            console.log(gridItem)
            // const gridItem = gridItems.value.find((gridItem: GridStackWidget) => gridItem.id === item.id)
            // if (gridItem) {
            //     gridItem.x = item.x
            //     gridItem.y = item.y
            //     gridItem.w = item.w
            //     gridItem.h = item.h
            // }
            // Object.assign(gridItem.value, item)
        })
    })
}


onMounted(() => {
    onGridReady(options.value)
})
</script>

<style lang="sass">
.grid-stack__grid
    &::before
        background-size: calc(100% / v-bind(options.column)) calc(100% / v-bind(options.maxRow))
</style>
