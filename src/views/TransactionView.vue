
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
            <div class="row q-gutter-md">
                <q-input v-model="search" type="search" label="Buscar..." dense outlined bg-color="white" debounce="300"
                    clear-icon="sym_r_close" clearable>
                    <template v-slot:prepend>
                        <q-icon name="sym_r_search" />
                    </template>
                </q-input>
                <q-btn :text-color="$q.dark.isActive ? 'white' : ''"
                    :icon="filterDialog ? 'sym_r_filter_list_off' : 'sym_r_filter_list'"
                    @click="filterDialog = !filterDialog" dense unelevated padding="sm">
                    <q-badge color="secondary" floating>2</q-badge>
                </q-btn>
            </div>
        </q-toolbar>
        <list-transaction />
    </q-page>
    <q-dialog v-model="filterDialog" persistent position="right" seamless>
        <q-card style="min-width: 356px;" flat bordered>
            <q-toolbar>
                <q-toolbar-title class="text-body1">
                    Filtrar transacoes
                </q-toolbar-title>
                <q-btn flat round dense icon="sym_r_close" v-close-popup />
            </q-toolbar>
            <!-- <q-card-section class="q-gutter-md">
                <q-select v-model="model" :options="options" label="Standard" outlined dense />
                <q-select v-model="model" :options="options" label="Standard" outlined dense />
                <q-select v-model="model" :options="options" label="Standard" outlined dense />
                <q-select v-model="model" :options="options" label="Standard" outlined dense />
            </q-card-section>
            <q-card-section class="row justify-end q-gutter-sm">
                <q-btn color="primary" label="Cancelar" dense unelevated v-close-popup no-caps outline />
                <q-btn color="primary" label="Filtrar" dense unelevated v-close-popup no-caps />
            </q-card-section> -->
        </q-card>
    </q-dialog>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import ListTransaction from '@/components/transaction/ListTransaction.vue'
import { useTransactionComposable } from '@/composables/transactionComposable'
const { getTransactions, queryTransaction, setQueryTransaction } = useTransactionComposable()
const filterDialog = ref<boolean>(false)
const search = ref<string>('')
watch(search, (value) => {
    setQueryTransaction({ ...queryTransaction.value, search: value })
    getTransactions(queryTransaction.value)
})
</script>