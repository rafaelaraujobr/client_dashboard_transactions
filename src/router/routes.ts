import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Main',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        redirect: '404'
      },
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "main" */ '@/views/DashboardView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: () => import(/* webpackChunkName: "transaction" */ '@/views/TransactionView.vue'),
        props: true,
        children: [
          {
            path: ':id/',
            name: 'EditBrand',
            component: () => import(/* webpackChunkName: "brand" */ '@/views/TransactionView.vue'),
          },
        ]
      },
      {
        path: '404',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "404" */ '@/views/NotFountView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import(/* webpackChunkName: "main" */ '@/views/AboutView.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

export default routes
