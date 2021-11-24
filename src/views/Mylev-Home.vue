<template>
   <v-container>
      <h1>Home</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <h3>Disciplinas</h3>

      <br />

      <v-row v-if="!isError" align="center" justify="start">
         <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="subject in subjects"
            :key="subject.name"
         >
            <MylevContentName
               :title="subject.data.name"
               :routeName="{ name: 'SubContents', params: { id: subject.id } }"
               color="#499fc6"
            />
         </v-col>
      </v-row>

      <MylevLoading :isLoading="isLoading" />

      <MylevAlert
         :show="isError || !hasSubjects"
         :styleClasses="['contentCenter']"
         :type="alertType"
         :message="alertMessage"
      />
   </v-container>
</template>

<script>
import MylevContentName from '../components/shared/Mylev-ContentName.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import MylevAlert from '@/components/shared/Mylev-Alert.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
   name: 'MylevHome',

   data() {
      return {
         isLoading: false,
         isError: false,
         errorMessage: '',
      };
   },

   components: {
      MylevContentName,
      MylevLoading,
      MylevAlert,
   },

   async created() {
      //Exibe o componente de carregamento
      this.isLoading = true;

      try {
         //Obtem as disciplinas para listagem
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

      hasSubjects() {
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
   },
};
</script>
