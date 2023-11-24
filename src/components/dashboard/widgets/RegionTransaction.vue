<template>
    <v-chart :option="option" class="no-scroll" :style="{ height: `${size.height}px` }" autoresize />
    <div class="absolute-right  q-gutter-sm q-pt-xs" style="right:45px">
        <q-btn icon="sym_r_bar_chart" dense flat round unelevated :color="typeChart === 'bar' ? 'accent' : ''"
            @click="typeChart = 'bar'" />
        <q-btn icon="sym_r_show_chart" dense flat round unelevated :color="typeChart === 'line' ? 'accent' : ''"
            @click="typeChart = 'line'" />
    </div>
    <div class="absolute-center fit z-top flex flex-center  bg-grey-4" v-show="loading"> <q-spinner-cube color="primary"
            size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components'
import {
    TooltipComponent,
    LegendComponent, AxisPointerComponent, VisualMapComponent
} from 'echarts/components';
import { colors, Dark } from 'quasar'
const { getPaletteColor } = colors
const loading = ref<boolean>(false)
const typeChart = ref<string>('bar')
use([
    CanvasRenderer,
    BarChart,
    LineChart,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent,
    AxisPointerComponent,
    GridComponent
]);
const props = defineProps({
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});

const option = computed(() => ({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: getPaletteColor('secondary')
            }
        }
    },
    textStyle: {
        fontFamily: 'Poppins',
        fontSize: '14px'
    },
    xAxis: {
        type: 'category',
        axisTick: {
            show: false,
            color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
        },
        axisLabel: {
            color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
        },
        data: ['RJ', 'SP', 'MG', 'ES', 'BA', 'RS', 'SC', 'PR', 'MS', 'MT', 'GO', 'DF', 'TO', 'RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE'],
        axisLine: {
            lineStyle: {
                color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
        },
    },
    grid: {
        left: '10px',
        right: '10px',
        bottom: '20px',
        top: '20px',
        containLabel: true
    },
    series: [
        {
            type: typeChart.value,
            areaStyle: {},
            color: getPaletteColor('primary'),
            label: {
                color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
            tooltip: {
                valueFormatter: function (value: any) {
                    return value + ' transações';
                }
            },
            emphasis: {
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                }
            },
            itemStyle: {
                borderRadius: [4, 4, 0, 0],
            }
        },
    ]
}));
</script>

<style></style>