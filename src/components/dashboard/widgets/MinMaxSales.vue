<template>
    <q-card :style="{ height: `${size.height}px` }" class="no-scroll">
        <div class="absolute-center full-width">
            <q-item class="text-h5">
                <q-item-section class="text-center">
                    <q-item-label class="text-weight-bold number"> <q-icon name="sym_r_north" color="positive" /> R$ <vue3-autocounter
                            :startAmount="0" :endAmount="minMax.max" :duration="1" :autoinit="true"
                            separator="." /></q-item-label>
                    <q-item-label class="text-caption" lines="2">Maior valor</q-item-label>
                </q-item-section>
                <q-item-section class="text-center">
                    <q-item-label class="text-weight-bold number"> <q-icon name="sym_r_south" color="negative" /> R$ <vue3-autocounter
                            :startAmount="0" :endAmount="minMax.min" :duration="1" :autoinit="true"
                            separator="." /></q-item-label>
                    <q-item-label lines="2" class="text-caption">Menor valor </q-item-label>
                </q-item-section>
            </q-item>
        </div>
    </q-card>
    <div class="absolute-center fit z-top flex flex-center" :class="Dark.isActive ? 'bg-grey-10' : 'bg-white'"
        v-show="loading"> <q-spinner-oval color="primary" size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { getWidgetByTypeService } from '@/services/transactionServices';
import { defineProps, ref, watch } from 'vue';
import { Dark } from 'quasar'
import Vue3Autocounter from 'vue3-autocounter';
import { useDashboardComposable } from '@/composables/dashboardComposable';
import type { QueryParameters } from '@/utils/helpers';

defineProps({
    item: {
        type: Object,
        required: true,
    },
    size: {
        type: Object,
        required: true
    },
});
const { filterDashboard } = useDashboardComposable()
const loading = ref<boolean>(false)
const minMax = ref<any>({ min: 0, max: 0 })

async function getDeviceTransactions(query: QueryParameters = {}): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('min_max', query) // redraw map to remove markers
        if (status === 200) minMax.value = { min: +data?.min, max: +data?.max }

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}

watch(filterDashboard, (value) => {
    getDeviceTransactions(value)
})


getDeviceTransactions()
</script>