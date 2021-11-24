<template>
   <v-container>
      <h1>Editar Disciplina</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <MylevSubjectCard
         v-if="!isError && subject"
         :isEdit="true"
         :subject="subject"
         @loading="loading"
      />

      <MylevLoading :isLoading="isLoading" />

      <MylevAlert
         :show="isError"
         :styleClasses="['contentCenter']"
         :type="'error'"
         :message="errorMessage"
      />
   </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MylevSubjectCard from '@/components/views/subject/Mylev-SubjectCard.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import MylevAlert from '@/components/shared/Mylev-Alert.vue';

export default {
   name: 'MylevEditSubject',

   components: {
      MylevSubjectCard,
      MylevLoading,
      MylevAlert,
   },

   data() {
      return {
         isError: false,
         errorMessage: '',
         isLoading: false,
      };
   },

   async created() {
      //Marca como undefined para ser atribuída ao campo corretamente
      this.$store.commit('subject/setSubject', undefined);

      //Exibe o componente de carregamento
      this.isLoading = true;

      let subjectId = this.getSubjectId();

      try {
         //Obtem a disciplina pelo ID
         await this.fecthSubjectById({ subjectId });

         console.log(this.subject);
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
      ...mapGetters('subject', ['subject']),
   },

   methods: {
      //Actions vuex
      ...mapActions('subject', ['fecthSubjectById']),

      //Obtem o ID da disciplina contida na URL
      getSubjectId() {
         return this.$route.params.id;
      },

      //Exibe ou remove o componente de carregamento
      loading(event) {
         this.isLoading = event;
      },
   },
};
</script>
