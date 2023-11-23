<template>
    <q-layout view="hHh lpR fFf">
        <q-header :class="$q.dark.isActive ? 'bg-dark' : 'bg-white text-dark'" reveal bordered>
            <q-toolbar class="q-pl-none">
                <q-btn icon="sym_r_notes" @click="toggleLeftDrawer" :text-color="$q.dark.isActive ? 'white' : 'primary'"
                    unelevated dense flat padding="13px 23.6px" class="no-border-radius" />
                <q-separator vertical />
                <q-toolbar-title>
                    logotipo <q-badge class="absolute text-caption" color="dark" style="top: 5px">beta</q-badge>
                </q-toolbar-title>
                <q-space />
                <div class="q-gutter-md">
                    <q-btn :text-color="$q.dark.isActive ? 'white' : 'primary'" class="q-card--bordered"
                        icon="sym_r_notifications" @click="rightDrawerOpen = !rightDrawerOpen" dense round unelevated>
                        <q-badge color="red" floating>0</q-badge>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>
        <q-drawer :mini="!leftDrawerOpen || miniState" v-model="leftDrawerOpen" bordered :mini-width="72" show-if-above
            :class="$q.dark.isActive ? '' : 'bg-white text-dark'">
            <div class="absolute" :style="`top:45px; right: -18px`">
                <q-btn dense round unelevated :icon="!miniState ? 'sym_r_chevron_left' : 'sym_r_chevron_right'"
                    @click="miniState = !miniState" class="q-card--bordered" :color="$q.dark.isActive ? 'dark' : 'grey-2'"
                    :text-color="$q.dark.isActive ? 'white' : 'primary'" />
            </div>
        </q-drawer>
        <q-drawer side="right" v-model="rightDrawerOpen" :class="$q.dark.isActive ? '' : 'bg-white text-dark'" overlay
            bordered style="border-top: 1px solid rgba(0, 0, 0, 0.12)">
            <q-toolbar>
                <q-toolbar-title class="text-body1"> Notificacoes </q-toolbar-title>
                <q-btn flat round dense icon="sym_r_close" @click="drawerClick" />
            </q-toolbar>
        </q-drawer>
        <q-page-container :class="!$q.dark.isActive ? 'bg-grey-1' : ''">
            <router-view />
        </q-page-container>
    </q-layout>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
const leftDrawerOpen = ref<boolean>(false)
const rightDrawerOpen = ref<boolean>(false)
const miniState = ref<boolean>(false)
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}
function drawerClick(e: Event) {
    if (miniState.value) {
        miniState.value = false
        e.stopPropagation()
    }
}
</script>