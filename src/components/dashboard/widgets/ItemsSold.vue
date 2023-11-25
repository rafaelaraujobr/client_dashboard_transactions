<template>
    <q-card :style="{ height: `${size.height}px` }" class="no-scroll">
        <div class="absolute-center" style="min-width: 300px;">
            <q-item class="text-h4">
                <q-item-section class="text-center">
                    <q-item-label class="text-weight-bold number"><vue3-autocounter :startAmount="0" :endAmount="itemsSold"
                            :duration="1" :autoinit="true" separator="." /></q-item-label>
                    <q-item-label class="text-caption" lines="2">Quantidade total de itens</q-item-label>
                </q-item-section>
            </q-item>
        </div>
    </q-card>
    <div class="absolute-center fit z-top flex flex-center" :class="Dark.isActive ? 'bg-grey-10' : 'bg-white'"
        v-show="loading"> <q-spinner-cube color="primary" size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { getWidgetByTypeService } from '@/services/transactionServices';
import { defineProps, ref } from 'vue';
import Vue3Autocounter from 'vue3-autocounter';
import { Dark } from 'quasar'

defineProps({
    size: {
        type: Object,
        required: true
    },
});

const loading = ref<boolean>(false)
const itemsSold = ref<any>(0)

async function getItemsSoldTransactions(): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('quantity') // redraw map to remove markers
        if (status === 200) itemsSold.value = +data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}

getItemsSoldTransactions()
</script>