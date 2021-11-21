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
   </v-container>
</template>

<script>
import MylevContentName from '@/components/shared/Mylev-ContentName.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
   name: 'MylevSubContents',

   components: {
      MylevContentName,
   },

   async created() {
      await this.fecthSubContentsBySubject({ subjectId: this.subjectId });
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
   },
};
</script>
