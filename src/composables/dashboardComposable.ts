import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'

export const useDashboardComposable = () => {
  const { setFilterDashboard } = useDashboardStore()
  const { filterDashboard } = storeToRefs(useDashboardStore())

  return {
    filterDashboard,
    setFilterDashboard
  }
}
