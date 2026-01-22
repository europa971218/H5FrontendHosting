import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Accounts from '../views/Accounts.vue'
import Transactions from '../views/Transactions.vue'
import DataOverview from '../views/DataOverview.vue'
import PlatformMonitoring from '../views/PlatformMonitoring.vue'
import Hosting from '../views/Hosting.vue'
import Services from '../views/Services.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/data-overview',
    name: 'DataOverview',
    component: DataOverview
  },
  {
    path: '/platform-monitoring',
    name: 'PlatformMonitoring',
    component: PlatformMonitoring
  },
  {
    path: '/hosting',
    name: 'Hosting',
    component: Hosting
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router