<template>
    <v-chart :option="option" :style="`height:${size.height}px; width:${size.width}px;`" class="no-scroll" autoresize />
    <div class="absolute-center fit z-top flex flex-center" :class="Dark.isActive ? 'bg-grey-10' : 'bg-white'"
        v-show="loading"> <q-spinner-cube color="primary" size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TooltipComponent,
    LegendComponent, AxisPointerComponent, VisualMapComponent
} from 'echarts/components';
import { colors, Dark } from 'quasar'
import { getWidgetByTypeService } from "@/services/transactionServices";
use([
    CanvasRenderer,
    PieChart,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent,
    AxisPointerComponent
]);
const { getPaletteColor } = colors
defineProps({
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});
const loading = ref<boolean>(false)
const devices = ref<any>({})
const option = computed(() => ({
    textStyle: {
        fontFamily: 'Poppins',
        fontSize: '13px',
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: getPaletteColor('secondary')
            }
        }
    },
    legend: {
        orient: 'horizontal',
        top: 'top',
        icon: 'roundRect',
        textStyle: {
            color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
        }
    },
    series: [
        {
            name: 'Devices',
            type: 'pie',
            radius: [50, 100],
            center: ['50%', '50%'],
            color: [getPaletteColor('secondary'), getPaletteColor('primary'), getPaletteColor('accent')],
            itemStyle: {
                borderRadius: 8,
                fontFamily: 'Poppins',
            },
            areaStyle: {
                opacity: 0.05
            },
            label: {
                color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
            },
            data: [
                { value: devices.value?.mobile, name: 'Mobile' },
                { value: devices.value?.desktop, name: 'Desktop' },
                { value: devices.value?.tablet, name: 'Tablet' },
            ]
        }
    ]
}));

async function getDeviceTransactions(): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('device')
        if (status === 200) devices.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}

getDeviceTransactions()
</script>

<style></style>