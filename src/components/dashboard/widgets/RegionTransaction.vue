<template>
    <v-chart :option="option" class="no-scroll" :style="{ height: `${size.height}px` }" autoresize />
    <div class="absolute-right  q-gutter-sm q-pt-xs" style="right:45px">
        <q-btn icon="sym_r_bar_chart" dense flat round unelevated :color="typeChart === 'bar' ? 'accent' : ''"
            @click="typeChart = 'bar'" />
        <q-btn icon="sym_r_show_chart" dense flat round unelevated :color="typeChart === 'line' ? 'accent' : ''"
            @click="typeChart = 'line'" />
    </div>
    <div class="absolute-center fit z-top flex flex-center" :class="Dark.isActive ? 'bg-grey-10' : 'bg-white'"
        v-show="loading"> <q-spinner-oval color="primary" size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import { graphic } from 'echarts'
import {
    TooltipComponent,
    LegendComponent, AxisPointerComponent, VisualMapComponent, GridComponent
} from 'echarts/components';
import { colors, Dark } from 'quasar'
import { getWidgetByTypeService } from "@/services/transactionServices";
import { useDashboardComposable } from '@/composables/dashboardComposable';
import type { QueryParameters } from '@/utils/helpers';
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
    item: {
        type: Object,
        required: true,
    },
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});
const { filterDashboard } = useDashboardComposable()
const { getPaletteColor, changeAlpha } = colors
const loading = ref<boolean>(false)
const typeChart = ref<string>(props.item?.content?.type || 'line')
const regions = ref<any[]>([])
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
        // boundaryGap: false,
        data: Object.keys(regions.value),
        axisTick: {
            show: false,
            color: Dark.isActive ? getPaletteColor('grey-5') : getPaletteColor('grey-10'),
        },
        axisPointer: {
            lineStyle: {
                color: Dark.isActive ? getPaletteColor('grey-5') : getPaletteColor('grey-10'),// Cor desejada
            },
        },
        axisLabel: {
            color: Dark.isActive ? getPaletteColor('grey-5') : getPaletteColor('grey-10'),
        },
        axisLine: {
            lineStyle: {
                color: Dark.isActive ? getPaletteColor('grey-5') : getPaletteColor('grey-10'),
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: Dark.isActive ? getPaletteColor('grey-5') : getPaletteColor('grey-10'),
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: Dark.isActive ? getPaletteColor('grey-9') : getPaletteColor('grey-2'),
            }
        },
    },
    grid: {
        left: '20px',
        right: '20px',
        bottom: '20px',
        top: '20px',
        containLabel: true
    },
    series: [
        {
            type: typeChart.value,
            smooth: true,
            color: getPaletteColor('primary'),
            label: {
                color: Dark.isActive ? getPaletteColor('grey-5') : getPaletteColor('grey-10'),
            },
            areaStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: getPaletteColor('primary')
                    },
                    {
                        offset: 1,
                        color: changeAlpha(getPaletteColor('primary'), 0.5)
                    }])
            },
            data: Object.values(regions.value).map((item: any) => {
                const value = Math.max.apply(null, Object.values(regions.value));
                return item === value ? {
                    value: item, itemStyle: {
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: getPaletteColor('secondary')
                            },
                            {
                                offset: 1,
                                color: changeAlpha(getPaletteColor('secondary'), 0.5)
                            }])
                    },
                } : {
                    value: item, itemStyle: {
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: getPaletteColor('accent')
                            },
                            {
                                offset: 1,
                                color: getPaletteColor('primary')
                            }])
                    },
                }
            }),
            tooltip: {
                valueFormatter: function (value: any) {
                    return value + ' transações';
                }
            },
            emphasis: {
                itemStyle: {
                    borderColor: 'transparent',
                    color: getPaletteColor('secondary')
                }
            },
            itemStyle: {
                borderRadius: [4, 4, 0, 0],
                color: getPaletteColor('accent'),
            }
        },
    ]
}));


async function getRegionTransactions(query: QueryParameters = {}) {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('region', query) // redraw map to remove markers
        if (status === 200) regions.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}
watch(filterDashboard, (value) => {
    getRegionTransactions(value)
})

getRegionTransactions()

</script>

<style></style>