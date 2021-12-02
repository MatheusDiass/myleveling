<template>
   <v-container>
      <h1>Adicionar Matéria</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <MylevSubContent @loading="loading" />

      <MylevLoading :isLoading="isLoading" />
   </v-container>
</template>

<script>
import MylevSubContent from '@/components/views/subcontent/Mylev-SubContentCard.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';

export default {
   name: 'MylevSubject',

   components: {
      MylevSubContent,
      MylevLoading,
   },

   data() {
      return {
         isLoading: false,
      };
   },

   methods: {
      //Exibe ou remove o componente de carregamento
      loading(event) {
         this.isLoading = event;
      },
   },
};
</script>
