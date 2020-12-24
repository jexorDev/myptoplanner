import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard';
import Plan from '@/views/Plan';
import Start from '@/views/Start';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/plan',
    name: 'Plan',
    component: Plan
  },
  {
    path: '/start',
    name: 'Start',
    component: Start
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
