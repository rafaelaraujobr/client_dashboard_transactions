import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { QueryParameters } from '@/utils/helpers'

export const useDashboardStore = defineStore('dashboard', () => {
  const filterDashboard = ref<QueryParameters>({
    from: '',
    to: ''
  })

  function setFilterDashboard(data: any): void {
    filterDashboard.value = data
  }

  return {
    filterDashboard,
    setFilterDashboard
  }
})
