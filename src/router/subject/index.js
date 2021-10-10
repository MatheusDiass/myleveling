//Views
import MylevSubject from '../../views/Mylev-Subject.vue'
import MylevListSubject from '../../views/Mylev-ListSubject.vue'
import MylevEditSubject from '../../views/Mylev-EditSubject.vue'

/*
Helper para verificar se o token é valido e se o usuário tem
permissão para acessar a rota
*/
import checkPermission from '@/helpers/checkPermission'

export const subjectRoutes = [
    //Página para adicionar uma matéria
  {
    path: '/admin/subjects/add',
    name: 'AddSubject',
    component: MylevSubject,
    async beforeEnter(to, from, next) {
      await checkPermission(to, from, next);
    },
  },

  //Página para editar uma matéria
  {
    path:'/admin/subjects/edit/:id',
    name: 'EditSubject',
    component: MylevEditSubject
  },

  //Página para listar as matérias
  {
    path: '/admin/subjects',
    name: 'ListSubjects',
    component: MylevListSubject,
    /*beforeEnter(to, from, next) {
      next();
      checkPermission(to, from, next);
    },*/
  },
];