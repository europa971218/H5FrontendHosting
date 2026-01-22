import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Accounts from '../views/Accounts.vue'
import Transactions from '../views/Transactions.vue'
import DataOverview from '../views/DataOverview.vue'
import PlatformMonitoring from '../views/PlatformMonitoring.vue'
import Hosting from '../views/Hosting.vue'
import Services from '../views/Services.vue'
import Login from '../views/Login.vue'
import Applications from '../views/Applications.vue'
import Settings from '../views/Settings.vue'
import AppOverview from '../views/AppOverview.vue'
import LinkManagement from '../views/LinkManagement.vue'
import Audit from '../views/Audit.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
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
  },
  {
    path: '/applications',
    name: 'Applications',
    component: Applications
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/app-overview',
    name: 'AppOverview',
    component: AppOverview
  },
  {
    path: '/link-management',
    name: 'LinkManagement',
    component: LinkManagement
  },
  {
    path: '/audit',
    name: 'Audit',
    component: DataOverview
  },
  {
    path: '/operation-audit',
    name: 'OperationAudit',
    component: DataOverview
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router