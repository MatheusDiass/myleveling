<template>
   <v-container>
      <h1>{{ subject.name }}</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <v-row v-if="!isError" align="center" justify="start">
         <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="subContent in subContentsBySubject"
            :key="subContent.id"
         >
            <MylevContentName
               :title="subContent.data.title"
               :routeName="{
                  name: 'SubContent',
                  params: { id: subContent.id },
               }"
               color="#499fc6"
            />
         </v-col>
      </v-row>

      <MylevLoading :isLoading="isLoading" />

      <MylevAlert
         :show="isError || !hasSubContentsBySubject"
         :styleClasses="['contentCenter']"
         :type="alertType"
         :message="alertMessage"
      />
   </v-container>
</template>

<script>
import MylevContentName from '@/components/shared/Mylev-ContentName.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import MylevAlert from '@/components/shared/Mylev-Alert.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
   name: 'MylevSubContents',

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
            await this.fecthSubjectById({ subjectId: this.subjectId });
            await this.fecthSubContentsBySubject({ subjectId: this.subjectId });
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
      ...mapGetters('subContent', ['subContentsBySubject']),
      ...mapGetters('subject', ['subject']),

      //Obtem o ID da disciplina contida na URL
      subjectId() {
         return this.$route.params.id;
      },

      hasSubContentsBySubject() {
         return this.subContentsBySubject.length > 0 ? true : false;
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
      ...mapActions('subContent', ['fecthSubContentsBySubject']),
      ...mapActions('subject', ['fecthSubjectById']),
   },
};
</script>
