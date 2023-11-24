<template>
    <q-card :style="{ height: `${size.height}px` }" class="no-scroll">
        <div class="absolute-center full-width">
            <q-item class="text-h5">
                <q-item-section avatar>
                    <q-avatar color="positive" text-color="white" icon="sym_r_north" font-size="30px" size="50px" />
                </q-item-section>
                <q-item-section>
                    <q-item-label class="text-weight-bold">R$ <vue3-autocounter :startAmount="0" :endAmount="minMax.max"
                            :duration="1" :autoinit="true" separator="." /></q-item-label>
                    <q-item-label class="text-caption" lines="2">Maior valor</q-item-label>
                </q-item-section>
                <q-item-section avatar class="q-mr-md">
                    <q-avatar color="negative" text-color="white" icon="sym_r_south" font-size="30px" size="50px" />
                </q-item-section>S
                <q-item-section>
                    <q-item-label class="text-weight-bold"> R$ <vue3-autocounter :startAmount="0" :endAmount="minMax.min"
                            :duration="1" :autoinit="true" separator="." /></q-item-label>
                    <q-item-label lines="2" class="text-caption">Menor valor </q-item-label>
                </q-item-section>
            </q-item>
        </div>
    </q-card>
    <div class="absolute-center fit z-top flex flex-center  bg-white" v-show="loading"> <q-spinner-cube color="primary"
            size="5.5em" />
    </div>
</template>
<script lang="ts" setup>
import { getWidgetByTypeService } from '@/services/transactionServices';
import { defineProps, ref } from 'vue';
import Vue3Autocounter from 'vue3-autocounter';

defineProps({
    size: {
        type: Object,
        required: true
    },
});

const loading = ref<boolean>(false)
const minMax = ref<any>({})

async function getDeviceTransactions(): Promise<void> {
    loading.value = true
    try {
        const { status, data } = await getWidgetByTypeService('min_max') // redraw map to remove markers
        if (status === 200) minMax.value = data

    } catch (error: any) {
        console.log(error?.response?.data?.message)
    } finally {
        loading.value = false
    }
}

getDeviceTransactions()
</script>