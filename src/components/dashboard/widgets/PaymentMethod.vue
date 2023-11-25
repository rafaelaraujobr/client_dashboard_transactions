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
defineProps({
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});
const loading = ref<boolean>(false)
const paymentMethods = ref<any>({})

async function getPaymentMethodsTransactions(): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('payment_method') // redraw map to remove markers
        if (status === 200) paymentMethods.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}

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
            color: [getPaletteColor('primary'), getPaletteColor('secondary'), getPaletteColor('accent'), getPaletteColor('dark')],
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
                { value: paymentMethods.value?.credit_card, name: 'Credito' },
                { value: paymentMethods.value?.debit_card, name: 'Debito' },
                { value: paymentMethods.value?.pix, name: 'Pix' },
                { value: paymentMethods.value?.ticket, name: 'Boleto' },
            ]
        }
    ]
}));
</script>

<style></style>