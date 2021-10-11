//Views
import MylevAddSubContent from '../../views/Mylev-AddSubContent.vue'

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
];
