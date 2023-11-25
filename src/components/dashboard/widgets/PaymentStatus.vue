<template>
    <v-chart :option="options" :style="`height:${size.height}px; width:${size.width}px;`" class="no-scroll" autoresize />
    <div class="absolute-center fit z-top flex flex-center" :class="Dark.isActive ? 'bg-grey-10' : 'bg-white'"
        v-show="loading"> <q-spinner-cube color="primary" size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
    TooltipComponent,
    LegendComponent, AxisPointerComponent, VisualMapComponent, GridComponent
} from 'echarts/components';

use([
    CanvasRenderer,
    BarChart,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent,
    AxisPointerComponent,
    GridComponent
]);
import { colors, Dark } from 'quasar'
import { getWidgetByTypeService } from "@/services/transactionServices";
import { graphic } from "echarts";
const { getPaletteColor, changeAlpha } = colors
defineProps({
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});
const loading = ref<boolean>(false)
const paymentStatus = ref<any>({})

async function getPaymentStatusTransactions(): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('payment_status') // redraw map to remove markers
        if (status === 200) paymentStatus.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}

getPaymentStatusTransactions()

const options = computed(() => ({
    textStyle: {
        fontFamily: 'Poppins',
        fontSize: '13px',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: getPaletteColor('secondary')
            }
        }
    },
    xAxis: {
        type: 'category',
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
        // data: Object.keys(paymentStatus.value),
        data: ['Autorizado', 'Pago', 'Cancelado', 'Recusado', 'Devolvido', 'Em Análise'],
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
            name: 'Payment Status',
            type: 'bar',
            data: Object.values(paymentStatus.value).map((item: any) => {
                const value = Math.max.apply(null, Object.values(paymentStatus.value));
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
                    }
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
                    }
                }
            }),
            color: getPaletteColor('primary'),
            label: {
                color: Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10'),
            },
            emphasis: {
                itemStyle: {
                    borderColor: 'transparent',
                    color: getPaletteColor('secondary')
                }
            },
            itemStyle: {
                borderRadius: [8, 8, 0, 0],
            }
        }
    ]
}));
</script>

<style></style>