<template>
    <q-table :rows="transactions" row-key="id" flat :columns="columns" :pagination="pagination" hide-pagination
        class="table-card bg-transparent" @row-click="onDetaill">
        <template #body-cell-status="props">
            <q-td :props="props">
                <q-chip
                    :label="props.row.status === 'declined' ? 'Recusado' : props.row.status === 'authorized' ? 'Autorizado' : props.row.status === 'paid' ? 'Pago' : props.row.status === 'canceled' ? 'Cancelado' : props.row.status === 'refunded' ? 'Devolvido' : 'Em Análise'"
                    :color="props.row.status === 'declined' ? 'negative' : props.row.status === 'authorized' ? 'blue' : props.row.status === 'paid' ? 'positive' : props.row.status === 'canceled' ? 'warning' : props.row.status === 'refunded' ? 'orange' : 'dark'"
                    text-color="white" square />
            </q-td>
        </template>
        <template #body-cell-device="props">
            <q-td :props="props">
                <q-chip
                    :label="props.row.device === 'mobile' ? 'Mobile' : props.row.device === 'tablet' ? 'Tablet' : props.row.device === 'desktop' ? 'PC' : 'Cancelado'"
                    square />
            </q-td>
        </template>
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
import { useRouter } from 'vue-router'
const route = useRouter()
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
    { name: 'price', align: 'left', label: 'Valor', field: 'price', format: val => `R$ ${val}` },
    { name: 'device', align: 'left', label: 'Dispositivo', field: 'device' },
    { name: 'status', align: 'left', label: 'Status', field: 'status', },
    { name: 'created_at', align: 'left', label: 'Criado em', field: 'created_at', format: val => date.formatDate(val, 'DD/MM/YYYY HH:mm') },
])
const pagesNumber = computed<number>(() => Math.ceil((countTransactions.value || 0) / pagination.value.rowsPerPage))
function onDetaill(event: Event, row: any): void {
    route.push({ name: 'TransactionDetail', params: { id: row.id } })
}
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