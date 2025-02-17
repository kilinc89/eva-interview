// src/router/index.ts
/* import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
 */


// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import LoginView from '../components/LoginView.vue'
import DashboardView from '../components/DashboardView.vue'
import store from '../store'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: DashboardView,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      // Vuex store'dan auth state'ini kontrol et
      const isAuthenticated = store.getters['auth/isLoggedIn']

      if (!isAuthenticated) {
        next('/login')
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
