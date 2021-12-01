//Views
import MylevAddSubContent from '../../views/subcontent/Mylev-AddSubContent.vue';
import MylevListSubContent from '../../views/subcontent/Mylev-ListSubContent.vue';
import MylevEditSubContent from '../../views/subcontent/Mylev-EditSubContent.vue';
import MylevSubContent from '../../views/subcontent/Mylev-SubContent.vue';
import MylevSubContents from '../../views/subcontent/Mylev-SubContents.vue';

/*
Helper para verificar se o token é valido e se o usuário tem
permissão para acessar a rota
*/
import checkPermission from '@/helpers/checkPermission';

export const subContentRoutes = [
   //Página para adicionar uma matéria
   {
      path: '/admin/subcontent/add',
      name: 'AddSubContent',
      component: MylevAddSubContent,
      async beforeEnter(to, from, next) {
         await checkPermission(to, from, next);
      },
   },

   //Página para listar as matérias
   {
      path: '/admin/subcontents',
      name: 'ListSubContents',
      component: MylevListSubContent,
      async beforeEnter(to, from, next) {
         await checkPermission(to, from, next);
      },
   },

   {
      path: '/admin/subcontent/edit/:id',
      name: 'EditSubContent',
      component: MylevEditSubContent,
      async beforeEnter(to, from, next) {
         await checkPermission(to, from, next);
      },
   },

   //Página onde a matéria é exibida para o aluno
   {
      path: '/subcontent/:id',
      name: 'SubContent',
      component: MylevSubContent,
   },

   //Página onde as matéria de uma disciplina é exibida para o aluno
   {
      path: '/subcontents/:id',
      name: 'SubContents',
      component: MylevSubContents,
   },
];
