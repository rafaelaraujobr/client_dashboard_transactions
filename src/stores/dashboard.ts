import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { QueryParameters } from '@/utils/helpers'

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboard = ref<any>({
    id: 1,
    name: 'Dashboard 1'
  })
  const dashboards = ref<any[]>([
    {
      id: 1,
      name: 'Dashboard 1'
    },
    {
      id: 2,
      name: 'Dashboard 2'
    }
  ])
  const gridItems = ref<any[]>([
    {
      id: '1',
      dashboard_id: 1,
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minH: 1,
      minW: 2,
      content: {
        title: 'Valor das transações',
        component: 'AmountValue'
      }
    },
    {
      id: '2',
      dashboard_id: 1,
      x: 3,
      y: 0,
      w: 3,
      h: 1,
      minH: 1,
      minW: 2,
      content: {
        title: 'Quantidade de itens',
        component: 'ItemsSold'
      }
    },
    {
      id: '3',
      dashboard_id: 1,
      x: 6,
      y: 0,
      w: 3,
      h: 1,
      minH: 1,
      minW: 2,
      content: {
        title: 'Transações',
        component: 'AmountTransaction'
      }
    },
    {
      id: '4',
      dashboard_id: 1,
      x: 9,
      y: 0,
      w: 3,
      h: 1,
      minH: 1,
      minW: 3,
      content: {
        title: 'Maior e menor valor',
        component: 'MinMaxSales'
      }
    },
    {
      id: '5',
      dashboard_id: 1,
      x: 0,
      y: 1,
      w: 4,
      h: 3,
      minH: 3,
      minW: 2,
      content: {
        title: 'Transaçoes por dispositivos',
        component: 'DevicesTransaction'
      }
    },
    {
      id: '6',
      dashboard_id: 1,
      x: 4,
      y: 1,
      w: 4,
      h: 3,
      minH: 2,
      minW: 3,
      content: {
        title: 'Metodos de pagamento',
        component: 'PaymentMethod'
      }
    },
    {
      id: '7',
      dashboard_id: 1,
      x: 8,
      y: 1,
      w: 4,
      h: 2,
      minH: 2,
      minW: 2,
      content: {
        title: 'Status de pagamento',
        component: 'PaymentStatus'
      }
    },
    {
      id: '8',
      dashboard_id: 1,
      x: 8,
      y: 3,
      w: 4,
      h: 3,
      minH: 2,
      minW: 3,
      content: {
        title: 'Transaçoes por genero',
        component: 'GenderTransaction'
      }
    },
    {
      id: '9',
      dashboard_id: 1,
      x: 0,
      y: 4,
      w: 8,
      h: 2,
      minH: 2,
      minW: 2,
      content: {
        title: 'Transaçoes por Região',
        component: 'RegionTransaction',
        type: 'line'
      }
    },
    {
      id: '10',
      dashboard_id: 2,
      x: 0,
      y: 0,
      w: 6,
      h: 4,
      minH: 2,
      minW: 2,
      content: {
        title: 'Transaçoes por Região',
        component: 'RegionTransactionHorizontal'
      }
    },
    {
      id: '11',
      dashboard_id: 2,
      x: 0,
      y: 4,
      w: 6,
      h: 2,
      minH: 2,
      minW: 2,
      content: {
        title: 'Transaçoes por Região',
        component: 'RegionTransaction',
        type: 'bar'
      }
    },
    {
      id: '12',
      dashboard_id: 2,
      x: 6,
      y: 0,
      w: 6,
      h: 6,
      minH: 2,
      minW: 2,
      content: {
        title: 'Localizaçao das transaçoes',
        component: 'MapTransaction'
      }
    }
  ])

  function updateGridItem(data: any): void {
    const item = gridItems.value.find((item: any) => item.id == data.id)
    if (item) Object.assign(item, data)
  }

  function setDashboard(data: any): void {
    dashboard.value = data
  }

  const filterDashboard = ref<QueryParameters>({
    from: '',
    to: ''
  })

  function setFilterDashboard(data: any): void {
    filterDashboard.value = data
  }

  return {
    dashboards,
    dashboard,
    gridItems,
    filterDashboard,
    setDashboard,
    setFilterDashboard,
    updateGridItem
  }
})
