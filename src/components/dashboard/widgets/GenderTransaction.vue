<template>
    <v-chart :option="option" :style="`height:${size.height}px;`" class="no-scroll" autoresize />
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
import { useDashboardComposable } from '@/composables/dashboardComposable';
const { filterDashboard } = useDashboardComposable()
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
import { graphic } from "echarts";
import type { QueryParameters } from "@/utils/helpers";
const { getPaletteColor, changeAlpha } = colors
const loading = ref<boolean>(false)
const genders = ref<any>({})
defineProps({
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});

async function getGenderTransactions(query: QueryParameters = {}): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('gender', query) // redraw map to remove markers
        if (status === 200) genders.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}

watch(filterDashboard, (value) => {
    getGenderTransactions(value)
})

getGenderTransactions()

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
            type: 'pie',
            width: '100%',
            radius: ['70%', '110%'],
            center: ['50%', '85%'],
            startAngle: 180,
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
                    value: genders.value?.female, name: 'Mulheres', itemStyle: {
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
                },
                {
                    value: genders.value?.male, name: 'Homens', itemStyle: {
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: getPaletteColor('primary')
                            },
                            {
                                offset: 0,
                                color: changeAlpha(getPaletteColor('primary'), 0.5)
                            }])
                    }
                },
                {
                    value: genders.value?.other, name: 'Outros', itemStyle: {
                        color: new graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: getPaletteColor('accent')
                            },
                            {
                                offset: 1,
                                color: changeAlpha(getPaletteColor('accent'), 0.8)
                            }])
                    }
                },
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