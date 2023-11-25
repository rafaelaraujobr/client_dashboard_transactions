<template>
    <q-layout view="hHh Lpr fFf">
        <q-header>
            <q-toolbar class="q-pl-none">
                <q-btn icon="sym_r_notes" @click="toggleLeftDrawer" unelevated dense flat padding="13px 23.6px"
                    class="no-border-radius" />
                <q-separator inset vertical dark />
                <q-toolbar-title>
                    <!-- <q-img src="@/assets/logotipo.svg" width="150px" /> -->
                    <q-skeleton :type="'react'" style="width: 150px"  class="bg-secondary" />
                    <!-- <q-badge class="absolute text-caption" color="secondary" style="top: 5px">beta</q-badge> -->
                </q-toolbar-title>
                <q-space />
                <div class="q-gutter-md">
                    <q-btn flat dense round unelevated
                        @click="$q.fullscreen.toggle(), leftDrawerOpen = $q.fullscreen.isActive"
                        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
                    <q-btn flat dense round unelevated @click="$q.dark.toggle()"
                        :icon="$q.dark.isActive ? 'sym_r_dark_mode' : 'sym_r_light_mode'" />
                    <q-btn icon="sym_r_notifications" @click="rightDrawerOpen = !rightDrawerOpen" dense round unelevated>
                        <q-badge color="red" floating>0</q-badge>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>
        <q-drawer :mini="!leftDrawerOpen || miniState" v-model="leftDrawerOpen" :mini-width="72" show-if-above bordered
            :class="$q.dark.isActive ? '' : 'bg-white'">
            <sidebar-menu :mine="miniState" />
            <div class="absolute" :style="`top:80px; right: -18px`">
                <q-btn dense round unelevated :icon="!miniState ? 'sym_r_chevron_left' : 'sym_r_chevron_right'"
                    @click="miniState = !miniState" class="q-card--bordered" :color="$q.dark.isActive ? 'dark' : 'grey-2'"
                    :text-color="$q.dark.isActive ? 'white' : 'primary'" />
            </div>
        </q-drawer>
        <q-drawer side="right" v-model="rightDrawerOpen" :class="$q.dark.isActive ? '' : 'bg-white text-dark'" overlay
            bordered>
            <q-toolbar>
                <q-toolbar-title class="text-body1"> Notificacoes </q-toolbar-title>
                <q-btn flat round dense icon="sym_r_close" @click="rightDrawerOpen = false" />
            </q-toolbar>
        </q-drawer>
        <q-page-container :class="!$q.dark.isActive ? 'bg-grey-1' : ''">
            <router-view />
        </q-page-container>
    </q-layout>
</template>
  
<script lang="ts" setup>
import SidebarMenu from '@/components/SidebarMenu.vue';
import { ref } from 'vue'
const leftDrawerOpen = ref<boolean>(false)
const rightDrawerOpen = ref<boolean>(false)
const miniState = ref<boolean>(true)
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>