<template>
    <q-card :style="{ height: `${size.height}px` }" class="no-scroll">
        <div class="absolute-center" style="min-width: 300px;">
            <q-item class="text-h4">
                <q-item-section class="text-center">
                    <q-item-label class="text-weight-bold number">R$ <vue3-autocounter :startAmount="0"
                            :endAmount="amountValue" :duration="1" :autoinit="true" separator="." /></q-item-label>
                    <q-item-label class="text-caption" lines="2">Valor total das transações pagas</q-item-label>
                </q-item-section>
            </q-item>
        </div>
    </q-card>
    <div class="absolute-center fit z-top flex flex-center " :class="Dark.isActive ? 'bg-grey-10' : 'bg-white'"
        v-show="loading"> <q-spinner-oval color="primary" size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { getWidgetByTypeService } from '@/services/transactionServices';
import { defineProps, ref, watch } from 'vue';
import Vue3Autocounter from 'vue3-autocounter';
import { Dark } from 'quasar'
import type { QueryParameters } from '@/utils/helpers';
import { useDashboardComposable } from '@/composables/dashboardComposable';
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
const amountValue = ref<number>(0)

async function getAmountValueTransactions(query: QueryParameters = {}): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('revenue', query) // redraw map to remove markers
        if (status === 200) amountValue.value = +data
    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}
watch(filterDashboard, (value) => {
    getAmountValueTransactions(value)
})
getAmountValueTransactions()
</script>