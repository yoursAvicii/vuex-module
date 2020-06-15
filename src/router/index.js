import Vue from 'vue'
import VueRouter from 'vue-router'
import module1 from '../views/module/module.vue'
import module2 from '../views/module2/module2.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'module1',
    component: module1
  },
  {
    path: '/module2',
    name: 'module2',
    component: module2
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
