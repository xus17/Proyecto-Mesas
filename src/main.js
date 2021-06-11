import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'


Vue.use(firestorePlugin)
Vue.use(VueRouter)
Vue.use(Notifications)
Vue.use(VueConfirmDialog)


import Home from './components/Home.vue'
import Login from './Vistas/Login.vue'
import Admin from './Vistas/Admin.vue'
import Reserva from './Vistas/Reserva.vue'
import Editarborrar from './Vistas/Editar-Borrar.vue'
import VueConfirmDialog from 'vue-confirm-dialog'



Vue.component(Home)
Vue.component(Login)
Vue.component(Admin)
Vue.component(Reserva)
Vue.component(Editarborrar)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

const routes = [
  {
    path: '/',
    name: 'home',
    component : Home  
  }  ,
  {
    path: '/login',
    name: 'login',
    component: Login
  }, 
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path:'/reserva',
    name: 'reserva',
    component: Reserva
  },
  {
    path:'/editarborrar',
    name: 'editarborrar',
    component: Editarborrar
  }
]

const router = new VueRouter({
  routes
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')

