<template>
    <q-layout view="hHh Lpr fFf">
        <q-header>
            <q-toolbar class="q-pl-none">
                <q-btn icon="sym_r_notes" @click="toggleLeftDrawer" unelevated dense flat padding="13px 23.6px"
                    class="no-border-radius" />
                <q-separator inset vertical dark />
                <q-toolbar-title>
                    <!-- <q-img src="@/assets/logotipo.svg" width="150px" /> -->
                    <q-skeleton type="rect" style="width: 150px" class="bg-secondary" />
                    <!-- <q-badge class="absolute text-caption" color="secondary" style="top: 5px">beta</q-badge> -->
                </q-toolbar-title>
                <q-space />
                <div class="row q-gutter-md items-center">
                    <q-btn flat dense round unelevated
                        @click="$q.fullscreen.toggle(), leftDrawerOpen = $q.fullscreen.isActive"
                        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
                    <q-btn flat dense round unelevated @click="$q.dark.toggle()"
                        :icon="$q.dark.isActive ? 'sym_r_dark_mode' : 'sym_r_light_mode'" />
                </div>
            </q-toolbar>
        </q-header>
        <q-drawer :mini="!leftDrawerOpen || miniState" v-model="leftDrawerOpen" :mini-width="72" show-if-above bordered
            :class="$q.dark.isActive ? '' : 'bg-white'">
            <sidebar-menu :mine="miniState" />
            <div class="absolute" :style="`top:80px; right: -18px`">
                <q-btn dense round unelevated :icon="!miniState ? 'sym_r_chevron_left' : 'sym_r_chevron_right'"
                    @click="miniState = !miniState" class="q-card--bordered"
                    :color="$q.dark.isActive ? 'primary' : 'grey-2'" :text-color="$q.dark.isActive ? 'white' : 'primary'" />
            </div>
        </q-drawer>
        <q-drawer side="right" v-model="filterDrawerTransaction" :class="$q.dark.isActive ? '' : 'bg-white text-dark'"
            :width="400" bordered v-if="routerCurrent == 'Transactions'">
            <filter-list-transaction @close="setFilterDrawerTransaction(false)" />
        </q-drawer>
        <q-page-container :class="!$q.dark.isActive ? 'bg-grey-1' : ''">
            <router-view />
        </q-page-container>
    </q-layout>
</template>
  
<script lang="ts" setup>
import SidebarMenu from '@/components/SidebarMenu.vue';
import FilterListTransaction from '@/components/transaction/FilterListTransaction.vue';
import { useTransactionComposable } from '@/composables/transactionComposable'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const { filterDrawerTransaction, setFilterDrawerTransaction } = useTransactionComposable()
const leftDrawerOpen = ref<boolean>(false)
const miniState = ref<boolean>(true)
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}
const routerCurrent = computed(() => router.currentRoute.value.name)
</script>