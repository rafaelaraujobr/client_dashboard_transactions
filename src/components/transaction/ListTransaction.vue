<template>
    <q-table :rows="transactions" row-key="id" flat :columns="columns" :pagination="pagination" hide-pagination>
    </q-table>
    <div class="row item-center q-mt-sm" :class="$q.screen.lt.sm ? 'justify-center' : 'justify-center'"
        v-if="countTransactions > pagination.rowsPerPage">
        <q-pagination v-if="pagination.rowsPerPage !== 0" v-model="page" :max="pagesNumber"
            :max-pages="$q.screen.lt.sm ? 4 : 9" active-design="unelevated" :color="$q.dark.isActive ? 'white' : 'dark'"
            active-color="primary" direction-links gutter="sm" />
    </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { QTableProps } from 'quasar';
import { useTransactionComposable } from '@/composables/transactionComposable'
import { date } from 'quasar'
const { getTransactions, transactions, queryTransaction, setQueryTransaction, countTransactions } = useTransactionComposable()
const pagination = ref<any>({
    rowsPerPage: 10,
    sortBy: 'created_at',
    descending: true
})
const page = ref<number>(1)
const columns = ref<QTableProps['columns']>([
    {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
    },
    {
        name: 'client',
        required: true,
        label: 'Cliente',
        align: 'left',
        field: row => row.client,
        format: val => `${val}`,
    },
    { name: 'price', align: 'center', label: 'Preço', field: 'price' },
    { name: 'quantity', align: 'center', label: 'Quantidade', field: 'quantity' },
    { name: 'device', align: 'center', label: 'Dispositivo', field: 'device' },
    { name: 'status', align: 'center', label: 'Status', field: 'status', },
    { name: 'created_at', align: 'center', label: 'Criado em', field: 'created_at', format: val => date.formatDate(val, 'DD/MM/YYYY HH:mm') },
])
const pagesNumber = computed<number>(() => Math.ceil((countTransactions.value || 0) / pagination.value.rowsPerPage))
watch(() => page.value, () => {
    const query = {
        page: page.value,
        perPage: pagination.value.rowsPerPage,
    }
    setQueryTransaction({ ...queryTransaction.value, ...query })
    getTransactions(queryTransaction.value)
})
getTransactions(queryTransaction.value)


</script>