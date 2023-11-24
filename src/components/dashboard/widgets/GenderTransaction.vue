<template>
    <v-chart :option="option" :style="`height:${size.height}px; width:${size.width}px;`" class="no-scroll" autoresize />
</template>
<script lang="ts" setup>
import { computed } from "vue";
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
const { getPaletteColor } = colors
defineProps({
    size: {
        type: Object,
        default: () => ({ height: 100, width: 100 }),
        required: false,
    },
});

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
            radius: ['70%', '120%'],
            center: ['50%', '80%'],
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
                { value: 40, name: 'Mobile' },
                { value: 38, name: 'Desktop' },
                { value: 32, name: 'Tablet' },
                {
                    value: 40 + 38 + 32,
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