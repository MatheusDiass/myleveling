<template>
   <v-container>
      <h1>Matérias</h1>

      <br />

      <v-divider></v-divider>

      <br />

      <v-row align="center" justify="start">
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

      <MylevLoading :isLoading="isLoading"/>
   </v-container>
</template>

<script>
import MylevContentName from '@/components/shared/Mylev-ContentName.vue';
import MylevLoading from '@/components/shared/Mylev-Loading.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
   name: 'MylevSubContents',

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
      await this.listSubContentsBySubject();
   },

   computed: {
      //Getters Vuex
      ...mapGetters('subContent', ['subContentsBySubject']),

      //Obtem o ID da disciplina contida na URL
      subjectId() {
         return this.$route.params.id;
      },
   },

   methods: {
      //Actions Vuex
      ...mapActions('subContent', ['fecthSubContentsBySubject']),

      async listSubContentsBySubject() {
         //Exibe o componente de carregamento
         this.isLoading = true;

         try {
            await this.fecthSubContentsBySubject({ subjectId: this.subjectId });
         } catch(error) {
            console.log(error);
         }

         //Remove o componente de carregamento
         this.isLoading = false;
      }
   },
};
</script>
