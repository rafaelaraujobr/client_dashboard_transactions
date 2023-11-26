<template>
    <q-input @clear="onClear" clear-icon="sym_r_close" @click="popupRef.show()" v-model="dateRange" v-bind="$attrs"
        placeholder="Filtrar por data" ref="inputRef">
        <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" :color="colorIcon">
                <q-popup-proxy ref="popupRef">
                    <q-date today-btn range v-model="proxyDate" @range-end="popupRef.hide()" color="accent" />
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>
  
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { date } from 'quasar'
const proxyDate = ref<any>(null)
const dateRange = ref<any>(null)
const inputRef = ref<any>(null)
const popupRef = ref<any>(null)
const emit = defineEmits(['update'])
defineProps({
    colorIcon: {
        type: String,
        required: false,
        default: 'primary'
    },
})
watch(proxyDate, (value: any) => {
    if (value) {
        dateRange.value =
            value.from && value.to
                ? `${date.formatDate(value.from, 'DD/MM/YYYY')} - ${date.formatDate(value.to, 'DD/MM/YYYY')}`
                : date.formatDate(value, 'DD/MM/YYYY')
    } else dateRange.value = null
    if (value.from && value.to) emit('update', value)
})
function onClear() {
    dateRange.value = null
    proxyDate.value = { from: null, to: null }
    emit('update', proxyDate.value)
}
</script>
  