import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'

export const useDashboardComposable = () => {
  const { setFilterDashboard, setDashboard, updateGridItem } = useDashboardStore()
  const { filterDashboard, dashboard, gridItems, dashboards } = storeToRefs(useDashboardStore())

  return {
    dashboard,
    dashboards,
    gridItems,
    filterDashboard,
    setFilterDashboard,
    setDashboard,
    updateGridItem
  }
}
