
<template>
    <q-page padding>
        <q-card flat bordered class="wrapper">
            <q-layout view="hHh Lpr fFf" container style="height:500px">
                <q-header class="bg-white text-dark">
                    <q-toolbar>
                        <q-toolbar-title>
                            Transações
                        </q-toolbar-title>
                        <div class="q-gutter-md row">
                            <q-input v-model="search" type="search" label="Buscar..." dense outlined />
                            <q-btn :text-color="$q.dark.isActive ? 'white' : 'primary'"
                                :icon="filterDrawerOpen ? 'sym_r_filter_list' : 'sym_r_filter_list'"
                                @click="filterDrawerOpen = !filterDrawerOpen" dense unelevated padding="sm">
                                <!-- <q-badge color="red" floating>0</q-badge> -->
                            </q-btn>
                        </div>
                    </q-toolbar>
                </q-header>
                <q-drawer bordered side="right" v-model="filterDrawerOpen" style="border-top: 1px solid rgba(0, 0, 0, 0.12)"
                    :class="$q.dark.isActive ? '' : 'bg-white text-dark'" overlay>
                    <q-toolbar>
                        <q-toolbar-title class="text-body1"> Filtros </q-toolbar-title>
                        <q-btn flat round dense icon="sym_r_close" @click="filterDrawerOpen = false" />
                    </q-toolbar>
                </q-drawer>
                <q-page-container>
                    <q-page>
                        <list-transaction />
                    </q-page>
                </q-page-container>
            </q-layout>
        </q-card>
    </q-page>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import ListTransaction from '@/components/transaction/ListTransaction.vue'
const filterDrawerOpen = ref<boolean>(false)
const search = ref<string>('')
</script>