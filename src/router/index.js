import Vue from "vue";
import VueRouter from "vue-router";

//Views
import MylevHome from '../views/Mylev-Home.vue'
import MylevRegister from '../views/Mylev-Register.vue'
import MylevSubject from '../views/Mylev-Subject.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MylevHome
  },
  {
    path: '/Register',
    name: 'Register',
    component: MylevRegister
  },
  {
    path: '/AddSubject',
    name: 'AddSubject',
    component: MylevSubject
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
