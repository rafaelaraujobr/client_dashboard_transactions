<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<template>
    <q-page class="wrapper" padding>
        <q-breadcrumbs v-if="!$q.screen.lt.sm">
            <template v-slot:separator>
                <q-icon size="1.2em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el label="Principal" to="/" />
            <q-breadcrumbs-el label="Transações" />
        </q-breadcrumbs>
        <q-toolbar class="q-px-none q-my-sm">
            <q-toolbar-title> Transações </q-toolbar-title>
            <div class="row q-gutter-md items-center">
                <template v-for="item in Object.keys(filterTransaction)" :key="item">
                    <q-chip removable @remove="onRemoveFilter(item)" icon-remove="sym_r_close" :label="item"
                        text-color="white" color="primary" />
                </template>
                <q-input v-model="search" type="search" label="Buscar..." dense outlined
                    :bg-color="$q.dark.isActive ? 'grey-10' : 'white'" debounce="300" clear-icon="sym_r_close" clearable>
                    <template v-slot:prepend>
                        <q-icon name="sym_r_search" />
                    </template>
                </q-input>
                <input-date-ranger @update="onFilterDate" dense outlined :bg-color="$q.dark.isActive ? 'grey-10' : 'white'"/>
                <q-btn :text-color="$q.dark.isActive ? 'white' : 'dark'" :color="$q.dark.isActive ? 'primary' : 'white'"
                    :icon="filterDialog ? 'sym_r_filter_list_off' : 'sym_r_filter_list'" class="borderless q-card--bordered"
                    @click="filterDialog = !filterDialog" dense unelevated padding="sm">
                    <q-badge color="secondary" floating v-if="Object.keys(filterTransaction).length > 0">
                        {{ Object.keys(filterTransaction).length }}</q-badge>
                </q-btn>
            </div>
        </q-toolbar>
        <list-transaction />
    </q-page>
    <q-dialog v-model="filterDialog" persistent position="right" seamless>
        <filter-list-transaction @close="filterDialog = false" />
    </q-dialog>
    <q-dialog v-model="detailDialog" persistent>
        <detail-transaction @close="detailDialog = false" :id="id" />
    </q-dialog>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import ListTransaction from '@/components/transaction/ListTransaction.vue'
import InputDateRanger from '@/components/InputDateRanger.vue'
import FilterListTransaction from '@/components/transaction/FilterListTransaction.vue';
import DetailTransaction from '@/components/transaction/DetailTransaction.vue';
import { useTransactionComposable } from '@/composables/transactionComposable'
const { getTransactions, queryTransaction, setQueryTransaction, filterTransaction, setFilterTransaction } = useTransactionComposable()
const filterDialog = ref<boolean>(false)
const detailDialog = ref<boolean>(false)
const search = ref<string>('')
const props = defineProps({
    id: {
        type: String,
        required: false,
        default: ''
    },
})
watch(search, (value) => {
    setQueryTransaction({ ...queryTransaction.value, search: value })
    getTransactions(queryTransaction.value)
})

watch(() => props.id, () => {
    onOpenDetail()
})
function onRemoveFilter(item: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [item]: _, ...rest } = filterTransaction.value
    setFilterTransaction(rest)
    setQueryTransaction({ ...queryTransaction.value, [item]: '' })
    getTransactions(queryTransaction.value)
}
function onFilterDate(date: any): void {
    setQueryTransaction({ ...queryTransaction.value, ...date })
    getTransactions(queryTransaction.value)
}
function onOpenDetail(): void {
    if (props.id) detailDialog.value = true
    else detailDialog.value = false
}

</script>s