//Views
import MylevSubject from '../../views/subject/Mylev-Subject.vue'
import MylevListSubject from '../../views/subject/Mylev-ListSubject.vue'
import MylevEditSubject from '../../views/subject/Mylev-EditSubject.vue'

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
    component: MylevEditSubject,
    async beforeEnter(to, from, next) {
      await checkPermission(to, from, next);
    },
  },

  //Página para listar as matérias
  {
    path: '/admin/subjects',
    name: 'ListSubjects',
    component: MylevListSubject,
    async beforeEnter(to, from, next) {
      await checkPermission(to, from, next);
    },
  },
];