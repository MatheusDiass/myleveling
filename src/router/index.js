import Vue from "vue";
import VueRouter from "vue-router";

//Views
import MylevHome from '../views/Mylev-Home.vue'
import MylevLogin from '../views/Mylev-Login.vue'
import MylevRegister from '../views/Mylev-Register.vue'
import MylevConfirmRegister from '../views/Mylev-ConfirmRegister.vue'
import MylevProfile from '../views/Mylev-Profile'

//Routes
import { subjectRoutes } from './subject'
import { subContentRoutes } from './subcontent'

/*
Helper para verificar se o token é valido e se o usuário tem
permissão para acessar a rota
*/
import checkPermission from '@/helpers/checkPermission'

Vue.use(VueRouter);

const routes = [
  //Página Home
  {
    path: '/',
    name: 'Home',
    component: MylevHome
  },

  //Página de Login
  {
    path: '/login',
    name: 'Login',
    component: MylevLogin,
  },

  //Página de Cadastro
  {
    path: '/register',
    name: 'Register',
    component: MylevRegister
  },

  //Página para confirmar cadastro
  {
    path: '/register/confirm/:id',
    name: 'ConfirmRegister',
    component: MylevConfirmRegister
  },

  //Página do Perfil
  {
    path: '/profile',
    name: 'Profile',
    component: MylevProfile,
    async beforeEnter(to, from, next) {
      await checkPermission(to, from, next);
    },
  },
];

const allRoutes = routes.concat(subjectRoutes, subContentRoutes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: allRoutes,
});

export default router;
