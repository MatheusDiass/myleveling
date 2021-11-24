<template>
   <v-container>
      <h1>Lista de Matérias</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <MylevLoading :isLoading="isLoading" />

      <MylevTableSubContentCard
         v-if="!isError && hasSubContents"
         @loading="loading"
         :subContents="subContents"
      />

      <MylevAlert
         :show="isError || !hasSubContents"
         :styleClasses="['contentCenter']"
         :type="alertType"
         :message="alertMessage"
      />
   </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevTableSubContentCard from '@/components/views/subcontent/Mylev-TableSubContentCard.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import MylevAlert from '@/components/shared/Mylev-Alert.vue';

export default {
   name: 'MylevListSubContent',

   components: {
      MylevTableSubContentCard,
      MylevLoading,
      MylevAlert,
   },

   data() {
      return {
         isLoading: false,
         isError: false,
         errorMessage: '',
      };
   },

   async created() {
      //Exibe o componente de carregamento
      this.isLoading = true;

      try {
         //Obtem todas as matérias para serem listadas na tabela
         await this.fecthSubContents();
      } catch (error) {
         this.isError = true;

         let errorMessage = '';

         if (error.response) {
            errorMessage = error.response.data;
         } else {
            errorMessage = 'Não foi possível se conectar com a API!';
         }

         this.errorMessage = errorMessage;
      }

      //Remove o componente de carregamento
      this.isLoading = false;
   },

   computed: {
      //Getters Vuex
      ...mapGetters('subContent', ['subContents']),

      hasSubContents() {
         return this.subContents.length > 0 ? true : false;
      },

      alertType() {
         if (this.isError) {
            return 'error';
         } else {
            return 'info';
         }
      },

      alertMessage() {
         if (this.isError) {
            return this.errorMessage;
         } else {
            return 'Ainda não a matérias disponíveis!';
         }
      },
   },

   methods: {
      //Actions Vuex
      ...mapActions('subContent', ['fecthSubContents']),

      //Exibe ou remove o componente de carregamento
      loading(event) {
         this.isLoading = event;
      },
   },
};
</script>
