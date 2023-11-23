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
                <q-input v-model="search" type="search" label="Buscar..." dense outlined bg-color="white" debounce="300"
                    clear-icon="sym_r_close" clearable>
                    <template v-slot:prepend>
                        <q-icon name="sym_r_search" />
                    </template>
                </q-input>
                <q-btn :text-color="$q.dark.isActive ? 'white' : ''"
                    :icon="filterDialog ? 'sym_r_filter_list_off' : 'sym_r_filter_list'"
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
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import ListTransaction from '@/components/transaction/ListTransaction.vue'
import FilterListTransaction from '@/components/transaction/FilterListTransaction.vue';
import { useTransactionComposable } from '@/composables/transactionComposable'
const { getTransactions, queryTransaction, setQueryTransaction, filterTransaction, setFilterTransaction } = useTransactionComposable()
const filterDialog = ref<boolean>(false)
const search = ref<string>('')
watch(search, (value) => {
    setQueryTransaction({ ...queryTransaction.value, search: value })
    getTransactions(queryTransaction.value)
})

function onRemoveFilter(item: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [item]: _, ...rest } = filterTransaction.value
    setFilterTransaction(rest)
    setQueryTransaction({ ...queryTransaction.value, [item]: '' })
    getTransactions(queryTransaction.value)
}
</script>s