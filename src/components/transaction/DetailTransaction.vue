<template>
    <q-card flat style="width: 600px;" bordered>
        <q-toolbar>
            <q-toolbar-title class="text-body1">
                Detalhes
            </q-toolbar-title>
            <q-btn flat round dense icon="sym_r_close" to="/transactions" />
        </q-toolbar>
        <q-separator />
        <q-card-section class="q-pt-none">
            <q-list>
                <q-item>
                    <q-item-section side>
                        <q-icon name="sym_r_store" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Empresa</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label>{{ transaction.client }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                    <q-item-section side>
                        <q-icon name="sym_r_person" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Genero</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label lines="2">{{ transaction.gender }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                    <q-item-section side>
                        <q-icon name="sym_r_payments" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Valor</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label lines="2">R$ {{ transaction.value }} x {{ transaction.quantity }} = <span
                                class="text-body1 text-weight-bold">R${{
                                    transaction.value * transaction.quantity }}</span> </q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                    <q-item-section side>
                        <q-icon name="sym_r_paid" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Metodo de pagamento</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label lines="2">{{ transaction.payment_method }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                    <q-item-section side>
                        <q-icon name="sym_r_thumbs_up_down" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Status do pagamento</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label lines="2">{{ transaction.payment_status }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                    <q-item-section side>
                        <q-icon name="sym_r_my_location" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Dados de localizaçao</q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                        <q-item-label>{{ transaction.region }}</q-item-label>
                        <q-item-label>{{ transaction.lat }} , {{ transaction.long }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                    <q-item-section side>
                        <q-icon name="sym_r_devices" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Dispositivo</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label>{{ transaction.device }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item>
                    <q-item-section side top>
                        <q-icon name="sym_r_location_on" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Ip - UserAgent</q-item-label>
                        <q-item-label caption lines="2">{{ transaction.user_agent }}</q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                        <q-item-label>{{ transaction.ip }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card-section>
    </q-card>
</template>
<script lang="ts" setup>
import { onUnmounted } from 'vue'
import { useTransactionComposable } from '@/composables/transactionComposable'
const { transaction, getTransactionById, setTransaction } = useTransactionComposable()
const props = defineProps({
    id: {
        type: String,
        required: false,
        default: ''
    },
})
if (props.id) getTransactionById(+props.id)

onUnmounted(() => {
    setTransaction({})
})	
</script>	