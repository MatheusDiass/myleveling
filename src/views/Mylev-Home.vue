<template>
   <v-container>
      <h1>Home</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <h3>Cursos</h3>

      <br />

      <v-row align="center" justify="start">
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

      <MylevLoading :isLoading="isLoading"/>
   </v-container>
</template>

<script>
import MylevContentName from '../components/shared/Mylev-ContentName.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
   name: 'MylevHome',

   data() {
      return {
         isLoading: false,
      }
   },

   components: {
      MylevContentName,
      MylevLoading,
   },

   async created() {
      await this.listSubjects();
   },

   computed: {
      //Getters Vuex
      ...mapGetters('subject', ['subjects']),
   },

   methods: {
      //Actions Vuex
      ...mapActions('subject', ['fecthSubjects']),

      async listSubjects() {
         //Exibe o componente de carregamento
         this.isLoading = true;

         try {
            await this.fecthSubjects();
         } catch (error) {
            console.log(error);
         }

         //Remove o componente de carregamento
         this.isLoading = false;
      },
   },
};
</script>
