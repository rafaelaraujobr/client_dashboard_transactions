<template>
    <q-table :rows="rows" row-key="id" flat>
    </q-table>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Transaction {
    id: number
    client: string
    price: string
    quantity: number
    device: string
    status: string
    created_at: string
    updated_at: string
}
const rows = ref<Transaction[]>([
    {
        "id": 1,
        "client": "Gonçalves-de Oliveira",
        "price": "381.76",
        "quantity": 3,
        "device": "desktop",
        "status": "declined",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 2,
        "client": "Saraiva e Filhos",
        "price": "880.38",
        "quantity": 2,
        "device": "desktop",
        "status": "authorized",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 3,
        "client": "Bezerra e Associados",
        "price": "9.64",
        "quantity": 2,
        "device": "tablet",
        "status": "declined",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 4,
        "client": "Deverso Comercial Ltda.",
        "price": "343.61",
        "quantity": 1,
        "device": "tablet",
        "status": "canceled",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 5,
        "client": "Benites e Duarte",
        "price": "762.88",
        "quantity": 1,
        "device": "tablet",
        "status": "canceled",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 6,
        "client": "Madeira e Rezende",
        "price": "8.17",
        "quantity": 3,
        "device": "tablet",
        "status": "authorized",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 7,
        "client": "Serrano-Carvalho",
        "price": "366.73",
        "quantity": 3,
        "device": "tablet",
        "status": "paid",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 8,
        "client": "Rezende e Filhos",
        "price": "478.29",
        "quantity": 3,
        "device": "tablet",
        "status": "authorized",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 9,
        "client": "Ferraz Ltda.",
        "price": "938.47",
        "quantity": 2,
        "device": "desktop",
        "status": "paid",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 10,
        "client": "Ortiz e Flores",
        "price": "928.82",
        "quantity": 2,
        "device": "mobile",
        "status": "authorized",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 11,
        "client": "Roque Ltda.",
        "price": "498.91",
        "quantity": 3,
        "device": "tablet",
        "status": "declined",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 12,
        "client": "Perez e Rico Ltda.",
        "price": "700.77",
        "quantity": 3,
        "device": "desktop",
        "status": "canceled",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 13,
        "client": "Ortega e Escobar",
        "price": "263.43",
        "quantity": 1,
        "device": "tablet",
        "status": "canceled",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 14,
        "client": "Caldeira Comercial Ltda.",
        "price": "481.06",
        "quantity": 1,
        "device": "mobile",
        "status": "declined",
        "created_at": "2023-11-22 21:12:14",
        "updated_at": "2023-11-22 21:12:14"
    },
    {
        "id": 15,
        "client": "Gonçalves e Flores S.A.",
        "price": "982.04",
        "quantity": 3,
        "device": "mobile",
        "status": "canceled",
        "created_at": "2023-11-22 21:12:15",
        "updated_at": "2023-11-22 21:12:15"
    }
],)
</script>