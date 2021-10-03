import Vue from "vue";
import VueRouter from "vue-router";

//Views
import MylevHome from '../views/Mylev-Home.vue'
import MylevRegister from '../views/Mylev-Register.vue'
import MylevSubject from '../views/Mylev-Subject.vue'
import MylevLogin from '../views/Mylev-Login.vue'
import MylevAddSubContent from '../views/Mylev-AddSubContent.vue'
import MylevEditSubject from '../views/Mylev-EditSubject.vue'
import MylevListSubject from '../views/Mylev-ListSubject.vue'

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
    path: '/addsubject',
    name: 'AddSubject',
    component: MylevSubject
  },
  {
    path: '/login',
    name: 'Login',
    component: MylevLogin
  },
  {
    path: '/addsubContent',
    name: 'AddSubContent',
    component: MylevAddSubContent
  },
  {
    path:'/editsubject/:id',
    name: 'EditSubject',
    component: MylevEditSubject
  },
  {
    path: '/listsubjects',
    name: 'ListSubjects',
    component: MylevListSubject
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
