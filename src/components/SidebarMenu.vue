<template>
    <q-scroll-area style="height:calc(100% - 70px)">
        <q-list>
            <template v-for="item in menus" :key="item.id">
                <q-item clickable dense :to="{ path: item.route }"
                    class="q-mx-md q-my-xs q-py-xs q-px-sm item-menu rounded-borders" color="secondary" :class="currentRoute === item.route
                        ? mine
                            ? 'q-mx-sm item-menu-active'
                            : 'q-mx-md item-menu-active'
                        : mine
                            ? 'q-mx-sm'
                            : 'q-mx-md'
                        ">
                    <q-item-section avatar>
                        <q-icon :name="currentRoute === item.route ? item.icon : `sym_r_${item.icon}`"
                            :color="currentRoute === item.route ? 'secondary' : 'grey-8'"
                            :class="currentRoute === item.route ? 'q-pa-xs' : 'q-pa-xs rounded-borders'" />
                    </q-item-section>
                    <q-item-section :class="currentRoute === item.route ? 'text-weight-medium text-secondary' : 'text-grey-8'">{{
                        item.label
                    }}</q-item-section>
                </q-item>
            </template>
        </q-list>
    </q-scroll-area>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const currentRoute = computed<string>((): string => $router.currentRoute.value.path)
defineProps({
    mine: {
        type: Boolean,
        required: true
    },
})
const menus = ref<any[]>([
    {
        icon: 'dashboard',
        label: 'Painel de controle',
        route: '/dashboard',
        children: []
    },
    {
        icon: 'sync',
        label: 'Transacoes',
        route: '/transactions',
        children: []
    },
    {
        icon: 'live_help',
        label: 'Sobre',
        route: '/about',
        children: []
    }
])
</script>
<style lang="sass" >

  </style> 
  