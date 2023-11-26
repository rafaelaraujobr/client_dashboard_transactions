
<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        Dashboard
      </q-toolbar-title>
      <div class="row q-gutter-md items-center">
        <q-select v-model="dashboardSelect" :options="dashboards" option-label="name" option-value="id"
          :bg-color="$q.dark.isActive ? 'grey-10' : 'white'" style="width: 220px;" dense outlined label-color="white"
          dropdown-icon="sym_r_expand_more" transition-show="flip-up" transition-hide="flip-down" />
        <input-date-ranger @update="setFilterDashboard" dense borderless clearable style="width: 220px;" outlined
          :bg-color="$q.dark.isActive ? 'grey-10' : 'white'" />
      </div>
    </q-toolbar>
    <grid-layout />
  </q-page>
</template>

<script setup lang="ts">
import GridLayout from '@/components/dashboard/GridLayout.vue'
import { useDashboardComposable } from '@/composables/dashboardComposable';
import { computed } from 'vue'
import InputDateRanger from '@/components/InputDateRanger.vue';
const { setFilterDashboard, dashboards, dashboard, setDashboard } = useDashboardComposable()
const dashboardSelect = computed({
  get: () => dashboard.value,
  set: (value) => {
    setDashboard(value)
  }
})
</script>