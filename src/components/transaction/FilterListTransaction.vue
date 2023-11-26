<template>
    <q-card style="min-width: 356px;" flat bordered>
        <q-toolbar>
            <q-toolbar-title class="text-body1">
                Filtrar
            </q-toolbar-title>
            <q-btn flat round dense icon="sym_r_close" @click="emit('close')" />
        </q-toolbar>
        <q-separator />
        <q-card-section class="q-gutter-md">
            <q-select v-model="form.region" :options="regionList" label="UF" outlined dense map-options />
            <q-select v-model="form.paymentMethod" :options="paymentMethodList" label="Método de pagamento" outlined
                map-options dense />
            <q-select v-model="form.paymentStatus" :options="paymentStatusList" label="Status do pagamento" outlined dense
                map-options />
            <q-select v-model="form.gender" :options="genderList" label="Gênero" outlined dense map-options />
            <q-select v-model="form.device" :options="deviceList" label="Dispositivo" outlined dense map-options />
        </q-card-section>
        <q-separator />
        <q-card-section class="row justify-end q-gutter-sm">
            <q-btn color="primary" label="Limpar" dense unelevated no-caps outline
                v-if="Object.keys(filterTransaction).length > 0" @click="onReset" />
            <q-btn color="primary" label="Cancelar" dense unelevated no-caps outline v-else @click="emit('close')" padding="sm lg" />
            <q-btn color="primary" label="Filtrar" dense unelevated no-caps @click="onFilter" padding="sm lg"/>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useTransactionComposable } from '@/composables/transactionComposable'
const { setFilterTransaction, queryTransaction, setQueryTransaction, getTransactions, filterTransaction } = useTransactionComposable()
const emit = defineEmits(['close'])
interface formParams {
    [key: string]: string | number | boolean;
}
const form = reactive<formParams>({
    region: '',
    paymentMethod: '',
    paymentStatus: '',
    gender: '',
    device: '',
})
const paymentMethodList = [
    { label: 'Cartão de crédito', value: 'credit_card' },
    { label: 'Cartão de débito', value: 'debit_card' },
    { label: 'Boleto', value: 'ticket' },
    { label: 'Pix', value: 'pix' },
]

const genderList = [
    { label: 'Mulher', value: 'female' },
    { label: 'Homen', value: 'male' },
    { label: 'Outro', value: 'other' },
]

const deviceList = [
    { label: 'Desktop', value: 'desktop' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Tablet', value: 'tablet' },
]

const paymentStatusList = [
    { label: 'Autorizado', value: 'authorized' },
    { label: 'Recusado', value: 'declined' },
    { label: 'Pago', value: 'paid' },
    { label: 'Cancelado', value: 'canceled' },
]
const regionList = [
    { label: 'Rio de janeiro', value: 'RJ' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Pará', value: 'PA' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Tocantins', value: 'TO' },
    { label: 'Acre', value: 'AC' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Roraima', value: 'RR' },
]

function filterNonEmptyAttributes(obj: any): formParams {
    for (const key in obj as any)
        if (obj[key] === '') delete obj[key];
        else obj[key] = obj[key].value
    return obj;
}

function onFilter(): void {
    const filter = filterNonEmptyAttributes({ ...form })
    setFilterTransaction(filter)
    setQueryTransaction({ ...queryTransaction.value, ...filter })
    getTransactions(queryTransaction.value)
    emit('close')
}

function onClear(): void {
    setFilterTransaction({})
    for (const key in form)
        form[key] = ''
}

function onReset(): void {
    onClear()
    setQueryTransaction({ page: 1, perPage: 10 })
    getTransactions(queryTransaction.value)
    emit('close')
}

function onOpen(): void {
    for (const key in filterTransaction.value)
        form[key] = filterTransaction.value[key]
}
onMounted(() => {
    onOpen()
})
</script>