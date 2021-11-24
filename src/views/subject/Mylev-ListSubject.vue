<template>
   <v-container>
      <h1>Lista de Disciplinas</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <MylevLoading :isLoading="isLoading" />

      <MylevTableSubjectCard
         v-if="!isError && hasSubject"
         @loading="loading"
         :subjects="subjects"
      />

      <MylevAlert
         :show="isError || !hasSubject"
         :styleClasses="['contentCenter']"
         :type="alertType"
         :message="alertMessage"
      />
   </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevTableSubjectCard from '@/components/views/subject/Mylev-TableSubjectCard.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import MylevAlert from '@/components/shared/Mylev-Alert.vue';

export default {
   name: 'MylevListSubject',

   components: {
      MylevTableSubjectCard,
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
         //Obtem todas as disciplinas para serem listadas na tabela
         await this.fecthSubjects();
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
      ...mapGetters('subject', ['subjects']),

      hasSubject() {
         return this.subjects.length > 0 ? true : false;
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
            return 'Ainda não a disciplina disponíveis!';
         }
      },
   },

   methods: {
      //Actions Vuex
      ...mapActions('subject', ['fecthSubjects']),

      //Exibe ou remove o componente de carregamento
      loading(event) {
         this.isLoading = event;
      }
   },
};
</script>
