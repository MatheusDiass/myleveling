//Views
import MylevAddSubContent from '../../views/Mylev-AddSubContent.vue'
import MylevSubContent from '../../views/Mylev-SubContent.vue'

/*
Helper para verificar se o token é valido e se o usuário tem
permissão para acessar a rota
*/
//import checkPermission from '@/helpers/checkPermission'

export const subContentRoutes = [  
  //Página para adicionar um subconteúdo
  {
    path: '/admin/subcontent/add',
    name: 'AddSubContent',
    component: MylevAddSubContent
  },
  {
    path: '/subcontent/:id',
    name: 'SubContent',
    component: MylevSubContent
  }
];

