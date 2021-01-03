import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard';
import Planner from '@/views/Planner';
import Start from '@/views/Start';
import Settings from '@/views/Settings';
//import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/planner',
    name: 'Planner',
    component: Planner
  },
  {
    path: '/start',
    name: 'Start',
    component: Start
  },
    {
    path: '/settings',
    name: 'Settings',
    component: Settings
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

// router.beforeEach((from, to, next) => {
//   if (to.path !== "/start") {
//     if (!store.state.plans || store.state.plans.length === 0) {
//       next({ path: "/start" });
//     } else {
//       next();
//     }

//   }

//   next();

// });

export default router
