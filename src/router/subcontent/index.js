//Views
import MylevAddSubContent from '../../views/subcontent/Mylev-AddSubContent.vue'
import MylevListSubContent from '../../views/subcontent/Mylev-ListSubContent.vue'
import MylevSubContent from '../../views/subcontent/Mylev-SubContent.vue'

/*
Helper para verificar se o token é valido e se o usuário tem
permissão para acessar a rota
*/
import checkPermission from '@/helpers/checkPermission'

export const subContentRoutes = [  
  //Página para adicionar um subconteúdo
  {
    path: '/admin/subcontent/add',
    name: 'AddSubContent',
    component: MylevAddSubContent,
    async beforeEnter(to, from, next) {
      await checkPermission(to, from, next);
    },
  },

  //Página para listar os SubConteúdos
  {
    path: '/admin/subcontents',
    name: 'ListSubContents',
    component: MylevListSubContent,
    async beforeEnter(to, from, next) {
      await checkPermission(to, from, next);
    },
  },

  //Página onde o subconteúdo é exibido para o aluno
  {
    path: '/subcontent/:id',
    name: 'SubContent',
    component: MylevSubContent,
  }
];

