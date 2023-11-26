<template>
    <v-chart :option="option" :style="`height:${size.height}px; width:${size.width}px;`" class="no-scroll" autoresize />
    <div class="absolute-center fit z-top flex flex-center" :class="Dark.isActive ? 'bg-grey-10' : 'bg-white'"
        v-show="loading"> <q-spinner-oval color="primary" size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
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
import { graphic } from "echarts";
import { useDashboardComposable } from '@/composables/dashboardComposable';
import type { QueryParameters } from '@/utils/helpers';
use([
    CanvasRenderer,
    PieChart,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent,
    AxisPointerComponent
]);
defineProps({
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});
const { getPaletteColor, changeAlpha } = colors
const { filterDashboard } = useDashboardComposable()
const loading = ref<boolean>(false)
const paymentMethods = ref<any>({})

async function getPaymentMethodsTransactions(query: QueryParameters = {}): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('payment_method', query) // redraw map to remove markers
        if (status === 200) paymentMethods.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}
watch(filterDashboard, (value) => {
    getPaymentMethodsTransactions(value)
})

getPaymentMethodsTransactions()

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
            name: 'Payment Methods',
            type: 'pie',
            roseType: 'area',
            color: [getPaletteColor('secondary'), getPaletteColor('primary'), getPaletteColor('accent'), Dark.isActive ? getPaletteColor('grey-2') : getPaletteColor('grey-10')],
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
                {
                    value: paymentMethods.value?.credit_card, name: 'Credito', itemStyle: {
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: getPaletteColor('secondary')
                            },
                            {
                                offset: 0,
                                color: changeAlpha(getPaletteColor('secondary'), 0.7)
                            }])
                    }
                },
                {
                    value: paymentMethods.value?.debit_card, name: 'Debito', itemStyle: {
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: Dark.isActive ? getPaletteColor('grey-4') : getPaletteColor('grey-10')
                            },
                            {
                                offset: 1,
                                color: changeAlpha(Dark.isActive ? getPaletteColor('grey-4') : getPaletteColor('grey-10'), 0.8)
                            }])
                    }
                },
                {
                    value: paymentMethods.value?.pix, name: 'Pix', itemStyle: {
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: getPaletteColor('primary')
                            },
                            {
                                offset: 1,
                                color: changeAlpha(getPaletteColor('primary'), 0.7)
                            }])
                    }
                },
                {
                    value: paymentMethods.value?.ticket, name: 'Boleto',
                    itemStyle: {
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: getPaletteColor('accent')
                            },
                            {
                                offset: 0,
                                color: changeAlpha(getPaletteColor('accent'), 0.7)
                            }])
                    }
                },
            ]
        }
    ]
}));
</script>

<style></style>