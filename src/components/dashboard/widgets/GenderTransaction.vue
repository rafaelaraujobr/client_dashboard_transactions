<template>
    <v-chart :option="option" :style="`height:${size.height}px;`" class="no-scroll" autoresize />
    <div class="absolute-center fit z-top flex flex-center  bg-white" v-show="loading"> <q-spinner-cube color="primary"
            size="5.5em">
        </q-spinner-cube>
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

use([
    CanvasRenderer,
    PieChart,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent,
    AxisPointerComponent
]);
import { colors, Dark } from 'quasar'
import { getWidgetByTypeService } from "@/services/transactionServices";
const { getPaletteColor } = colors
const loading = ref<boolean>(false)
const genders = ref<any>({})
defineProps({
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});

async function getGenderTransactions(): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('gender') // redraw map to remove markers
        if (status === 200) genders.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}

getGenderTransactions()

const option = computed(() => ({
    textStyle: {
        fontFamily: 'Poppins',
        fontSize: '13px',
    },
    legend: {
        orient: 'horizontal',
        top: 'top',
        icon: 'rect',
        textStyle: {
            color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
        }
    },
    series: [
        {
            type: 'pie',
            width: '100%',
            radius: ['70%', '110%'],
            center: ['50%', '85%'],
            startAngle: 180,
            color: [getPaletteColor('primary'), getPaletteColor('secondary'), getPaletteColor('accets')],
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
                { value: genders.value?.female, name: 'Female' },
                { value: genders.value?.male, name: 'Male' },
                { value: genders.value?.other, name: 'Other' },
                {
                    value: genders.value?.female + genders.value?.male + genders.value?.other,
                    itemStyle: {
                        color: 'none',
                        decal: {
                            symbol: 'none'
                        }
                    },
                    label: {
                        show: false
                    }
                }
            ]
        }
    ]
}));
</script>

<style></style>