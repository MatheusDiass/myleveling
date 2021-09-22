import Vue from "vue";
import VueRouter from "vue-router";

//Views
import MylevHome from '../views/Mylev-Home.vue'
import MylevRegister from '../views/Mylev-Register.vue'
import MylevLogin from '../views/Mylev-Login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MylevHome
  },
  {
    path: '/register',
    name: 'Register',
    component: MylevRegister
  },
  {
    path: '/login',
    name: 'Login',
    component: MylevLogin
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
